<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    protected $fillable = [
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
        'file'
    ];
}
