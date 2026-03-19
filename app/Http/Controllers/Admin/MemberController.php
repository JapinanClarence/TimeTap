<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\Notification;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $organization = Organization::where('owner_id', auth()->id())->firstOrFail();
        // fetch owned organization and its members
        $members = $organization->members()
            ->select([
                'users.id',
                DB::raw("CONCAT(users.first_name, ' ', users.last_name) as name"),
                'users.email',
                'user_organizations.created_at as joined_at'
            ])
            ->latest('user_organizations.created_at') // Sort by when they joined
            ->paginate(10)
            ->withQueryString();

        // Check if the current code is expired
        $isExpired = $organization->invitation_expires_at
            ? $organization->invitation_expires_at->isPast()
            : false;

        return Inertia::render("admin/members", [
            'members' => Inertia::defer(fn() => $members),
            'invitation' => [
                'code' => $isExpired ? null : $organization->invitation_code,
                'expires_at' => $organization->invitation_expires_at?->toDateTimeString(),
                'is_expired' => $isExpired,
            ]
        ]);
    }
    public function delete(User $user)
    {
        // 1. Identify the organization owned by the admin
        $organization = Organization::where('owner_id', auth()->id())->firstOrFail();

        DB::transaction(function () use ($user, $organization) {
            // 2. Remove the relationship from the pivot table
            $user->organizations()->detach($organization->id);

            // 3. Conditional Update: Only change current_org if it matches the one they were removed from
            if ($user->current_organization_id === $organization->id) {

                // Find the most recently joined organization remaining
                $latestOrg = $user->organizations()
                    ->orderByPivot('created_at', 'desc')
                    ->first();

                $user->update([
                    'current_organization_id' => $latestOrg ? $latestOrg->id : null
                ]);
            }
        });

        return back()->with('success', "Member removed successfully.");
    }
    public function generateCode(Request $request)
    {

        $organization = Organization::where('owner_id', auth()->id())->firstOrFail();

        // Generate a fresh 8-character code
        $organization->update([
            'invitation_code' => strtoupper(Str::random(8)),
            // Optional: Set default expiration (e.g., 7 days) or leave null
            'invitation_expires_at' => now()->addDays(7),
        ]);

        return back()->with('success', 'New invitation code generated!');
    }
    public function storeInvitations(Request $request)
    {
        $request->validate([
            'emails' => 'required|array',
            'emails.*' => 'email'
        ]);

        $organization = Organization::where('owner_id', auth()->id())
            ->with('members:email') // Eager load member emails
            ->firstOrFail();

        // Get list of existing member emails for this organization
        $existingMemberEmails = $organization->members->pluck('email')->toArray();

        // Get list of emails that already have a pending invitation
        $pendingInviteEmails = Invitation::where('organization_id', $organization->id)
            ->whereIn('email', $request->emails)
            ->where('status', 'pending')
            ->pluck('email')
            ->toArray();

        $skippedMembers = [];
        $invitedCount = 0;

        foreach ($request->emails as $email) {
            // 1. Skip if already a member
            if (in_array($email, $existingMemberEmails)) {
                $skippedMembers[] = $email;
                continue;
            }

            // 2. Skip if an invitation is already pending
            if (in_array($email, $pendingInviteEmails)) {
                continue;
            }

            // 3. Create Invitation
            $invitation = Invitation::create([
                'organization_id' => $organization->id,
                'email' => $email,
                'token' => Str::random(40),
                'status' => 'pending'
            ]);

            // 4. Handle Notification
            $invitedUser = User::where('email', $email)->first();
            if ($invitedUser) {
                Notification::create([
                    'user_id' => $invitedUser->id,
                    'subject_id' => $invitation->id,
                    'subject_type' => Invitation::class,
                    'type' => 'invitation',
                    'message' => "You have been invited to join {$organization->name}.",
                ]);
            }

            $invitedCount++;
        }

        // Prepare response
        if (count($skippedMembers) > 0) {
            $message = "Sent {$invitedCount} invitations. The following are already members: " . implode(', ', $skippedMembers);
            return back()->with('warning', $message);
        }

        return back()->with('success', 'Invitations sent successfully!');
    }
}
