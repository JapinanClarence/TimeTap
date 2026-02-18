<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::get('/', [HomeController::class,'index']);

Route::get("/login", [UserController::class,"login"]);
Route::post("/auth/login", [UserController::class,"authenticate"]);
Route::get("/register", [UserController::class,"create"]);
Route::post("/auth/register", [UserController::class,"store"]);
