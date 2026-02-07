<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    //
    public function create(){
        return Inertia::render("auth/register");
    }
    public function login(){
        return Inertia::render("auth/login");
    }
    public function authenticate(Request $request){

    }

}
