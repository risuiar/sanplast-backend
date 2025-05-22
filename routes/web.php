<?php

use App\Http\Controllers\ProductosController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/productos/deleteimage/{id}/{imagename}/{imageid}', [ProductosController::class, 'deleteimage'])->name('productos.deleteimage');
    Route::resource('productos', ProductosController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
