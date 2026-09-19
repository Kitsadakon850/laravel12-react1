<?php

use Illuminate\Support\Facades\Route;
use App\Models\Student;

Route::get('/students', function () {
    return response()->json(Student::all());
});