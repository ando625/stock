import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductCard from '@/Components/Stock/ProductCard';
import { Category, Product, StockLog, PaginateData } from "@/types/stock";

interface Props {
    products: Product[];
    categories: Category[];
    logs: PaginateData<StockLog>; 
}

export default function AdminDashboard({ products, categories, logs }: Props) {
    return (
        <AuthenticatedLayout categories={categories}>
            <Head title="管理者ダッシュボード" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-500">
                            商品マスタ管理
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isAdmin={true}
                                categories={categories}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}