<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\WeightController;
use App\Models\Product;
use App\Models\LeaveRequest;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

// หน้าหลัก และ Dashboard
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

// ระบบ Profile และ Leave Management (ต้องล็อกอิน)
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ระบบบริหารการลางาน (รวมคำนวณวันลาคงเหลือไว้ที่เดียว)
    Route::get('/leave-management', function () {
        $maxLeaveQuota = 30; // สิทธิ์ลาสูงสุด 30 วัน/ปี
        $usedDays = LeaveRequest::where('user_id', Auth::id())
            ->where('status', 'Approved')
            ->sum('total_days') ?? 0;
        
        $remainingDays = $maxLeaveQuota - $usedDays;

        return Inertia::render('LeaveManagement', [
            'remainingDays' => $remainingDays,
            'usedDays' => $usedDays,
            'user' => Auth::user()
        ]);
    })->name('leave-management');
});

require __DIR__.'/auth.php';

// Route แบบฝึกหัดต่าง ๆ
Route::get('/test', fn() => Inertia::render('Test'))->name('test');
Route::get('/tictactoe', fn() => Inertia::render('Tictactoe'))->name('tictactoe');
Route::get('/fruit', fn() => Inertia::render('Fruit'))->name('fruit');
Route::get('/circle', fn() => Inertia::render('Circle'))->name('circle');
Route::get('/counter', fn() => Inertia::render('Counter'))->name('counter');
Route::get('/form-example', fn() => Inertia::render('FormExample'))->name('form-example');
Route::get('/list-manager', fn() => Inertia::render('ListManager'))->name('list-manager');
Route::get('/infinite-scroll', fn() => Inertia::render('InfiniteScrollExample'))->name('infinite-scroll');
Route::get('/product-search', fn() => Inertia::render('ProductSearch'));
Route::get('/music-player', fn() => Inertia::render('MusicPlayer'));

Route::get('/product', function () {
    $products = Product::all();
    return Inertia::render('ProductList', compact('products'));
})->name('product');

Route::get('/product-others', fn() => Inertia::render('ProductOthers'))->name('product-others');

// Quiz3 & Quiz4
Route::get('/quiz3', fn() => Inertia::render('Quiz3'));
Route::get('/quiz4', fn() => Inertia::render('Quiz4'));

// Weight API
Route::get('/weights', [WeightController::class, 'index']);
Route::post('/weights', [WeightController::class, 'store']);
Route::put('/weights/{weight}', [WeightController::class, 'update']);
Route::delete('/weights/{weight}', [WeightController::class, 'destroy']);