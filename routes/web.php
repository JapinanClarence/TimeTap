<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\QRController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




Route::middleware(["guest"])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name("welcome");
    Route::get("/login", [UserController::class, "login"])->name("login");
    Route::post("/auth/login", [UserController::class, "authenticate"]);
    Route::get("/register", [UserController::class, "create"])->name("register");
    Route::post("/auth/register", [UserController::class, "store"]);
});

Route::middleware(["auth"])->group(function () {
    Route::get("/app", [DashboardController::class, "index"])->name("dashboard");
    Route::get("/app/qr", [QRController::class,"index"])->name("qr");
});