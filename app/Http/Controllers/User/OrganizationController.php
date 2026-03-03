<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        // 1. Get Orgs where the user is NOT already in the user_organizations table
        $organizations = Organization::whereDoesntHave('members', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
            // 2. Also exclude Orgs the user actually OWNS (if they shouldn't join their own)
            ->where('owner_id', '!=', $user->id)
            ->get(['id', 'name', 'description']);

        return Inertia::render('app/index', [
            'availableOrganizations' => $organizations
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

        // Attach user to the organization in user_organizations table
        // We use syncWithoutDetaching to prevent duplicate rows
        $user->organizations()->syncWithoutDetaching([$organization->id]);

        // Automatically set this as their "Active" org so the home page updates
        $user->update([
            'current_organization_id' => $organization->id
        ]);

        return redirect()->back()->with('message', 'Joined successfully!');
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

        // 1. Security check
        if ($user->email !== $invitation->email) {
            return back()->with('error', 'This invitation does not belong to your account.');
        }

        // 2. Handle Action Logic
        if ($request->action === 'accept') {
            // Add to organization and update current context
            $user->organizations()->syncWithoutDetaching([$invitation->organization_id]);
            $user->update(["current_organization_id" => $invitation->organization_id]);
            $invitation->update(['status' => 'accepted']);
            $message = "You've successfully joined the organization!";
        } else {
            // Just decline
            $invitation->update(['status' => 'declined']);
            $message = "Invitation declined successfully!";
        }

        // 3. Clean up the notification regardless of the choice
        $user->notifications()
            ->where('subject_id', $invitation->id)
            ->where('subject_type', Invitation::class)
            ->update(['read_at' => now()]);

        return back()->with('success', $message);
    }
}
