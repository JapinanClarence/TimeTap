<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Event;
use App\Models\Organization;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $organization = $user->ownedOrganization()->firstOrFail();

        $events = $organization->events;
        $allAttendances = Attendance::whereIn('event_id', $events->pluck('id'))->get();

        return Inertia::render("admin/index", [
            "stats" => [
                "active_events" => $this->calculateActiveEvents($events),
                "attendance_rate" => $this->calculateOverallAttendanceRate($events, $allAttendances, $organization),
                "attendance_change" => $this->calculateAttendanceChange($events, $allAttendances, $organization),
                "peak_time" => $this->calculatePeakAttendanceTime($allAttendances),
                "breach_rate" => $this->calculateGeofenceBreachRate($allAttendances),
            ],
            "attendance_distribution" =>  $this->calculateScanDistribution($allAttendances),
            "attendance_chart" => $this->calculateAttendanceOverTime($allAttendances),
            "top_events" => $this->getTopAttendedEvents($organization->id),
        ]);
    }

    private function calculateScanDistribution($allAttendances)
    {
        // Group by the 'method' column and count occurrences
        $counts = $allAttendances->groupBy('method')->map->count();

        return [
            [
                "method" => "user_scan",
                "count"  => $counts->get('user_scan', 0),
            ],
            [
                "method" => "admin_scan",
                "count"  => $counts->get('admin_scan', 0),
            ],
        ];
    }

    /**
     * Total Active Events: Events currently open for check-in.
     */
    private function calculateActiveEvents($events)
    {
        $now = now();
        return $events->filter(function ($event) use ($now) {
            return $now->between($event->start_time, $event->end_time);
        })->count();
    }

    /**
     * Total Attendance Rate: Calculates percentage across all events.
     * Persists historical data for ex-members as per AttendanceController logic.
     */
    private function calculateOverallAttendanceRate($events, $allAttendances, Organization $organization)
    {
        $totalPresent = 0;
        $totalEffective = 0;
        $currentMemberIds = $organization->members()->pluck('users.id');

        foreach ($events as $event) {
            $eventAttendances = $allAttendances->where('event_id', $event->id);

            // Users who actually showed up (Historical data)
            $presentIds = $eventAttendances->whereNotNull('checked_in_at')->pluck('user_id')->unique();
            $presentCount = $presentIds->count();

            // Current members who were expected but didn't show up
            $absentCount = $currentMemberIds->diff($presentIds)->count();

            $totalPresent += $presentCount;
            $totalEffective += ($presentCount + $absentCount);
        }

        return $totalEffective > 0
            ? round(($totalPresent / $totalEffective) * 100, 1)
            : 0;
    }
    private function calculateAttendanceChange($events, $allAttendances, Organization $organization)
    {
        $currentMonthRate = $this->calculateOverallAttendanceRate(
            $events->whereBetween('start_date', [now()->startOfMonth(), now()->endOfMonth()]),
            $allAttendances,
            $organization
        );

        $lastMonthRate = $this->calculateOverallAttendanceRate(
            $events->whereBetween('start_date', [now()->subMonth()->startOfMonth(), now()->subMonth()->endOfMonth()]),
            $allAttendances,
            $organization
        );

        $difference = $currentMonthRate - $lastMonthRate;
        $prefix = $difference >= 0 ? '+' : '';

        return "{$prefix}{$difference}% from last month";
    }

    /**
     * Peak Attendance Time: Most frequent check-in hour across all data.
     */
    private function calculatePeakAttendanceTime($allAttendances)
    {
        $checkInTimes = $allAttendances->whereNotNull('checked_in_at')->map(function ($a) {
            return $a->checked_in_at->timezone('Asia/Manila')->format('g:i A');
        });

        if ($checkInTimes->isEmpty()) return "N/A";

        // Count occurrences of each timestamp and return the most frequent
        return $checkInTimes->countBy()->sortDesc()->keys()->first();
    }

    /**
     * Geofence Breach Rate: Percentage of attempts blocked by location boundaries.
     */
    private function calculateGeofenceBreachRate($allAttendances)
    {
        // Assumes you have a boolean 'within_geofence' or similar column 
        // recorded during check-in attempts.
        $totalAttempts = $allAttendances->count();
        if ($totalAttempts === 0) return 0;

        $breaches = $allAttendances->where('within_geofence', false)->count();

        return round(($breaches / $totalAttempts) * 100, 1);
    }

    /**
     * Generates daily check-in counts for the current week.
     */
    private function calculateAttendanceOverTime($allAttendances)
    {
        $daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        // Group attendances by day of the week based on the Manila timezone
        $groupedData = $allAttendances->whereNotNull('checked_in_at')
            ->groupBy(function ($attendance) {
                return $attendance->checked_in_at->timezone('Asia/Manila')->format('l');
            })
            ->map->count();

        // Map the grouped data to the format required by the Shadcn chart
        return collect($daysOfWeek)->map(function ($day) use ($groupedData) {
            return [
                "day"   => $day,
                "count" => $groupedData->get($day, 0),
            ];
        })->values()->all();
    }
    /**
     * Fetches the top 10 most attended events for the organization.
     * Includes historical data (ex-members who attended).
     */
    private function getTopAttendedEvents($organizationId)
    {
        return Event::where("organization_id", $organizationId)
            ->withCount(['attendances as attendees' => function ($query) {
                // Only count unique users who have a valid check-in timestamp
                $query->whereNotNull('checked_in_at')
                    ->select(DB::raw('count(distinct(user_id))'));
            }])
            ->orderByDesc('attendees')
            ->take(10)
            ->get(['id', 'title', 'location', 'start_date', 'end_date', 'start_time', 'end_time'])
            ->map(function ($event) {
                // Add a dynamic status based on the current time
                $now = now();
                $isActive = $now->between($event->start_time, $event->end_time);

                return [
                    "id"         => $event->id,
                    "title"      => $event->title,
                    "location"   => $event->location,
                    "status"     => $isActive ? "active" : "inactive",
                    "start_date" => $event->start_date,
                    "end_date"   => $event->end_date,
                    "start_time" => $event->start_time,
                    "end_time"   => $event->end_time,
                    "attendees"  => $event->attendees ?? 0,
                ];
            });
    }
}
