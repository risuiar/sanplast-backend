export interface Producto {
    id: number;
    nombre: string;
    modelo?: string;
    descripcion?: string;
    capacidad_litros?: number;
    altura_cm?: number;
    diametro_cm?: number;
    material?: string;
    color?: string;
    precio_venta?: number;
    costo_fabricacion?: number;
    stock?: number;
    peso_kg?: number;
    presion_maxima_bar?: number;
    espesor_pared_mm?: number;
    revestimiento_interno?: string;
    garantia_anios?: number;
    temperatura_maxima_c?: number;
    tipo_instalacion?: string;
    conexiones_incluidas?: string;
    certificaciones?: string;
    resistencia_uv?: number;
    uso_recomendado?: string;
    activo: boolean;
    file?: string;
    created_at: string;
    updated_at: string;
}

interface LinkProps {
    active: boolean;
    label: string;
    url: string;
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

export interface IndexProps {
    productos: ProductPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}
