import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { Producto } from './types';

export default function ProductosForm({ producto, isView, isEdit }: { producto: Producto; isView?: boolean; isEdit?: boolean }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isView ? 'Mostrar' : isEdit ? 'Editar' : 'Crear'} Producto`,
            href: route('productos.create'),
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: producto?.nombre ?? '',
        modelo: producto?.modelo ?? '',
        descripcion: producto?.descripcion ?? '',
        capacidad_litros: producto?.capacidad_litros ?? 0,
        altura_cm: producto?.altura_cm ?? 0,
        diametro_cm: producto?.diametro_cm ?? 0,
        material: producto?.material ?? '',
        color: producto?.color ?? '',
        precio_venta: producto?.precio_venta ?? 0,
        costo_fabricacion: producto?.costo_fabricacion ?? 0,
        stock: producto?.stock ?? 0,
        peso_kg: producto?.peso_kg ?? 0,
        presion_maxima_bar: producto?.presion_maxima_bar ?? 0,
        espesor_pared_mm: producto?.espesor_pared_mm ?? 0,
        revestimiento_interno: producto?.revestimiento_interno ?? '',
        garantia_anios: producto?.garantia_anios ?? 0,
        temperatura_maxima_c: producto?.temperatura_maxima_c ?? 0,
        tipo_instalacion: producto?.tipo_instalacion ?? '',
        resistencia_uv: producto?.resistencia_uv ?? 0,
        conexiones_incluidas: producto?.conexiones_incluidas ?? '',
        certificaciones: producto?.certificaciones ?? '',
        uso_recomendado: producto?.uso_recomendado ?? '',
        activo: producto?.activo ?? false,
        file: null as File | null,
        _method: isEdit ? 'PUT' : 'POST',
    });
    console.log(data);
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isEdit) {
            post(route('productos.update', producto.id), {
                forceFormData: true,
                onSuccess: () => reset(),
            });
        } else {
            post(route('productos.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('file', e.target.files[0]);
        }
    };

    const formFieldsDisabled = isView || processing;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="ml-auto">
                    <Link
                        href={route('productos.index')}
                        as="button"
                        className="bg-sanplast flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm text-white hover:opacity-90"
                    >
                        <ArrowLeft className="me-2" /> Volver a Productos
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>{breadcrumbs[0].title}</CardTitle>
                        <CardContent>
                            <form onSubmit={submit} className="flex flex-col gap-4 pt-4" autoComplete="off">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="nombre">Nombre</Label>
                                        <Input
                                            onChange={(e) => setData('nombre', e.target.value)}
                                            value={data.nombre}
                                            id="nombre"
                                            name="nombre"
                                            type="text"
                                            placeholder="Nombre del producto"
                                            autoFocus
                                            tabIndex={0}
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.nombre} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="modelo">Modelo</Label>
                                        <Input
                                            onChange={(e) => setData('modelo', e.target.value)}
                                            value={data.modelo}
                                            id="modelo"
                                            name="modelo"
                                            placeholder="Modelo del producto"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.modelo} />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="descripcion">Descripción</Label>
                                    <Textarea
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        value={data.descripcion}
                                        id="descripcion"
                                        name="descripcion"
                                        placeholder="Descripción del producto"
                                        autoFocus
                                        disabled={formFieldsDisabled}
                                    />
                                    <InputError message={errors.descripcion} />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="grid gap-2">
                                        <div>
                                            <Label htmlFor="capacidad_litros">Capacidad litros</Label>
                                            <Input
                                                onChange={(e) => setData('capacidad_litros', Number(e.target.value))}
                                                value={data.capacidad_litros}
                                                id="capacidad_litros"
                                                name="capacidad_litros"
                                                placeholder="Capacidad litros"
                                                autoFocus
                                                disabled={formFieldsDisabled}
                                            />
                                            <InputError message={errors.capacidad_litros} />
                                        </div>
                                        <div>
                                            <Label htmlFor="altura_cm">Altura CM</Label>
                                            <Input
                                                onChange={(e) => setData('altura_cm', Number(e.target.value))}
                                                value={data.altura_cm}
                                                id="altura_cm"
                                                name="altura_cm"
                                                placeholder="Altura CM"
                                                autoFocus
                                                disabled={formFieldsDisabled}
                                            />
                                            <InputError message={errors.altura_cm} />
                                        </div>
                                        <div>
                                            <Label htmlFor="diametro_cm">Diametro CM</Label>
                                            <Input
                                                onChange={(e) => setData('diametro_cm', Number(e.target.value))}
                                                value={data.diametro_cm}
                                                id="diametro_cm"
                                                name="diametro_cm"
                                                placeholder="Diametro CM"
                                                autoFocus
                                                disabled={formFieldsDisabled}
                                            />
                                            <InputError message={errors.diametro_cm} />
                                        </div>
                                        <div>
                                            <Label htmlFor="material">Material</Label>
                                            <Input
                                                onChange={(e) => setData('material', e.target.value)}
                                                value={data.material}
                                                id="material"
                                                name="material"
                                                placeholder="Material"
                                                autoFocus
                                                disabled={formFieldsDisabled}
                                            />
                                            <InputError message={errors.material} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="file">Imagen</Label>
                                        {!isView && (
                                            <>
                                                <Input
                                                    onChange={handleFileUpload}
                                                    id="file"
                                                    name="file"
                                                    type="file"
                                                    autoFocus
                                                    disabled={formFieldsDisabled}
                                                />
                                                <InputError message={errors.file} />
                                            </>
                                        )}
                                        {isView ||
                                            (isEdit && (
                                                <div className="grid gap-2">
                                                    <Label htmlFor="featured_image">Imagen actual</Label>
                                                    <img src={`/${producto.file}`} alt="Imagen" className="h-40 w-50 rounded-lg border" />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="color">Color</Label>
                                        <Input
                                            onChange={(e) => setData('color', e.target.value)}
                                            value={data.color}
                                            id="color"
                                            name="color"
                                            placeholder="Color"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.color} />
                                    </div>
                                    <div>
                                        <Label htmlFor="precio_venta">Precio Venta</Label>
                                        <Input
                                            onChange={(e) => setData('precio_venta', Number(e.target.value))}
                                            value={data.precio_venta}
                                            id="precio_venta"
                                            name="precio_venta"
                                            placeholder="Precio Venta"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.precio_venta} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="costo_fabricacion">Costo Fabricacion</Label>
                                        <Input
                                            onChange={(e) => setData('costo_fabricacion', Number(e.target.value))}
                                            value={data.costo_fabricacion}
                                            id="costo_fabricacion"
                                            name="costo_fabricacion"
                                            placeholder="Costo Fabricacion"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.costo_fabricacion} />
                                    </div>
                                    <div>
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input
                                            onChange={(e) => setData('stock', Number(e.target.value))}
                                            value={data.stock}
                                            id="stock"
                                            name="stock"
                                            placeholder="Stock"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.stock} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="peso_kg">Peso KG</Label>
                                        <Input
                                            onChange={(e) => setData('peso_kg', Number(e.target.value))}
                                            value={data.peso_kg}
                                            id="peso_kg"
                                            name="peso_kg"
                                            placeholder="Peso KG"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.peso_kg} />
                                    </div>
                                    <div>
                                        <Label htmlFor="presion_maxima_bar">Presion Maxima Bar</Label>
                                        <Input
                                            onChange={(e) => setData('presion_maxima_bar', Number(e.target.value))}
                                            value={data.presion_maxima_bar}
                                            id="presion_maxima_bar"
                                            name="presion_maxima_bar"
                                            placeholder="Presion Maxima Bar"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.presion_maxima_bar} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="espesor_pared_mm">Espesor Pared MM</Label>
                                        <Input
                                            onChange={(e) => setData('espesor_pared_mm', Number(e.target.value))}
                                            value={data.espesor_pared_mm}
                                            id="espesor_pared_mm"
                                            name="espesor_pared_mm"
                                            placeholder="Espesor Pared MM"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.espesor_pared_mm} />
                                    </div>
                                    <div>
                                        <Label htmlFor="revestimiento_interno">Revestimiento Interno</Label>
                                        <Input
                                            onChange={(e) => setData('revestimiento_interno', e.target.value)}
                                            value={data.revestimiento_interno}
                                            id="revestimiento_interno"
                                            name="revestimiento_interno"
                                            placeholder="Revestimiento Interno"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.revestimiento_interno} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="garantia_anios">Garantia años</Label>
                                        <Input
                                            onChange={(e) => setData('garantia_anios', Number(e.target.value))}
                                            value={data.garantia_anios}
                                            id="garantia_anios"
                                            name="garantia_anios"
                                            placeholder="Garantia años"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.garantia_anios} />
                                    </div>
                                    <div>
                                        <Label htmlFor="temperatura_maxima_c">Temperatura Maxima C°</Label>
                                        <Input
                                            onChange={(e) => setData('temperatura_maxima_c', Number(e.target.value))}
                                            value={data.temperatura_maxima_c}
                                            id="temperatura_maxima_c"
                                            name="temperatura_maxima_c"
                                            placeholder="Temperatura Maxima C°"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.temperatura_maxima_c} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="tipo_instalacion">Tipo instalacion</Label>
                                        <Input
                                            onChange={(e) => setData('tipo_instalacion', e.target.value)}
                                            value={data.tipo_instalacion}
                                            id="tipo_instalacion"
                                            name="tipo_instalacion"
                                            placeholder="Tipo instalacion"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.tipo_instalacion} />
                                    </div>
                                    <div>
                                        <Label htmlFor="conexiones_incluidas">Conexiones incluidas</Label>
                                        <Input
                                            onChange={(e) => setData('conexiones_incluidas', e.target.value)}
                                            value={data.conexiones_incluidas}
                                            id="conexiones_incluidas"
                                            name="conexiones_incluidas"
                                            placeholder="Conexiones incluidas"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.conexiones_incluidas} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="certificaciones">Certificaciones</Label>
                                        <Input
                                            onChange={(e) => setData('certificaciones', e.target.value)}
                                            value={data.certificaciones}
                                            id="certificaciones"
                                            name="certificaciones"
                                            placeholder="Certificaciones"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.certificaciones} />
                                    </div>
                                    <div>
                                        <Label htmlFor="resistencia_uv">Resistencia UV</Label>
                                        <Input
                                            onChange={(e) => setData('resistencia_uv', Number(e.target.value))}
                                            value={data.resistencia_uv}
                                            id="resistencia_uv"
                                            name="resistencia_uv"
                                            placeholder="Resistencia UV"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.resistencia_uv} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="uso_recomendado">Uso recomendado</Label>
                                        <Input
                                            onChange={(e) => setData('uso_recomendado', e.target.value)}
                                            value={data.uso_recomendado}
                                            id="uso_recomendado"
                                            name="uso_recomendado"
                                            placeholder="Uso recomendado"
                                            autoFocus
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.uso_recomendado} />
                                    </div>
                                    <div>
                                        <Label htmlFor="activo">Activo</Label>
                                        <div>
                                            <Switch id="activo" checked={data.activo} onCheckedChange={(e) => setData('activo', e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-6">
                                    {!isView && (
                                        <Button type="submit" className="mt-4 w-fit cursor-pointer">
                                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                            {processing ? (isEdit ? 'Actualizando... ' : 'Creando...') : isEdit ? 'Actualizar' : 'Crear'} Producto
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
