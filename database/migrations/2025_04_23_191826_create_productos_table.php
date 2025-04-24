<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('modelo')->nullable();
            $table->integer('capacidad_litros');
            $table->decimal('altura_cm', 6, 2)->nullable();
            $table->decimal('diametro_cm', 6, 2)->nullable();
            $table->string('material')->nullable();
            $table->string('color')->nullable();
            $table->decimal('precio_venta', 10, 2);
            $table->decimal('costo_fabricacion', 10, 2)->nullable();
            $table->integer('stock')->default(0);
            $table->decimal('peso_kg', 6, 2)->nullable();
            $table->decimal('presion_maxima_bar', 5, 2)->nullable();
            $table->decimal('espesor_pared_mm', 5, 2)->nullable();
            $table->string('revestimiento_interno')->nullable();
            $table->integer('garantia_anios')->nullable();
            $table->decimal('temperatura_maxima_c', 5, 2)->nullable();
            $table->string('tipo_instalacion')->nullable();
            $table->text('conexiones_incluidas')->nullable();
            $table->string('certificaciones')->nullable();
            $table->boolean('resistencia_uv')->default(false);
            $table->string('uso_recomendado')->nullable();
            $table->boolean('activo')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
