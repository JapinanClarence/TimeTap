<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class EventController extends Controller
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

    public function show(Request $request, Event $event)
    {
        $event->area_geojson = DB::table('events')
            ->where('id', $event->id)
            ->selectRaw('ST_AsGeoJSON(area) as geojson')
            ->value('geojson');

        return Inertia::render("app/event-detail", [
            "event" => new EventResource($event)
        ]);
    }
    public function showHistory()
    {
        $user = Auth::user();
        $now = Carbon::now();

        $events = Event::where('organization_id', $user->current_organization_id)
            // 1. Only fetch events that have already started or passed
            ->where('start_date', '<=', $now)
            ->with(['attendances' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }])
            ->latest('start_date')
            ->get()
            ->map(function ($event) {
                $attendance = $event->attendances->first();

                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'start_date' => $event->start_date,
                    'location' => $event->location,
                    'is_present' => !is_null($attendance?->checked_in_at),
                    'check_in_time' => $attendance?->checked_in_at?->format('g:i A'),
                ];
            });

        return Inertia::render("app/history", [
            "history" => $events
        ]);
    }
}
