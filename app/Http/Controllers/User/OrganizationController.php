<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Invitation;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $organizations = $user->organizations()
            ->select("organizations.id", "organizations.name", "organizations.image")
            ->withCount("members")
            ->get();

        return Inertia::render('app/organizations', [
            'organizations' => $organizations
        ]);
    }

    public function show(Organization $organization)
    {
        $user = auth()->user();

        // 1. Get user's membership details
        $membership = $organization->members()
            ->where('user_id', $user->id)
            ->first();
        $totalMembers = $organization->members()->count();
        // 2. Calculate Stats
        // Get IDs of all events belonging to this organization
        $eventIds = $organization->events()->pluck('id');
        $totalEvents = $eventIds->count();

        // Count how many of those events the user actually attended
        $presentCount = Attendance::where('user_id', $user->id)
            ->whereIn('event_id', $eventIds)
            ->count();

        $absentCount = max(0, $totalEvents - $presentCount);

        // Calculate Attendance Rate
        $attendanceRate = $totalEvents > 0
            ? round(($presentCount / $totalEvents) * 100, 1)
            : 0;

        return Inertia::render("app/organization-detail", [
            "organization" => array_merge(
                $organization->only(['id', 'name', 'description', 'org_profile']),
                ['members_count' => $totalMembers] // Appending the count here
            ),
            "joined_at"
            // Formatting to Philippine local time
            => $membership
                ? $membership->created_at->timezone('Asia/Manila')->format('M d, Y')
                : null,
            "stats" => [
                "total_events" => $totalEvents,
                "present"      => $presentCount,
                "absent"       => $absentCount,
                "rate"         => $attendanceRate,
            ]
        ]);
    }
    /**
     * Handle the Join Request
     */
    public function join(Request $request)
    {
        $request->validate([
            'invitation_code' => 'required|string|exists:organizations,invitation_code',
        ], [
            'invitation_code.exists' => 'The provided invitation code is invalid.',
        ]);

        $organization = Organization::where('invitation_code', $request->invitation_code)->firstOrFail();
        $user = $request->user();

        // 1. Check if the user is already a member
        $isAlreadyMember = $user->organizations()
            ->where('organization_id', $organization->id)
            ->exists();

        if ($isAlreadyMember) {
            // switch their active org and warn them
            $user->update(['current_organization_id' => $organization->id]);

            return redirect()->back()->with('warning', "You are already a member of {$organization->name}. We've switched it to your active organization.");
        }

        // 2. Attach user to the organization
        $user->organizations()->syncWithoutDetaching([$organization->id]);

        // 3. Set as Active
        $user->update([
            'current_organization_id' => $organization->id
        ]);

        return redirect()->back()->with('success', "Welcome to {$organization->name}!");
    }
    public function leave(Organization $organization)
    {
        $user = auth()->user();

        DB::transaction(function () use ($user, $organization) {

            // 1. Remove the relationship from the pivot table
            $user->organizations()->detach($organization->id);

            // 2. Find the latest organization the user is still a member of
            $latestOrg = $user->organizations()
                ->orderByPivot('created_at', 'desc')
                ->first();
            // 3. Update the user's current_org column
            $user->update([
                'current_organization_id' => $latestOrg ? $latestOrg->id : null
            ]);
        });

        return redirect()->route('organizations')->with('success', "You have left {$organization->name}.");
    }
    /**
     * Switch the user's active organization view.
     */
    public function switchOrganization(Request $request)
    {
        $request->validate([
            'organization_id' => 'required|exists:organizations,id'
        ]);

        $user = $request->user();

        // Security check: Verify they actually belong to this org
        if (!$user->organizations()->where('organization_id', $request->organization_id)->exists()) {
            return back()->withErrors(['message' => 'Unauthorized switch.']);
        }

        $user->update([
            'current_organization_id' => $request->organization_id
        ]);

        return back()->with('success', 'Switched organization.');
    }
    public function handleInvitation(Request $request, $id)
    {
        $request->validate([
            'action' => 'required|in:accept,decline'
        ]);

        $invitation = Invitation::where('id', $id)
            ->where('status', 'pending')
            ->firstOrFail();

        $user = auth()->user();

        // Security check
        if ($user->email !== $invitation->email) {
            return back()->with('error', 'This invitation does not belong to your account.');
        }

        // Handle Action Logic
        if ($request->action === 'accept') {
            // Add to organization and update current context
            $user->organizations()->syncWithoutDetaching([$invitation->organization_id]);
            $user->update(["current_organization_id" => $invitation->organization_id]);
            $invitation->update(['status' => 'accepted']);
            $message = "You've successfully joined the organization!";
        } else {
            $invitation->update(['status' => 'declined']);
            $message = "Invitation declined successfully!";
        }

        //  Clean up the notification
        $user->notifications()
            ->where('subject_id', $invitation->id)
            ->where('subject_type', Invitation::class)
            ->update(['read_at' => now()]);

        return back()->with('success', $message);
    }
}
