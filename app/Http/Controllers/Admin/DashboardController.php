<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Organization;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // $user = auth()->user();
        // $organization = $user->ownedOrganization()->firstOrFail();
        
        // $events = $this->getEvents($organization["id"]);
        // dd($events);
        return Inertia::render("admin/index");
    }
    private function getEvents($organization)
    {
        $events = Event::where("organization_id", $organization)->get();

        return $events;
    }
}
