<?php

use App\Http\Controllers\User\AppController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\User\QRController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;




Route::middleware(["guest"])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name("welcome");
    Route::get("/login", [AuthController::class, "login"])->name("login");
    Route::post("/auth/login", [AuthController::class, "authenticate"]);
    Route::get("/register/organization", [AuthController::class, "showOrgRegister"]);
    Route::post("/register/organization", [AuthController::class, "storeOrgRegister"]);
    Route::get("/register", [AuthController::class, "create"])->name("register");
    Route::post("/auth/register", [AuthController::class, "store"]);
});

// --- AUTHENTICATED SHARED ROUTES ---
Route::middleware(['auth'])->group(function () {
    Route::post("/logout", [AuthController::class, "logout"])->name('logout');

    // Redirect logic: A central route to send users to their respective home
    Route::get('/home', function () {
        return auth()->user()->role === 'admin'
            ? redirect()->route('admin.dashboard')
            : redirect()->route('app.index');
    });
});

// --- USER ONLY ROUTES ---
Route::middleware(['auth', 'role:user'])->prefix('app')->group(function () {
    Route::get("/", [AppController::class, "index"])->name("app.index");
    Route::get("/qr", [QRController::class, "index"])->name("qr");
});

// --- ADMIN ONLY ROUTES ---
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get("/", [DashboardController::class, "index"])->name("admin.dashboard");
    Route::get("/events", [EventController::class, "index"])->name("admin.events");
    Route::get("/events/add", [EventController::class, "create"]);
    Route::post("/events/add", [EventController::class, "store"]);
    Route::get("/events/edit/{event}", [EventController::class, "edit"]);
    Route::put("/events/edit/{event}", [EventController::class, 'update']);
    Route::patch("/events/{event}", [EventController::class, "updateStatus"])->name("event.updateStatus");
});