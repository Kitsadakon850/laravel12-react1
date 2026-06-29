<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
Route::get('/test', function () {
    return Inertia::render('Test');
})->name('test');
Route::get('/tictactoe', function () {
    return Inertia::render('Tictactoe');
})->name('tictactoe');
Route::get('/fruit', function () {
    return Inertia::render('Fruit');
})->name('fruit');
//routes/web.php
Route::get('/circle', function () {
    return Inertia::render('Circle');
})->name('circle');
//routes/web.php
Route::get('/counter', function () {
    return Inertia::render('Counter');
})->name('counter');
//routes/web.php
Route::get('/form-example', function () {
    return Inertia::render('FormExample');
})->name('form-example');
//routes/web.php
Route::get('/list-manager', function () {
    return Inertia::render('ListManager');
})->name('list-manager');
//routes/web.php
Route::get('/infinite-scroll', function () {
    return Inertia::render('InfiniteScrollExample');
})->name('infinite-scroll');


// เส้นทางสำหรับเปิดระบบค้นหาสินค้า
Route::get('/product-search', function () {
    return Inertia::render('ProductSearch');
});


// เพิ่ม Route สำหรับหน้าเครื่องเล่นเพลง
Route::get('/music-player', function () {
    return Inertia::render('MusicPlayer'); // ชื่อตรงกับไฟล์ MusicPlayer.jsx
});

