import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crear Producto',
        href: route('productos.create'),
    },
];

export default function ProductosForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        modelo: '',
        descripcion: '',
        capacidad_litros: 0,
        precio_venta: 0,
        stock: 0,
        resistencia_uv: 0,
        activo: false,
        file: null as File | null,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('productos.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setData('file', e.target.files[0]);
        }
    };
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
                        <CardTitle>Crear Producto</CardTitle>
                        <CardContent>
                            <form onSubmit={submit} className="flex flex-col gap-4 pt-4" autoComplete="off">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="nombre">Nombre</Label>
                                        <Input
                                            onChange={(e) => setData('nombre', e.target.value)}
                                            value={data.nombre}
                                            id="v"
                                            name="nombre"
                                            type="text"
                                            placeholder="Nombre del producto"
                                            autoFocus
                                            tabIndex={0}
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
                                            tabIndex={1}
                                        />
                                        <InputError message={errors.modelo} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="capacidad_litros">Capacidad litros</Label>
                                        <Input
                                            onChange={(e) => setData('capacidad_litros', Number(e.target.value))}
                                            value={data.capacidad_litros}
                                            id="capacidad_litros"
                                            name="capacidad_litros"
                                            placeholder="Capacidad litros"
                                            autoFocus
                                            tabIndex={2}
                                        />
                                        <InputError message={errors.capacidad_litros} />
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
                                            tabIndex={2}
                                        />
                                        <InputError message={errors.descripcion} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="file">Imagen</Label>
                                        <Input onChange={handleFileUpload} id="file" name="file" type="file" autoFocus tabIndex={2} />
                                        <InputError message={errors.file} />
                                    </div>
                                    <Button type="submit" className="mt-4 w-fit cursor-pointer" tabIndex={3}>
                                        Guardar Producto
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        </AppLayout>
    );
}
