<?php

use Illuminate\Support\Facades\Route;
use App\Models\Student;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\LeaveRequestController;

Route::get('/students', function () {
    return response()->json(Student::all());
});

Route::get('/product', [ProductController::class, 'index']);
Route::apiResource('/product', ProductController::class);


Route::get('/students', function () {
    return response()->json(Student::all());
});

Route::get('/product', [ProductController::class, 'index']);


Route::apiResource('/leave-requests', LeaveRequestController::class);
Route::patch('/leave-requests/{id}/status', [LeaveRequestController::class, 'updateStatus']);