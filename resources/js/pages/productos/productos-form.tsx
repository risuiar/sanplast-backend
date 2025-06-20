import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ImageUp, LoaderCircle, Trash2 } from 'lucide-react';
import { Producto } from './types';

export default function ProductosForm({
    producto,
    isView,
    isEdit,
    modifications,
}: {
    producto: Producto;
    isView?: boolean;
    isEdit?: boolean;
    modifications: {
        created_by: string;
        updated_by: string;
    };
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isView ? 'Mostrar' : isEdit ? 'Editar' : 'Crear'} Producto`,
            href: route('productos.create'),
        },
    ];

    const { data, setData, post, processing, errors, reset, get } = useForm({
        tipo: producto?.tipo ?? 'tanque',
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
        destacado: producto?.destacado ?? false,
        image1: null as File | null,
        image2: null as File | null,
        image3: null as File | null,
        image4: null as File | null,
        image5: null as File | null,
        _method: isEdit ? 'PUT' : 'POST',
    });
    const handleDeleteImage = (e: React.MouseEvent<SVGSVGElement>) => {
        e.preventDefault();
        const imageid = (e.target as SVGSVGElement).getAttribute('name');
        const imagename = producto[imageid as keyof Producto];
        if (imageid) {
            get(route('productos.deleteimage', { id: producto.id, imagename, imageid }), {
                forceFormData: true,
                onSuccess: () => reset(),
            });
        }
    };
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
        e.preventDefault();
        if (e.target.files && e.target.files.length > 0) {
            setData(e.target.name as keyof typeof data, e.target.files[0]);
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
                        <CardTitle className="relative">
                            {breadcrumbs[0].title}
                            {modifications && (
                                <div className="absolute -top-0.5 right-0 flex flex-row gap-2">
                                    <span className="text-xs text-gray-500" title={producto.created_at}>
                                        Creado por: {modifications.created_by}
                                    </span>
                                    <span className="pl-2 text-xs text-gray-500" title={producto.updated_at}>
                                        {' '}
                                        Modificado por: {modifications.updated_by}
                                    </span>
                                </div>
                            )}
                        </CardTitle>
                        <CardContent>
                            <form onSubmit={submit} className="flex flex-col gap-4 pt-4" autoComplete="off">
                                <div className="grid gap-2">
                                    <Label htmlFor="nombre">Categoría</Label>
                                    <Select value={data.tipo} onValueChange={(value) => setData('tipo', value as 'tanque' | 'cano' | 'accesorio')}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Tanque" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="tanque">Tanque</SelectItem>
                                                <SelectItem value="cano">Caño</SelectItem>
                                                <SelectItem value="accesorio">Accesorio</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
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
                                                disabled={formFieldsDisabled}
                                            />
                                            <InputError message={errors.material} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Array.from(Array(5).keys()).map((index) => {
                                            const currentImage = `image${index + 1}`;
                                            return (
                                                <div key={index} className="grid gap-2">
                                                    <div className="flex items-center self-start">
                                                        <Label className="flex capitalize">{currentImage}</Label>
                                                        {(isEdit || !isView) && (
                                                            <>
                                                                <label htmlFor={currentImage}>
                                                                    <ImageUp className="ml-2 cursor-pointer" />
                                                                </label>
                                                                {producto?.[currentImage as keyof Producto] && (
                                                                    <Trash2
                                                                        name={currentImage}
                                                                        onClick={handleDeleteImage}
                                                                        className="ml-2 cursor-pointer"
                                                                    />
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                    {!isView && (
                                                        <>
                                                            <Input
                                                                onChange={handleFileUpload}
                                                                id={currentImage}
                                                                name={currentImage}
                                                                type="file"
                                                                disabled={formFieldsDisabled}
                                                                className="hidden"
                                                            />
                                                            <InputError message={errors[currentImage as keyof typeof errors]} />
                                                            {data?.[currentImage as keyof typeof data] && (
                                                                <img
                                                                    src={URL.createObjectURL(data?.[currentImage as keyof typeof data] as File)}
                                                                    alt={currentImage}
                                                                    className="h-40 w-50 border object-contain"
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                    {producto?.[currentImage as keyof Producto] && (isView || isEdit) && (
                                                        <div className="grid gap-2">
                                                            <img
                                                                src={`/images/productos/${producto[currentImage as keyof Producto]}`}
                                                                alt={producto.nombre}
                                                                className="h-40 w-50 rounded-lg border object-contain"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
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
                                            disabled={formFieldsDisabled}
                                        />
                                        <InputError message={errors.uso_recomendado} />
                                    </div>
                                    <div>
                                        <div>
                                            <Switch id="activo" checked={data.activo} onCheckedChange={(e) => setData('activo', e)} />
                                            <Label htmlFor="activo" className="pl-2">
                                                Activo
                                            </Label>
                                        </div>
                                        <div>
                                            <Switch id="destacado" checked={data.destacado} onCheckedChange={(e) => setData('destacado', e)} />
                                            <Label htmlFor="destacado" className="pl-2">
                                                Destacado
                                            </Label>
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
