<?php

use Illuminate\Support\Facades\Route;
// Shared Routes
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AttendanceController;

// Auth Routes
use App\Http\Controllers\Auth\AuthController;

// Admin Routes
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AttendanceController as AdminAttendanceController;

//  User Routes
use App\Http\Controllers\User\AppController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\OrganizationController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\EventController as UserEventController;

Route::middleware(["guest"])->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name("welcome");
    Route::get("/login", [AuthController::class, "login"])->name("login");
    Route::post("/auth/login", [AuthController::class, "authenticate"]);
    Route::get("/register/organization", [AuthController::class, "showOrgRegister"]);
    Route::post("/register/organization", [AuthController::class, "storeOrgRegister"]);
    Route::get("/register", [AuthController::class, "create"])->name("register");
    Route::post("/auth/register", [AuthController::class, "store"]);
});

//* --- AUTHENTICATED SHARED ROUTES ---
Route::middleware(['auth'])->group(function () {
    Route::post("/logout", [AuthController::class, "logout"])->name('logout');
    Route::get("/auth/change-password", [AuthController::class, "changePassword"]);
    Route::patch("/auth/change-password/{user}", [AuthController::class, "updatePassword"]);
    // Redirect logic: A central route to send users to their respective home
    Route::get('/home', function () {
        return auth()->user()->role === 'admin'
            ? redirect()->route('admin.dashboard')
            : redirect()->route('app.index');
    });
});

//* --- USER ONLY ROUTES ---
Route::middleware(['auth', 'role:user'])->prefix('app')->group(function () {
    Route::get("/", [AppController::class, "index"])->name("app.index");
    Route::get("/notifications", [NotificationController::class, "index"]);
    Route::post("/notifications/mark-all-read", [NotificationController::class, "markAllRead"]);
    Route::get("/profile", [ProfileController::class, "index"]);
    Route::put("/profile/edit/{user}", [ProfileController::class, "update"]);
    Route::patch("/profile/upload/{user}", [ProfileController::class, "upload"]);
    Route::get("/organizations", [OrganizationController::class, "index"])->name("organizations");
    Route::get("/organizations/{organization}", [OrganizationController::class, "show"]);
    Route::post("/organizations/join", [OrganizationController::class, "join"])->name("organizations.join");
    Route::delete("/organizations/{organization}", [OrganizationController::class,"leave"]);
    Route::get("/organizations/members/{organization}",[OrganizationController::class, "showMembers"]);
    Route::patch("/organizations/switch", [OrganizationController::class, "switchOrganization"])->name("organizations.switch");
    Route::post("/organizations/handle-invitation/{id}", [OrganizationController::class, "handleInvitation"]);
    Route::get("/schedule", [UserEventController::class, "index"]);
    Route::get("/schedule/{event}", [UserEventController::class, "show"]);
    Route::get("/my-id", [ProfileController::class, "showUserId"]);
    Route::get("/history", [UserEventController::class, "showHistory"]);
});

//* --- ADMIN ONLY ROUTES ---
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get("/", [DashboardController::class, "index"])->name("admin.dashboard");
    Route::get("/events", [EventController::class, "index"])->name("admin.events");
    Route::get("/events/add", [EventController::class, "create"]);
    Route::post("/events/add", [EventController::class, "store"]);
    Route::get("/events/edit/{event}", [EventController::class, "edit"]);
    Route::put("/events/edit/{event}", [EventController::class, 'update']);
    Route::patch("/events/{event}", [EventController::class, "updateStatus"])->name("event.updateStatus");
    Route::get("/events/attendance/{event}", [AdminAttendanceController::class, 'index']);
    Route::get("/members", [MemberController::class, "index"])->name("admin.members");
    Route::delete("/members/{user}", [MemberController::class, "delete"]);
    Route::post("/members/generate-code", [MemberController::class, "generateCode"]);
    Route::post("/members/invite-members", [MemberController::class, "storeInvitations"]);
    Route::get("/profile", [UserController::class, "edit"]);
    Route::put("/profile/edit/{user}", [UserController::class, "update"]);
});

Route::middleware(['auth'])->prefix("attendance")->group(function () {
    Route::post("/record", [AttendanceController::class, "recordAttendance"]);
});
