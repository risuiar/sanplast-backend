import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/productos',
    },
];

const invoices = [
    {
        nombre: 'Ventajoso',
        modelo: 'Vertical',
        capacidad_litros: '700',
        color: 'Negro',
        stock: 16,
    },
    {
        nombre: 'Ventajoso',
        modelo: 'Vertical',
        capacidad_litros: '700',
        color: 'Azul',
        stock: 25,
    },
    {
        nombre: 'Ventajoso',
        modelo: 'Vertical',
        capacidad_litros: '900',
        color: 'Negro',
        stock: 36,
    },
    {
        nombre: 'Ventajoso',
        modelo: 'Vertical',
        capacidad_litros: '900',
        color: 'Azul',
        stock: 9,
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="ml-auto">
                <Link
                    className="bg-sanplast m-2 cursor-pointer rounded-lg px-4 py-2 text-sm text-white hover:opacity-90"
                    href={route('productos.create')}
                    as="button"
                >
                    Agregar Producto
                </Link>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow className="bg-sanplast/40">
                                <TableHead className="w-[100px]">nombre</TableHead>
                                <TableHead>modelo</TableHead>
                                <TableHead>capacidad_litros</TableHead>
                                <TableHead>color</TableHead>
                                <TableHead className="text-right">stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.nombre} className="even:bg-sanplast/10 odd:bg-white">
                                    <TableCell className="font-medium">{invoice.nombre}</TableCell>
                                    <TableCell className="font-medium">{invoice.modelo}</TableCell>
                                    <TableCell>{invoice.capacidad_litros}</TableCell>
                                    <TableCell>{invoice.color}</TableCell>
                                    <TableCell className="text-right">{invoice.stock}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="bg-sanplast/60">
                                <TableCell colSpan={4}>Total</TableCell>
                                <TableCell className="text-right">59</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
