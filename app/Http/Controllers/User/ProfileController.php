<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render("app/profile");
    }
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            "first_name" => "required|string",
            "last_name" => "required|string",
            "email" => "required|email",
            "gender" => "required|in:male,female,other",
        ]);

        $user->update([
            "first_name" => $data["first_name"],
            "last_name" => $data["last_name"],
            "email" => $data["email"],
            "gender" => $data["gender"]
        ]);

        return back()->with('message', 'Profile updated successfully!');
    }

    public function upload(Request $request, User $user)
    {
        $data = $request->validate([
            "profile" => "string"
        ]);
     
        $user->update([
            "profile" => $data["profile"]
        ]);
        return back()->with('message', 'Profile updated successfully!');
    }
    public function showUserId(Request $request)
    {
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
