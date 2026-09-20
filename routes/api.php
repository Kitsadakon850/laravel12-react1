<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Models\Student;
use App\Models\LeaveRequest;
use App\Http\Controllers\Api\ProductController;
use Carbon\Carbon;

// Students & Products
Route::get('/students', fn() => response()->json(Student::all()));
Route::apiResource('/product', ProductController::class);

// Leave Requests API
Route::get('/leave-requests', function () {
    return response()->json(LeaveRequest::with('user')->orderBy('created_at', 'desc')->get());
});

Route::post('/leave-requests', function (Request $request) {
    $validated = $request->validate([
        'leave_type' => 'required',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
        'reason' => 'required',
    ]);

    // คำนวณจำนวนวันลา
    $start = Carbon::parse($validated['start_date']);
    $end = Carbon::parse($validated['end_date']);
    $totalDays = $start->diffInDays($end) + 1;

    $leave = LeaveRequest::create([
        'user_id' => $request->user_id ?? Auth::id() ?? 1,
        'leave_type' => $validated['leave_type'],
        'start_date' => $validated['start_date'],
        'end_date' => $validated['end_date'],
        'total_days' => $totalDays,
        'reason' => $validated['reason'],
        'status' => 'Pending',
    ]);

    return response()->json($leave, 201);
});

Route::patch('/leave-requests/{id}/status', function (Request $request, $id) {
    $leave = LeaveRequest::findOrFail($id);
    $leave->status = $request->status;
    $leave->save();

    return response()->json($leave);
});