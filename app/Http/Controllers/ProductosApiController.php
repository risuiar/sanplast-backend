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

class ProductosApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Productos::all();
    }

    /**
     * Display the specified resource.
     */
    public function show(Productos $producto)
    {
        return $producto;
    }
}
