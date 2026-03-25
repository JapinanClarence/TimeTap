<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Controller;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->user();

        // Get the full name from Google
        $fullName = $googleUser->getName(); // e.g., "Clarence S. Japinan"

        // Split by spaces
        $nameParts = explode(' ', $fullName);

        if (count($nameParts) > 1) {
            $lastName = array_pop($nameParts); // Takes "Japinan"
            $firstName = implode(' ', $nameParts); // Takes "Clarence S."
        } else {
            $firstName = $fullName;
            $lastName = ''; // Fallback if they only have one name
        }

        $user = User::updateOrCreate([
            'google_id' => $googleUser->getId(),
        ], [
            'first_name' => $firstName,
            'last_name'  => $lastName,
            'email'      => $googleUser->getEmail(),
            'password'   => null, // Ensure password is not required for Google users
            'profile' => $googleUser->getAvatar(),
        ]);

        Auth::login($user);

        return redirect()->intended('/dashboard');
    }
}
