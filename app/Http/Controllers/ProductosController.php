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

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $tipo)
    {
        $productsQuery = Productos::where('tipo', $tipo);
        $totalCount = $productsQuery->count();

        $allProducts = $productsQuery->latest()->get()->map(fn($producto) => [
            'id'            => $producto->id,
            'nombre'        => $producto->nombre,
            'modelo'        => $producto->modelo,
            'capacidad_litros' => $producto->capacidad_litros,
            'color'         => $producto->color,
            'stock'         => $producto->stock,
            'image1'          => $producto->image1,
            'image2'          => $producto->image2,
            'image3'          => $producto->image3,
            'image4'          => $producto->image4,
            'image5'          => $producto->image5,
            'activo'        => $producto->activo,
            'created_at'    => $producto->created_at->format('d/m/Y'),
        ]);
        $filteredCount = $productsQuery->count();
        $perPage = (int) ($request->perPage ?? 10);

        $productos = [
            'data'     => $allProducts,
            'total'    => $filteredCount,
            'per_page' => $perPage,
            'from'     => 1,
            'to'       => $filteredCount,
            'links'    => [],
        ];

        return Inertia::render('productos/index', [
            'productos' => $productos,
            'filters'  => [
                'search' => '',
                'trashed' => false,
            ],
            'totalCount' => $totalCount,
            'perPage' => 10,
            'currentPage' => 1,
            'tipo' => $tipo,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('productos/productos-form');
    }

    /**
     * Store a newly created resource in storage.
     * @param ProductosFormRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ProductosFormRequest $request)
    {
        function saveCreateImage($image, $request)
        {
            if ($request->file($image)) {
                $imageName = $request->file($image)->hashName();
                $request->file($image)->store('productos', 'public');
                return $imageName;
            }
            return null;
        }
        try {
            $productos = Productos::create([
                'tipo' => $request->tipo,
                'nombre' => $request->nombre,
                'modelo' => $request->modelo,
                'descripcion' => $request->descripcion,
                'capacidad_litros' => $request->capacidad_litros,
                'altura_cm' => $request->altura_cm,
                'diametro_cm' => $request->diametro_cm,
                'material' => $request->material,
                'color' => $request->color,
                'precio_venta' => $request->precio_venta,
                'costo_fabricacion' => $request->costo_fabricacion,
                'stock' => $request->stock,
                'peso_kg' => $request->peso_kg,
                'presion_maxima_bar' => $request->presion_maxima_bar,
                'espesor_pared_mm' => $request->espesor_pared_mm,
                'revestimiento_interno' => $request->revestimiento_interno,
                'garantia_anios' => $request->garantia_anios,
                'temperatura_maxima_c' => $request->temperatura_maxima_c,
                'tipo_instalacion' => $request->tipo_instalacion,
                'conexiones_incluidas' => $request->conexiones_incluidas,
                'certificaciones' => $request->certificaciones,
                'resistencia_uv' => $request->resistencia_uv,
                'uso_recomendado' => $request->uso_recomendado,
                'activo' => $request->activo,
                'destacado' => $request->destacado,
                'image1' => saveCreateImage('image1', $request),
                'image2' => saveCreateImage('image2', $request),
                'image3' => saveCreateImage('image3', $request),
                'image4' => saveCreateImage('image4', $request),
                'image5' => saveCreateImage('image5', $request),
                'created_by' => auth()->user()->id,
            ]);

            if ($productos) {
                return redirect()->route('productos.index', ['tipo' => $request->tipo])->with('success', 'Producto creado exitosamente.');
            }
            return redirect()->back()->with('error', 'Error al crear el producto.');

        } catch (Exception $e) {
            Log::error('Error al crear el producto: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al crear el producto: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Productos $producto)
    {
        $created_by = DB::table('users')->where('id', $producto->created_by)->first();
        $updated_by = DB::table('users')->where('id', $producto->updated_by)->first();
        $modifications = [];
        if ($producto->created_by) {
            $modifications += ['created_by' => $created_by->name];
        }
        if ($producto->updated_by) {
            $modifications += ['updated_by' => $updated_by->name];
        }

        return Inertia::render('productos/productos-form', [
            'producto' => $producto,
            'isView'  => true,
            'modifications' => $modifications,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Productos $producto)
    {
        $created_by = DB::table('users')->where('id', $producto->created_by)->first();
        $updated_by = DB::table('users')->where('id', $producto->updated_by)->first();
        $modifications = [];
        if ($producto->created_by) {
            $modifications += ['created_by' => $created_by->name];
        }
        if ($producto->updated_by) {
            $modifications += ['updated_by' => $updated_by->name];
        }
        return Inertia::render('productos/productos-form', [
            'producto' => $producto,
            'isEdit'  => true,
            'modifications' => $modifications,
        ]);
    }

    public function update(ProductosFormRequest $request, Productos $producto)
    {
        function saveImage($image, $request, $originalImage)
        {
            if ($request->file($image)) {
                $imageName = $request->file($image)->hashName();
                $request->file($image)->store('productos', 'public');
                return $imageName;
            }
            return $originalImage;
        }

        try {
            if ($producto) {
                $producto->tipo = $request->tipo;
                $producto->nombre = $request->nombre;
                $producto->modelo = $request->modelo;
                $producto->descripcion = $request->descripcion;
                $producto->capacidad_litros = $request->capacidad_litros;
                $producto->altura_cm = $request->altura_cm;
                $producto->diametro_cm = $request->diametro_cm;
                $producto->material = $request->material;
                $producto->color = $request->color;
                $producto->precio_venta = $request->precio_venta;
                $producto->costo_fabricacion = $request->costo_fabricacion;
                $producto->stock = $request->stock;
                $producto->peso_kg = $request->peso_kg;
                $producto->presion_maxima_bar = $request->presion_maxima_bar;
                $producto->espesor_pared_mm = $request->espesor_pared_mm;
                $producto->revestimiento_interno = $request->revestimiento_interno;
                $producto->garantia_anios = $request->garantia_anios;
                $producto->temperatura_maxima_c = $request->temperatura_maxima_c;
                $producto->tipo_instalacion = $request->tipo_instalacion;
                $producto->conexiones_incluidas = $request->conexiones_incluidas;
                $producto->certificaciones = $request->certificaciones;
                $producto->resistencia_uv = $request->resistencia_uv;
                $producto->uso_recomendado = $request->uso_recomendado;
                $producto->activo = $request->activo;
                $producto->destacado = $request->destacado;
                $producto->updated_by = auth()->user()->id;
                $producto->image1 = saveImage('image1', $request, $producto->image1);
                $producto->image2 = saveImage('image2', $request, $producto->image2);
                $producto->image3 = saveImage('image3', $request, $producto->image3);
                $producto->image4 = saveImage('image4', $request, $producto->image4);
                $producto->image5 = saveImage('image5', $request, $producto->image5);

                $producto->save();
                return redirect()->route('productos.index', ['tipo' => $request->tipo])->with('success', 'Producto actualizado exitosamente.');
            }
            return redirect()->back()->with('error', 'Error al actualizar el producto.');
        } catch (Exception $e) {
            Log::error('Product update failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al actualizar el producto: ' . $e->getMessage());
        }
    }

      /**
     * Delete image.
     */
    public function deleteimage($id, $imagename, $imageid)
    {
       try {
            if ($imagename) {
                    $path = public_path('images/productos/' . $imagename);
                    if (file_exists($path)) {
                        unlink($path);
                    }
                    Productos::where('id', $id)->update([
                        $imageid => null,
                        'updated_by' => auth()->user()->id,
                        'updated_at' => now(),
                    ]);
                    return redirect()->back()->with('success', 'Imagen eliminada exitosamente.');
            }
            return redirect()->back()->with('error', 'Error al eliminar la imagen.');
        } catch (Exception $e) {
            Log::error('Product update failed: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Productos $producto)
    {
        if ($producto) {
            $tipo = $producto->tipo;
            $producto->delete();
            return redirect()->route('productos.index', ['tipo' => $tipo])->with('success', 'Producto eliminado exitosamente.');
        } else {
            return redirect()->back()->with('error', 'Error al eliminar el producto.');
        }
    }
}
