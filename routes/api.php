<?php

use App\Http\Controllers\ProductosApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('check.apikey')->group(function () {
    Route::apiResource('productos', ProductosApiController::class);
});
