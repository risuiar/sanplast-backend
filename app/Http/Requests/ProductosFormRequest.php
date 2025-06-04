<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductosFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    private const IMAGE_VALIDATION_RULE = 'nullable|file|mimes:jpg,jpeg,png|max:2048';

    public function rules(): array
    {
        return [
            'tipo' => 'required|in:tanque,cano,accesorio',
            'nombre' => 'required|max:255',
            'modelo' => 'max:255',
            'descripcion' => 'max:1000',
            'capacidad_litros' => 'required|numeric|min:0',
            'altura_cm' => 'numeric|min:0',
            'diametro_cm' => 'numeric|min:0',
            'material' => 'max:255',
            'color' => 'max:255',
            'precio_venta' => 'required|numeric|min:0',
            'costo_fabricacion' => 'numeric|min:0',
            'stock' => 'required|integer|min:0',
            'peso_kg' => 'numeric|min:0',
            'presion_maxima_bar' => 'numeric|min:0',
            'espesor_pared_mm' => 'numeric|min:0',
            'revestimiento_interno' => 'max:255',
            'garantia_anios' => 'integer|min:0',
            'temperatura_maxima_c' => 'numeric|min:0',
            'tipo_instalacion' => 'max:255',
            'conexiones_incluidas' => 'max:255',
            'certificaciones' => 'max:255',
            'resistencia_uv' => 'numeric|min:0',
            'uso_recomendado' => 'max:255',
            'activo' => 'boolean',
            'image1' => self::IMAGE_VALIDATION_RULE,
            'image2' => self::IMAGE_VALIDATION_RULE,
            'image3' => self::IMAGE_VALIDATION_RULE,
            'image4' => self::IMAGE_VALIDATION_RULE,
            'image5' => self::IMAGE_VALIDATION_RULE,
        ];
    }

    public function messages()
    {
        return [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.unique' => 'El nombre ya existe en la base de datos.',
            'nombre.string' => 'El campo nombre debe ser una cadena de texto.',
            'nombre.max' => 'El campo nombre no puede tener más de 255 caracteres.',
            'modelo.string' => 'El campo modelo debe ser una cadena de texto.',
            'modelo.max' => 'El campo modelo no puede tener más de 255 caracteres.',
            'descripcion.string' => 'El campo descripcion debe ser una cadena de texto.',
            'descripcion.max' => 'El campo descripcion no puede tener más de 1000 caracteres.',
            'capacidad_litros.numeric' => 'El campo capacidad litros debe ser un número.',
            'capacidad_litros.min' => 'El campo capacidad litros debe ser mayor o igual a 0.',
            'altura_cm.numeric' => 'El campo altura cm debe ser un número.',
            'altura_cm.min' => 'El campo altura cm debe ser mayor o igual a 0.',
            'diametro_cm.numeric' => 'El campo diametro cm debe ser un número.',
            'diametro_cm.min' => 'El campo diametro cm debe ser mayor o igual a 0.',
            'material.string' => 'El campo material debe ser una cadena de texto.',
            'material.max' => 'El campo material no puede tener más de 255 caracteres.',
            'color.string' => 'El campo color debe ser una cadena de texto.',
            'color.max' => 'El campo color no puede tener más de 255 caracteres.',
            'precio_venta.numeric' => 'El campo precio venta debe ser un número.',
            'precio_venta.min' => 'El campo precio venta debe ser mayor o igual a 0.',
            'costo_fabricacion.numeric' => 'El campo costo fabricacion debe ser un número.',
            'costo_fabricacion.min' => 'El campo costo fabricacion debe ser mayor o igual a 0.',
            'stock.integer' => 'El campo stock debe ser un número entero.',
            'stock.min' => 'El campo stock debe ser mayor o igual a 0.',
            'peso_kg.numeric' => 'El campo peso kg debe ser un número.',
            'peso_kg.min' => 'El campo peso kg debe ser mayor o igual a 0.',
            'presion_maxima_bar.numeric' => 'El campo presion maxima bar debe ser un número.',
            'presion_maxima_bar.min' => 'El campo presion maxima bar debe ser mayor o igual a 0.',
            'espesor_pared_mm.numeric' => 'El campo espesor pared mm debe ser un número.',
            'espesor_pared_mm.min' => 'El campo espesor pared mm debe ser mayor o igual a 0.',
            'revestimiento_interno.string' => 'El campo revestimiento interno debe ser una cadena de texto.',
            'revestimiento_interno.max' => 'El campo revestimiento interno no puede tener más de 255 caracteres.',
            'garantia_anios.integer' => 'El campo garantia años debe ser un número entero.',
            'garantia_anios.min' => 'El campo garantia años debe ser mayor o igual a 0.',
            'temperatura_maxima_c.numeric' => 'El campo temperatura maxima c debe ser un número.',
            'temperatura_maxima_c.min' => 'El campo temperatura maxima c debe ser mayor o igual a 0.',
            'tipo_instalacion.string' => 'El campo tipo instalacion debe ser una cadena de texto.',
            'tipo_instalacion.max' => 'El campo tipo instalacion no puede tener más de 255 caracteres.',
            'conexiones_incluidas.string' => 'El campo conexiones incluidas debe ser una cadena de texto.',
            'conexiones_incluidas.max' => 'El campo conexiones incluidas no puede tener más de 255 caracteres.',
            'certificaciones.string' => 'El campo certificaciones debe ser una cadena de texto.',
            'certificaciones.max' => 'El campo certificaciones no puede tener más de 255 caracteres.',
            'resistencia_uv.numeric' => 'El campo altura cm debe ser un número.',
            'resistencia_uv.min' => 'El campo costo fabricacion debe ser mayor o igual a 0.',
            'uso_recomendado.string' => 'El campo presion maxima bar debe ser un número.',
            'uso_recomendado.max' => 'El campo uso recomendado no puede tener más de 255 caracteres.',
            'activo.boolean' => 'El campo activo debe ser verdadero o falso.',
            'image1.file' => 'El campo file debe ser un archivo.',
            'image1.mimes' => 'El campo file debe ser una imagen (jpg, jpeg, png).',
            'image1.max' => 'El campo file no puede exceder los 2MB.',
            'image2.file' => 'El campo file debe ser un archivo.',
            'image2.mimes' => 'El campo file debe ser una imagen (jpg, jpeg, png).',
            'image2.max' => 'El campo file no puede exceder los 2MB.',
            'image3.file' => 'El campo file debe ser un archivo.',
            'image3.mimes' => 'El campo file debe ser una imagen (jpg, jpeg, png).',
            'image3.max' => 'El campo file no puede exceder los 2MB.',
            'image4.file' => 'El campo file debe ser un archivo.',
            'image4.mimes' => 'El campo file debe ser una imagen (jpg, jpeg, png).',
            'image4.max' => 'El campo file no puede exceder los 2MB.',
            'image5.file' => 'El campo file debe ser un archivo.',
            'image5.mimes' => 'El campo file debe ser una imagen (jpg, jpeg, png).',
            'image5.max' => 'El campo file no puede exceder los 2MB.',
        ];
    }

}
