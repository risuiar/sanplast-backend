<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    protected $fillable = [
        'tipo',
        'nombre',
        'modelo',
        'descripcion',
        'capacidad_litros',
        'altura_cm',
        'diametro_cm',
        'material',
        'color',
        'precio_venta',
        'costo_fabricacion',
        'stock',
        'peso_kg',
        'presion_maxima_bar',
        'espesor_pared_mm',
        'revestimiento_interno',
        'garantia_anios',
        'temperatura_maxima_c',
        'tipo_instalacion',
        'conexiones_incluidas',
        'certificaciones',
        'resistencia_uv',
        'uso_recomendado',
        'activo',
        'destacado',
        'image1',
        'image2',
        'image3',
        'image4',
        'image5',
        'created_at',
        'created_by',
        'updated_at',
        'updated_by',
    ];
}
