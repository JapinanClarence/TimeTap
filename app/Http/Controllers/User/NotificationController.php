<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->notifications()
            ->with('subject') // Eager load the polymorphic invitation/event
            ->latest()
            ->paginate(15);

        return Inertia::render("app/notifications", [
            'notifications' => $notifications
        ]);
    }
}
