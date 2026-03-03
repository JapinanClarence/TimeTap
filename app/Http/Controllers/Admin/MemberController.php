<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\Notification;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $organization = Organization::where('owner_id', auth()->id())->firstOrFail();
        // fetch owned organization and its members
        $members = $organization->members()
            ->select('users.id', 'users.first_name', 'users.last_name', 'users.email', 'users.gender')
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

        $organization = Organization::where('owner_id', auth()->id())->firstOrFail();

        foreach ($request->emails as $email) {
            // 1. Create the invitation record
            $invitation = Invitation::create([
                'organization_id' => $organization->id,
                'email' => $email,
                'token' => Str::random(40),
                'status' => 'pending'
            ]);

            // 2. Check if the user exists in our system
            $invitedUser = User::where('email', $email)->first();
            
            // 3. Only store in-app notification if the user actually has an account
            if ($invitedUser) {
                Notification::create([
                    'user_id' => $invitedUser->id,
                    'subject_id' => $invitation->id,
                    'subject_type' => Invitation::class,
                    'type' => 'invitation',
                    'message' => "You have been invited to join {$organization->name}.",
                ]);
            }
        }

        return back()->with('success', 'Invitations processed successfully!');
    }
}
