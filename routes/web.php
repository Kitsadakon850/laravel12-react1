<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\LeaveRequest;
use Illuminate\Support\Facades\Auth;

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

// ระบบ Profile (ต้องล็อกอิน)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Route แบบฝึกหัดต่าง ๆ
Route::get('/test', function () {
    return Inertia::render('Test');
})->name('test');

Route::get('/tictactoe', function () {
    return Inertia::render('Tictactoe');
})->name('tictactoe');

Route::get('/fruit', function () {
    return Inertia::render('Fruit');
})->name('fruit');

Route::get('/circle', function () {
    return Inertia::render('Circle');
})->name('circle');

Route::get('/counter', function () {
    return Inertia::render('Counter');
})->name('counter');

Route::get('/form-example', function () {
    return Inertia::render('FormExample');
})->name('form-example');

Route::get('/list-manager', function () {
    return Inertia::render('ListManager');
})->name('list-manager');

Route::get('/infinite-scroll', function () {
    return Inertia::render('InfiniteScrollExample');
})->name('infinite-scroll');

Route::get('/product-search', function () {
    return Inertia::render('ProductSearch');
});

Route::get('/music-player', function () {
    return Inertia::render('MusicPlayer');
});

Route::get('/product', function () {
    $products = Product::all();
    return Inertia::render('ProductList', compact('products'));
})->name('product');

Route::get('/product-others', function () {
    return Inertia::render('ProductOthers');
})->name('product-others');

// Route สำหรับ Quiz3 และ Quiz4 (แก้ไขชื่อ Component ให้ถูกต้อง ไม่ซ้ำกัน)
Route::get('/quiz3', function () {
    return Inertia::render('Quiz3');
});

Route::get('/quiz4', function () {
    return Inertia::render('Quiz4');
});

use App\Http\Controllers\WeightController;

Route::get('/weights', [WeightController::class, 'index']);
Route::post('/weights', [WeightController::class, 'store']);
Route::put('/weights/{weight}', [WeightController::class, 'update']);
Route::delete('/weights/{weight}', [WeightController::class, 'destroy']);



Route::middleware(['auth'])->group(function () {
    Route::get('/leave-management', function () {
        $maxLeaveQuota = 30; // สิทธิ์ลาสูงสุด 30 วัน/ปี
        $usedDays = LeaveRequest::where('user_id', Auth::id())
            ->where('status', 'Approved')
            ->sum('total_days');
        
        $remainingDays = $maxLeaveQuota - $usedDays;

        return Inertia::render('LeaveManagement', [
            'remainingDays' => $remainingDays,
            'usedDays' => $usedDays,
            'user' => Auth::user()
        ]);
    })->name('leave.index');
});

use Illuminate\Http\Request;

Route::get('/leave-management', function (Request $request) {
    return Inertia::render('LeaveManagement', [
        'user' => $request->user(), // ส่งข้อมูล user รวมถึง role
        'remainingDays' => 10,       // กำหนดค่าเริ่มต้นวันลาคงเหลือ
        'usedDays' => 0,            // กำหนดค่าเริ่มต้นวันลาที่ใช้
    ]);
})->middleware(['auth', 'verified'])->name('leave-management');