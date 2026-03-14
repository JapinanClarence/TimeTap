<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
     public function index(Request $request){
        return Inertia::render("app/profile");
    }
    public function viewUserId(Request $request){
        $user = Auth::user();
        return Inertia::render("app/user-id", [
            "user" => [
            "id"         => $user->id,
            "first_name" => $user->first_name,
            "last_name"  => $user->last_name,
            "email"      => $user->email,
            "created_at" => $user->created_at->format('M d, Y'),
            "member_since"         => $user->created_at->format('M Y'),
            // Count total organizations through relationship
            "total_organizations"  => $user->organizations()->count(),
        ]
        ]);
    }
}
