<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    //
    public function create()
    {
        return Inertia::render("auth/register");
    }
    public function login()
    {
        return Inertia::render("auth/login");
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            "first_name" => "required",
            "last_name" => "required",
            "email" => "required|email",
            "password" => ["required", "confirmed", "min:8"],
        ]);

        $data["password"] = bcrypt($data["password"]);

        $user = User::create($data);
        // login
        auth()->login($user);

        return redirect("/app")->with("message", "User registered and logged in");
    }
    public function authenticate(Request $request)
    {
        $data = $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        if (auth()->attempt($data)) {
            $request->session()->regenerate();
            return redirect()->intended("/app");
        }

        return back()->withInput()->withErrors(["email" => "Invalid credentials"]);
    }

}
