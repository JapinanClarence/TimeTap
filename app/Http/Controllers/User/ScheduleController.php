<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        // 1. Get IDs of all organizations the user is a member of
        $organizationIds = $user->organizations()->pluck('organizations.id');

        // 2. Fetch events belonging to those organizations
        $events = Event::whereIn('organization_id', $organizationIds)
            ->select([
                'id', // Always include ID for React keys
                'title',
                'description',
                'location',
                'start_date',
                'end_date',
                'start_time',
                'end_time',
                'organization_id'
            ])
            ->orderBy('start_date', 'asc')
            ->get();

        return Inertia::render("app/schedule", [
            'events' => $events
        ]);
    }
}
