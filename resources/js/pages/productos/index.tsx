import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Check, CirclePlusIcon, Eye, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IndexProps } from './types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/productos',
    },
];
// , filters, totalCount, filteredCount
export default function Index({ productos, tipo }: IndexProps & { tipo: string }) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success ?? flash?.error;
    const [showAlert, setShowAlert] = useState(!!(flash?.success ?? flash?.error));
    let productsCount = 0;

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => setShowAlert(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);
    console.log(tipo);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showAlert && flashMessage && (
                    <Alert
                        variant={'default'}
                        className={`${flash?.success ? 'bg-green-700' : flash?.error ? 'bg-red-800' : ''} ml-auto w-fit text-white`}
                    >
                        <AlertDescription className="text-white">
                            {flash?.success ? 'Éxito!' : 'Error!'} {''}
                            {flashMessage}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="flex justify-between gap-4">
                    <div className="flex gap-4">
                        <Link
                            className={`${tipo === 'tanque' ? 'bg-sanplast' : 'bg-sanplast/50'} flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm text-white hover:opacity-90`}
                            href={route('productos.index', { tipo: 'tanque' })}
                            as="button"
                        >
                            Tanques
                        </Link>
                        <Link
                            className={`${tipo === 'cano' ? 'bg-sanplast' : 'bg-sanplast/50'} flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm text-white hover:opacity-90`}
                            href={route('productos.index', { tipo: 'cano' })}
                            as="button"
                        >
                            Caños
                        </Link>
                        <Link
                            className={`${tipo === 'accesorio' ? 'bg-sanplast' : 'bg-sanplast/50'} flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm text-white hover:opacity-90`}
                            href={route('productos.index', { tipo: 'accesorio' })}
                            as="button"
                        >
                            Accesorios
                        </Link>
                    </div>
                    <Link
                        className="bg-sanplast flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm text-white hover:opacity-90"
                        href={route('productos.create')}
                        as="button"
                    >
                        <CirclePlusIcon className="me-2" /> Agregar Producto
                    </Link>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>Lista de productos</TableCaption>
                        <TableHeader>
                            <TableRow className="bg-sanplast/40">
                                <TableHead className="w-[50px]">#</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Modelo</TableHead>
                                <TableHead>Capacidad litros</TableHead>
                                <TableHead>Imagen</TableHead>
                                <TableHead>Color</TableHead>
                                <TableHead>Activo</TableHead>
                                <TableHead>Creado</TableHead>
                                <TableHead className="text-right">Stock</TableHead>
                                <TableHead>Acción</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productos.data.map((product) => {
                                productsCount += product.stock ?? 0;
                                return (
                                    <TableRow key={product.nombre} className="even:bg-sanplast/10 odd:bg-white">
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.nombre}</TableCell>
                                        <TableCell>{product.modelo}</TableCell>
                                        <TableCell>{product.capacidad_litros}</TableCell>
                                        <TableCell>
                                            {product.image1 && (
                                                <img
                                                    src={`/images/productos/${product.image1}`}
                                                    alt={product.nombre}
                                                    className="h-16 w-20 rounded-lg object-contain"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>{product.color}</TableCell>
                                        <TableCell>{product.activo ? <Check size={18} color="green" /> : ''}</TableCell>
                                        <TableCell>{product.created_at}</TableCell>
                                        <TableCell className="text-right">{product.stock}</TableCell>
                                        <TableCell>
                                            <Link
                                                as="button"
                                                className="cursor-pointer rounded-lg bg-sky-600 p-2 text-white hover:opacity-90"
                                                href={route('productos.show', product.id)}
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <Link
                                                as="button"
                                                className="ms-2 cursor-pointer rounded-lg bg-blue-600 p-2 text-white hover:opacity-90"
                                                href={route('productos.edit', product.id)}
                                            >
                                                <Pencil size={18} />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="bg-sanplast/60">
                                <TableCell colSpan={8}>Total</TableCell>
                                <TableCell className="text-right">
                                    <b>{productsCount}</b>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
