<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductStockController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\StockLogController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';

Route::get('/test', function(){
    return Inertia::render('Test');
});


// --------------------------------------------------
// 管理者エリア（admin/...）
// --------------------------------------------------
Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'admin_check'])
    ->group(function() {

    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

    // 商品新規登録
    Route::post('/products', [AdminProductController::class, 'store'])->name('products.store');

    // 商品編集
    Route::patch('/products/{product}', [AdminProductController::class, 'update'])->name('products.update');

    // 商品削除
    Route::delete('/products/{product}', [AdminProductController::class, 'productDestroy'])->name('products.destroy');

    // カテゴリ削除
    Route::delete('/categories/{category}', [AdminProductController::class, 'destroy'])->name('categories.destroy');

    // ログ表示
    Route::get('/logs', [StockLogController::class, 'index'])->name('logs.index');

});


// --------------------------------------------------
// 一般ユーザーエリア
// --------------------------------------------------
Route::middleware(['auth', 'verified'])->group(function(){

    // 商品一覧
    Route::get('/dashboard', [ProductController::class, 'index'])->name('dashboard');

    // 商品詳細から在庫増減
    Route::post('/products/{product}/stock', [ProductStockController::class, 'update'])
        ->name('products.stock.update');



});
