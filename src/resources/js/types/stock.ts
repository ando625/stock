// resources/js/types/stock.ts

export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    sku: string;
    name: string;
    description: string | null;
    price: number;
    current_stock: number;
    status: "active" | "inactive" | "out_of_stock";
    image_url: string | null;
    categories: Category[];
}


export interface User {
    id: number;
    name: string;
    email: string;
    role: string | number;
}

export interface StockLog {
    id: number;
    product_id: number;
    user_id: number;
    type: string;
    note: string | null;
    created_at: string;
    product?: Product;
    user?: User;
}

// laravelでpaginateしたものが返すデータ型
export interface PaginateData<T> {
    data: T[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    current_page: number;
    last_page: number;
    total: number;
}