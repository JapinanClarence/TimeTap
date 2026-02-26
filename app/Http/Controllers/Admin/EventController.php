<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    //
    public function index (){
         return Inertia::render("admin/events");
    }
    public function create(){
         return Inertia::render("admin/add-event");
    }
}
