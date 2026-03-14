<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventController extends Controller
{
     //
     public function index()
     {
          $events = Event::select(
               'id',
               'title',
               'description',
               'location',
               'start_date',
               'end_date',
               'start_time',
               'end_time',
               'status'
          )
               ->latest()
               ->paginate(10) // 10 items per page
               ->withQueryString(); // Keeps filters if you have search/sorting


          return Inertia::render('admin/events', [
               'events' => Inertia::defer(fn() => $events)
          ]);
     }
     public function create()
     {
          return Inertia::render("admin/add-event");
     }
     public function store(Request $request)
     {
          $data = $request->validate([
               "title" => "required|string|max:255",
               "description" => "nullable|string",
               "location" => "required|string",
               "start_date" => "required|date",
               "end_date" => "required|date|after_or_equal:start_date",
               "start_time" => "required|date_format:H:i:s", // Matches '12:00:00'
               "end_time" => "required|date_format:H:i:s",

               // Validate the array AND its contents
               "coordinates" => "required|array|min:3",
               "coordinates.*.long" => "required|numeric",
               "coordinates.*.lat" => "required|numeric",
          ]);

          // 1. Extract coordinates
          $coords = $data['coordinates'];

          // 2. Format as: "long lat, long lat, long lat"
          $pointsString = collect($coords)
               ->map(fn($c) => "{$c['long']} {$c['lat']}")
               ->implode(', ');

          // 3. Polygons MUST close. Append the first point to the end.
          $firstPoint = "{$coords[0]['long']} {$coords[0]['lat']}";
          $wkt = "POLYGON(({$pointsString}, {$firstPoint}))";

          $org = auth()->user()->ownedOrganization()->first();

          // 4. Create the record
          // We use ST_GeomFromText to convert the string into a spatial object
          Event::create([
               'title' => $data['title'],
               'description' => $data['description'],
               'location' => $data['location'],
               'start_date' => $data['start_date'],
               'end_date' => $data['end_date'],
               'start_time' => $data['start_time'],
               'end_time' => $data['end_time'],
               'area' => DB::raw("ST_GeomFromText('{$wkt}', 4326)"),
               'organization_id' => $org->id,
          ]);

          return redirect()->route("admin.events")->with('success', 'Event created successfully with geofence!');
     }
     public function edit(Request $request, Event $event)
     { // Add the GeoJSON string as a temporary attribute for the resource to use
          $event->area_geojson = DB::table('events')
               ->where('id', $event->id)
               ->selectRaw('ST_AsGeoJSON(area) as geojson')
               ->value('geojson');

          return Inertia::render("admin/edit-event", [
               "event" => new EventResource($event)
          ]);
     }
     public function update(Request $request, Event $event)
     {
          $data = $request->validate([
               "title" => "required|string|max:255",
               "description" => "nullable|string",
               "location" => "required|string",
               "start_date" => "required|date",
               "end_date" => "required|date|after_or_equal:start_date",
               "start_time" => "required|date_format:H:i:s", // Matches '12:00:00'
               "end_time" => "required|date_format:H:i:s",

               // Validate the array AND its contents
               "coordinates" => "required|array|min:3",
               "coordinates.*.long" => "required|numeric",
               "coordinates.*.lat" => "required|numeric",
          ]);

          // 1. Extract coordinates
          $coords = $data['coordinates'];

          // 2. Format as: "long lat, long lat, long lat"
          $pointsString = collect($coords)
               ->map(fn($c) => "{$c['long']} {$c['lat']}")
               ->implode(', ');

          // 3. Polygons MUST close. Append the first point to the end.
          $firstPoint = "{$coords[0]['long']} {$coords[0]['lat']}";
          $wkt = "POLYGON(({$pointsString}, {$firstPoint}))";

          // 2. Update the model
          // We separate the spatial column from the regular columns
          $event->fill(collect($data)->except('coordinates')->toArray());

          // Set the spatial column using a raw database expression
          $event->area = DB::raw("ST_GeomFromText('$wkt', 4326)"); // 4326 is standard GPS SRID

          $event->save();

          return redirect()->route("admin.events")
               ->with('success', 'Event updated successfully!');
     }
     public function updateStatus(Request $request, Event $event)
     {
          $data = $request->validate([
               'status' => 'required|in:active,inactive',
          ]);

          $event->update([
               'status' => $data['status']
          ]);

          // 3. Redirect back (Inertia will refresh the props automatically)
          return back()->with('message', 'Status updated successfully!');
     }

     public function viewAttendance(Request $request, Event $event)
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
          return $attendances->flatMap(function ($a) {
               $logs = [];

               if ($a->checked_in_at) {
                    $logs[] = [
                         'id'         => $a->id . '_in',
                         'first_name' => $a->user->first_name,
                         'last_name'  => $a->user->last_name,
                         'email'      => $a->user->email,
                         'time'       => $a->checked_in_at->format('g:i A'),
                         'type'       => 'check-in',
                    ];
               }

               if ($a->checked_out_at) {
                    $logs[] = [
                         'id'         => $a->id . '_out',
                         'first_name' => $a->user->first_name,
                         'last_name'  => $a->user->last_name,
                         'email'      => $a->user->email,
                         'time'       => $a->checked_out_at->format('g:i A'),
                         'type'       => 'check-out',
                    ];
               }

               return $logs;
          });
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
