// resources/js/Components/ProductCard.tsx

import React, { useState } from "react";
import { Category, Product } from "@/types/stock";
import ProductDetailModal from "./ProductDetailModal";
import EditProductModal from "./EditProductModal";
import { usePage } from '@inertiajs/react';




interface Props {
    product: Product;
    isAdmin?: boolean;
    categories:Category[]
}

export default function ProductCard({ product, isAdmin =false, categories}: Props) {
    // 詳細モーダルを開くためのスイッチ
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);  //管理者用モーダルスイッチ


    // 在庫アラート判定
    const isLowStock = product.current_stock <= 10;

    // ステータスによって色を変える（バッジ）
    const statusColor = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-gray-100 text-gray-800",
        out_of_stock: "bg-red-100 text-red-800",
    };

    // 画像のURLを作る共通ロジック
    const imageUrl = product.image_url
            ? `/storage/${product.image_url}`
        : "/images/no-image.png";

    return (
        <>
            <div
                // 管理者は「編集」、一般は「詳細」を開く
                onClick={() => isAdmin ? setIsEditOpen(true) : setIsDetailOpen(true)}
                className={`relative bg-white overflow-hidden shadow-sm sm:rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition ${isAdmin ? "hover:border-indigo-400" : ""}`}
            >
                {/* 在庫アラートバッジ */}
                {isLowStock && (
                    <div className="absolute top-2 left-2 z-10 animate-bounce">
                        <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg flex items-center gap-1">
                            ⚠️残り{product.current_stock}点
                        </span>
                    </div>
                )}

                {/* 画像部分 */}
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="mt-4">
                    <div>
                        <h3 className="text-sm font-bold text-gray-700 line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                        </h3>
                        <p className="mt-1 text-[10] text-gray-400">
                            SKU: {product.sku}
                        </p>
                    </div>
                    <div className="mt-2 flex justify-end items-baseline gap-1">
                        <span className="text-lg font-bold text-gray-900">
                            {product.price.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-gray-600">円</span>
                    </div>

                    {/* カテゴリを表示 */}
                    <div className="mt-3 flex items-center flex-wrap gap-x-2 gap-y-1 border-t border-gray-50 pt-2">
                        {/* ステータスを表示 */}
                        <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[13px] font-bold ${statusColor[product.status]}`}
                        >
                            {product.status === "active"
                                ? "販売中"
                                : product.status === "out_of_stock"
                                  ? "欠品"
                                  : "停止中"}
                        </span>

                        {product.categories.map((cat) => (
                            <span
                                key={cat.id}
                                className="text-[13px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 shadow-sm"
                            >
                                {cat.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 一般スタッフ用：在庫出し入れ */}
            {isDetailOpen && (
                <ProductDetailModal
                    product={product}
                    imageUrl={imageUrl}
                    onClose={() => setIsDetailOpen(false)}
                />
            )}

            {/* 管理者用：表品そのものを編集 */}
            {isEditOpen && (
                <EditProductModal
                    product={product}
                    imageUrl={imageUrl}
                    categories={categories}
                    onClose={() => setIsEditOpen(false)}
                />
            )}
        </>
    );
}
