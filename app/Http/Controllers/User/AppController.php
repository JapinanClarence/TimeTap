<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use App\Models\Organization;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AppController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $now = Carbon::now();
        $today = $now->toDateString();
        $currentTime = $now->toTimeString();

        $currentOrg = Organization::find($user->current_organization_id);


        //get current org 
        if (!$currentOrg) {
            return Inertia::render("app/index", [
                'currentOrg' => null,
                'currentEvent' => null,
                'upcomingEvents' => [],
                "myOrganizations" => [],
            ]);
        }

        // Check if today is between start and end date
        $currentEvent = Event::where('organization_id', $currentOrg->id)
            ->where('start_date', '<=', $today)
            ->where('end_date', '>=', $today)
            ->select('*') // Select all standard columns
            ->selectRaw('ST_AsGeoJSON(area) as area_geojson') // Convert PostGIS 'area' to JSON
            ->first();

        // Events starting after today, ordered by date
        $upcomingEvents = Event::select(
            'id',
            'title',
            'description',
            'location',
            'start_date',
            'end_date',
            'start_time',
            'end_time',
        )->where('organization_id', $currentOrg->id)
            ->where('start_date', '>', $today)
            ->orderBy('start_date', 'asc')
            ->limit(5)
            ->get();

        return Inertia::render("app/index", [
            'myOrganizations' => $user->organizations,
            "currentOrg" => $currentOrg,
            "currentEvent" => $currentEvent ? new EventResource($currentEvent) : null,
            "upcomingEvents" => EventResource::collection($upcomingEvents),
        ]);
    }
}
