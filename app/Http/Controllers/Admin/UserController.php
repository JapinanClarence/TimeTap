<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    public function edit()
    {
        $user = auth()->user();

        $organization = Organization::where('owner_id', $user->id)
            ->select('id', 'name', 'description', 'image', 'owner_id')
            ->first();

        return Inertia::render("admin/edit-profile", [
            "organization" => $organization
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        // 1. Validate both User and Organization fields
        $data = $request->validate([
            "first_name" => "required|string|max:255",
            "last_name" => "required|string|max:255",
            "email" => "required|email|unique:users,email," . $user->id,
            "name" => "required|string|max:255", // Organization Name
            "description" => "required|string|max:200" // Organization Description
        ]);

        // 2. Update User Information
        $user->update([
            "first_name" => $data["first_name"],
            "last_name" => $data["last_name"],
            "email" => $data["email"],
        ]);

        // 3. Update Organization Information
        $organization = Organization::where('owner_id', $user->id)->first();

        if ($organization) {
            $organization->update([
                "name" => $data["name"],
                "description" => $data["description"],
            ]);
        }

        return back()->with('success', 'Profile updated successfully!');
    }
}
