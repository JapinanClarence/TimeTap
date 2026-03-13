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

          $totalMembers = $event->organization->members->count();

          $attendances = $event->attendances()
               ->with(['user:id,first_name,last_name,email'])
               ->latest('checked_in_at')
               ->get();

          $activityLog = $attendances->flatMap(function ($a) {
               $logs = [];
               if ($a->checked_in_at) {
                    $logs[] = [
                         'id' => $a->id . '_in',
                         'name' => "{$a->user->first_name} {$a->user->last_name}",
                         'email' => $a->user->email,
                         'time' => $a->checked_in_at->format('g:i A'),
                         'type' => 'check-in'
                    ];
               }
               if ($a->checked_out_at) {
                    $logs[] = [
                         'id' => $a->id . '_out',
                         'name' => "{$a->user->first_name} {$a->user->last_name}",
                         'email' => $a->user->email,
                         'time' => $a->checked_out_at->format('g:i A'),
                         'type' => 'check-out'
                    ];
               }
               return $logs;
          })->sortByDesc('time')->values();

          $presentCount = $attendances->whereNotNull('checked_in_at')->count();
          $absentCount = $totalMembers - $presentCount;
          $percentage = $totalMembers > 0 ? ($presentCount / $totalMembers) * 100 : 0;

          return Inertia::render(
               "admin/event-attendance",
               [
                    "stats" => [
                         "total" => $totalMembers,
                         "present" => $presentCount,
                         "absent" => $absentCount,
                         "percentage" => round($percentage, 1),
                    ],
                    "event" => $event->only("id", "title", "start_date", "end_date", "start_time", "end_time", "location"),
                    "attendees" => $activityLog
               ]
          );
     }
}
