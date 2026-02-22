<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class QRController extends Controller
{
    //
    public function index(Request $request){
        return Inertia::render("app/qr");
    }
}
