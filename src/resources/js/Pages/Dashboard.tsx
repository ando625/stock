import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import ProductCard from '@/Components/Stock/ProductCard';


// 1. 共通の型を定義しておく
interface Category {
    id: number;
    name: string;
}

interface Product {
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

export default function Dashboard({products, categories }: {products: Product[], categories:Category[]}) {
    return (
        <AuthenticatedLayout
            categories = {categories}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
