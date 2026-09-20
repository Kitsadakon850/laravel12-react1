<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Student;
use App\Models\LeaveRequest;
use App\Http\Controllers\Api\ProductController;

// Students
Route::get('/students', function () {
    return response()->json(Student::all());
});

// Products
Route::apiResource('/product', ProductController::class);

// Leave Requests API
Route::get('/leave-requests', function () {
    return response()->json(LeaveRequest::with('user')->get());
});

Route::post('/leave-requests', function (Request $request) {
    $validated = $request->validate([
        'leave_type' => 'required',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
        'reason' => 'required',
    ]);

    $leave = LeaveRequest::create([
        'user_id' => $request->user_id ?? auth()->id() ?? 1,
        'leave_type' => $validated['leave_type'],
        'start_date' => $validated['start_date'],
        'end_date' => $validated['end_date'],
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