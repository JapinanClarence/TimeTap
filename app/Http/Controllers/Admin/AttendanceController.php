<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
     public function index(Request $request, Event $event)
     {
          $totalMembers    = $event->organization->members()->count();
          $allAttendances  = $this->fetchAttendances($event, null);         // unfiltered, for stats
          $attendances     = $this->fetchAttendances($event, $request->search); // filtered, for log
          $activityLog     = $this->buildActivityLog($attendances);
          $filteredLog     = $this->applyTabFilter($activityLog, $request->filter);
          $stats           = $this->calculateStats($allAttendances, $totalMembers, $event->start_date);

          return Inertia::render("admin/event-attendance", [
               "activityLog" => $filteredLog,
               "filters"     => $request->only(['search', 'filter']),
               "stats"       => $stats,
               "event"       => $event->only("id", "title", "start_date", "end_date", "start_time", "end_time", "location"),
          ]);
     }

     private function fetchAttendances(Event $event, ?string $search)
     {
          return $event->attendances()
               ->with(['user:id,first_name,last_name,email'])
               ->when($search, function ($q, $search) {
                    $q->whereHas('user', function ($u) use ($search) {
                         $u->where('first_name', 'like', "%{$search}%")
                              ->orWhere('last_name', 'like', "%{$search}%")
                              ->orWhere('email', 'like', "%{$search}%");
                    });
               })
               ->latest('checked_in_at')
               ->get();
     }

     private function buildActivityLog($attendances)
     {
          $timezone = 'Asia/Manila';

          return $attendances->flatMap(function ($a) use ($timezone) {
               $logs = [];

               if ($a->checked_in_at) {
                    $logs[] = [
                         'id'         => $a->id . '_in',
                         'first_name' => $a->user->first_name,
                         'last_name'  => $a->user->last_name,
                         'email'      => $a->user->email,
                         'time'       => $a->checked_in_at->timezone($timezone)->format('g:i A'),
                         'type'       => 'check-in',
                         'raw_time'   => $a->checked_in_at, // Use this for sorting
                    ];
               }

               if ($a->checked_out_at) {
                    $logs[] = [
                         'id'         => $a->id . '_out',
                         'first_name' => $a->user->first_name,
                         'last_name'  => $a->user->last_name,
                         'email'      => $a->user->email,
                         'time'       => $a->checked_out_at->timezone($timezone)->format('g:i A'),
                         'type'       => 'check-out',
                         'raw_time'   => $a->checked_out_at, // Use this for sorting
                    ];
               }

               return $logs;
          })
               // 1. Sort by the Carbon object (latest first)
               ->sortByDesc('raw_time')
               // 2. Reset the array keys for JavaScript/Inertia compatibility
               ->values();
     }

     private function applyTabFilter($activityLog, ?string $filter)
     {
          return $activityLog
               ->when($filter && $filter !== 'All', function ($collection) use ($filter) {
                    $type = $filter === 'Check In' ? 'check-in' : 'check-out';
                    return $collection->where('type', $type);
               })
               ->values();
     }

     private function calculateStats($attendances, int $totalMembers, $startDate)
     {
          $eventStarted = now()->gte(\Carbon\Carbon::parse($startDate));
          $presentCount = $eventStarted ? $attendances->whereNotNull('checked_in_at')->count() : null;
          $absentCount  = $eventStarted ? $totalMembers - $presentCount : null;
          $percentage   = $eventStarted && $totalMembers > 0
               ? round(($presentCount / $totalMembers) * 100, 1)
               : null;

          return [
               "total"      => $totalMembers,
               "present"    => $presentCount,
               "absent"     => $absentCount,
               "percentage" => $percentage,
          ];
     }
}
