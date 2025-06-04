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

    Route::get('/productos/categoria/{tipo?}', [ProductosController::class, 'index'])
        ->where('tipo', '.*')
        ->defaults('tipo', 'tanque')
        ->name('productos.index');
    Route::resource('productos', ProductosController::class)
        ->except(['index']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
