<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function recordAttendance(Request $request)
    {
        $request->validate(['qr_data' => 'required']);
        $user = auth()->user();
        $data = json_decode($request->qr_data, true);

        // 1. Check for Malformed JSON
        if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
            return back()->with("error", "The scanned QR code is malformed or invalid.");
        }

        // 2. Check for required structure (id and type)
        if (!isset($data['id']) || !isset($data['type'])) {
            return back()->with("error", "The QR code format is not recognized.");
        }

        // Flow A: User scans Event QR
        if (isset($data['type']) && $data['type'] === 'event') {
            return $this->processAttendance($data['id'], $user->id, 'user_scan');
        }

        // Flow B: Admin scans User QR
        if (isset($data['type']) && $data['type'] === 'user') {
            // Ensure only admins/managers can do this
            if ($user->role !== "admin" ) return back()->with('error', 'Unauthorized');
            
            return $this->processAttendance($request->current_event_id, $data['id'], 'admin_scan');
        }

        // 5. Fallback for unexpected 'type' values
        return back()->with("error", "Unrecognized QR code type.");
    }

    private function processAttendance($eventId, $userId, $method)
    {

        $attendance = Attendance::firstOrCreate(
            ['event_id' => $eventId, 'user_id' => $userId],
            ['method' => $method, 'checked_in_at' => now()]
        );

        if (!$attendance->wasRecentlyCreated && !$attendance->checked_out_at) {
            $attendance->update(['checked_out_at' => now()]);
            return back()->with('success', 'Checked out successfully!');
        }

        return back()->with('success', 'Checked in successfully!');
    }
}
