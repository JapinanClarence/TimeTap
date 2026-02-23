<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
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
    public function showOrgRegister()
    {
        return Inertia::render("auth/register-org");
    }
    public function storeOrgRegister(Request $request)
    {
        $data = $request->validate([
            "first_name" => "required",
            "last_name" => "required",
            "email" => "required|email",
            "password" => "required|confirmed|min:8",
            "organization_name" => ["required", "string", "max:255", Rule::unique("organizations", "name")],
            "description" => "nullable|string|max:1000",
            "org_profile" => "nullable|string",
        ]);

        DB::transaction(function () use ($data) {

            $user = User::create([
                'first_name' => $data["first_name"],
                'last_name' => $data["last_name"],
                'email' => $data["email"],
                'password' => bcrypt($data["password"]),
            ]);

            $organization = Organization::create([
                'name' => $data["organization_name"],
                'description' => $data["description"],
                'owner_id' => $user->id,
            ]);



            auth()->login($user);
        });



        return redirect("/dashboard")->with("message", "User registered and logged in");
    }
    public function logout(Request $request)
    {
        auth()->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect("/");
    }

}
