import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crear Producto',
        href: route('productos.create'),
    },
];

export default function ProductosForm() {
    useForm();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl pr-4 pl-4">
                <div className="ml-auto">
                    <Link
                        href={route('productos.index')}
                        as="button"
                        className="bg-sanplast m-2 w-fit cursor-pointer rounded-lg px-4 py-2 text-sm text-white hover:opacity-90"
                    >
                        Volver a Productos
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Crear Producto</CardTitle>
                        <CardContent>
                            <form className="flex flex-col gap-4 pt-4" autoComplete="off">
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nombre</Label>
                                        <Input id="name" name="name" type="text" placeholder="Nombre del producto" required autoFocus tabIndex={0} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Modelo</Label>
                                        <Input id="modelo" name="modelo" placeholder="Modelo del producto" required autoFocus tabIndex={1} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Descripción</Label>
                                        <Textarea id="modelo" name="modelo" placeholder="Modelo del producto" required autoFocus tabIndex={2} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Imagen</Label>
                                        <Input id="imagen" name="imagen" type="file" required autoFocus tabIndex={2} />
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
