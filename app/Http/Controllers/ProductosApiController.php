<?php

namespace App\Http\Controllers;

use App\Models\Productos;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\ProductosFormRequest;
use Illuminate\Support\Facades\DB;
use Auth;
use Illuminate\Support\Facades\Cache;

class ProductosApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tipo = $request->query('tipo', 'tanque');

        return Cache::remember("productos_activos_{$tipo}", 60, function () use ($tipo) {
            return Productos::where('activo', true)
                           ->where('tipo', $tipo)
                           ->orderBy('nombre')
                           ->get();
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Productos $producto)
    {
        return $producto;
    }
}
