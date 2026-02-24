import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import ProductCard from '@/Components/Stock/ProductCard';
import { Category, Product } from "@/types/stock";



export default function Dashboard({ products, categories }: { products: Product[], categories: Category[] }) {
    
    // 管理者かどうか
    const { auth } = usePage().props as any;
    const isAdmin = auth.user && Number(auth.user.role) === 1;

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
                                    categories={categories}
                                    product={product}
                                    isAdmin={isAdmin}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
