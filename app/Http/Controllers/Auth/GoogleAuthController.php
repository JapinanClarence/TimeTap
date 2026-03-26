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
        $fullName = $googleUser->getName();

        // Split by spaces
        $nameParts = explode(' ', $fullName);

        if (count($nameParts) > 1) {
            $lastName = array_pop($nameParts); 
            $firstName = implode(' ', $nameParts); 
        } else {
            $firstName = $fullName;
            $lastName = '.';
        }
        $user = User::where('email', $googleUser->getEmail())->first();

        if ($user) {
            $user->update([
                'google_id' => $googleUser->getId(),
                'profile'   => $googleUser->getAvatar(),
                'first_name' => $user->first_name ?? $firstName,
                'last_name'  => ($user->last_name === '.' || is_null($user->last_name)) ? $lastName : $user->last_name,
            ]);
        } else {
            $user = User::create([
                'google_id'  => $googleUser->getId(),
                'first_name' => $firstName,
                'last_name'  => $lastName,
                'email'      => $googleUser->getEmail(),
                'profile'    => $googleUser->getAvatar(),
                'password'   => null,
            ]);
        }
        Auth::login($user);

        return redirect()->intended('/home');
    }
}
