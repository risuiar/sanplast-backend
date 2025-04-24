import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/productos',
    },
];

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
}
interface Producto {
    id: number;
    nombre: string;
    modelo: string;
    color: string;
    capacidad_litros: number;
    stock: string;
    file: string;
}
interface ProductPagination {
    data: Producto[];
    links: LinkProps[];
    from: number;
    to: number;
    total: number;
}

interface FilterProps {
    search: string;
    perPage: string;
}

interface IndexProps {
    productos: ProductPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}

export default function Index({ productos, filters, totalCount, filteredCount }: IndexProps) {
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success ?? flash?.error;
    console.log(productos);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />

            {flash?.success ||
                (flash?.error && (
                    <Alert variant="default">
                        <AlertTitle>{flash?.success ? 'Success' : 'Error'}</AlertTitle>
                        <AlertDescription>{flashMessage}</AlertDescription>
                    </Alert>
                ))}

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
                        <TableCaption>Lista de productos</TableCaption>
                        <TableHeader>
                            <TableRow className="bg-sanplast/40">
                                <TableHead className="w-[100px]">Nombre</TableHead>
                                <TableHead>Modelo</TableHead>
                                <TableHead>Capacidad litros</TableHead>
                                <TableHead>Color</TableHead>
                                <TableHead className="text-right">Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productos.data.map((product) => (
                                <TableRow key={product.nombre} className="even:bg-sanplast/10 odd:bg-white">
                                    <TableCell className="font-medium">{product.nombre}</TableCell>
                                    <TableCell className="font-medium">{product.modelo}</TableCell>
                                    <TableCell>{product.capacidad_litros}</TableCell>
                                    <TableCell>{product.color}</TableCell>
                                    <TableCell className="text-right">{product.stock}</TableCell>
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
