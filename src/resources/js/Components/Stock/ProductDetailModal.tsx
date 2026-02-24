import React, { useEffect, useState } from "react";
import { Product } from "@/types/stock";
import { useForm } from "@inertiajs/react";

interface Props {
    product: Product;
    imageUrl: string;
    onClose: () => void;
}

export default function ProductDetailModal({
    product,
    imageUrl,
    onClose,
}: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        quantity: 1,
        type: "",
        note: "",
    });

    useEffect(() => {
        if (isSubmitting && data.type !== "") {
            post(route("products.stock.update", product.id), {
                onSuccess: () => {
                    reset();
                    alert(
                        data.type === "inbound"
                            ? "入荷しました！"
                            : "発送しました！",
                    );
                    setIsSubmitting(false);
                    onClose();
                },
                onError: () => setIsSubmitting(false),
            });
        }
    }, [data.type, isSubmitting]);

    const submitStockChange = (selectedType: "inbound" | "outbound") => {
        setData("type", selectedType);
        setIsSubmitting(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            {/* モーダル幅を 2xl で維持 */}
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 bg-gray-100 hover:bg-gray-200 text-gray-500 w-10 h-10 rounded-full flex items-center justify-center transition text-xl"
                >
                    &times;
                </button>

                <div className="overflow-y-auto">
                    <div className="w-full h-80 bg-gray-50 flex items-center justify-center p-6">
                        <img
                            src={imageUrl}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain drop-shadow-md"
                        />
                    </div>

                    <div className="p-10">
                        {/* タイトルと価格 */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                    {product.name}
                                </h2>
                                <p className="text-1xl font-mono text-gray-400 mt-2 uppercase tracking-widest">
                                    SKU: {product.sku}
                                </p>
                            </div>
                        </div>
                        <div className="text-right mb-4">
                            <p className="text-3xl font-black text-rose-500">
                                {product.price.toLocaleString()}
                                <span className="text-base ml-1 font-normal text-gray-500">
                                    円
                                </span>
                            </p>
                        </div>

                        {/* 商品説明 */}
                        <div className="mb-8 bg-gray-50/80 rounded-2xl p-6 border border-gray-100">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 text-left">
                                商品説明
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap text-left">
                                {product.description ||
                                    "説明文はまだ登録されていません。"}
                            </p>
                        </div>

                        {/* ★【ここを修正】在庫とカテゴリを中央寄りに配置 */}
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-16 mb-8 py-6 border-y border-gray-100 bg-gray-50/30 rounded-2xl">
                            {/* 在庫数エリア */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white shadow-sm rounded-2xl flex items-center justify-center text-xl">
                                    📦
                                </div>
                                <div className="text-left">
                                    <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none mb-1">
                                        現在の在庫
                                    </span>
                                    <span className="text-3xl font-black text-gray-800 leading-none">
                                        {product.current_stock}
                                        <span className="text-sm ml-1 font-bold">
                                            個
                                        </span>
                                    </span>
                                </div>
                            </div>

                            {/* 中央の仕切り線 */}
                            <div className="hidden sm:block w-px bg-gray-200 h-10"></div>

                            {/* カテゴリエリア */}
                            <div className="text-left">
                                <span className="text-[10px] text-gray-400 font-bold uppercase block leading-none mb-2">
                                    カテゴリ
                                </span>
                                <div className="flex gap-2">
                                    {product.categories.map((cat) => (
                                        <span
                                            key={cat.id}
                                            className="bg-white text-sky-600 px-3 py-1.5 rounded-full text-xs font-bold border border-sky-100 shadow-sm inline-block"
                                        >
                                            {cat.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 在庫操作フォーム */}
                        <div className="bg-gray-100/60 p-4 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-200">
                            <h4 className="text-xs font-bold text-gray-400 mb-5 uppercase tracking-widest text-center">
                                在庫入荷 ・ 発送の登録
                            </h4>

                            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                                <input
                                    type="number"
                                    className="w-full sm:w-24 h-12 rounded-xl border-gray-300 text-gray-900 font-black text-xl text-center focus:ring-4 focus:ring-indigo-100 transition-all"
                                    value={data.quantity}
                                    onChange={(e) =>
                                        setData("quantity", e.target.value)
                                    }
                                    min="1"
                                />
                                <input
                                    type="text"
                                    placeholder="理由 ・ メモを入力（例：〇〇商事より入荷）"
                                    value={data.note}
                                    onChange={(e) =>
                                        setData("note", e.target.value)
                                    }
                                    className="w-full sm:flex-1 h-12 rounded-xl border-gray-300 text-gray-900 font-medium px-4 focus:ring-4 focus:ring-indigo-100 transition-all text-sm shadow-sm"
                                />
                            </div>

                            {/* エラー表示 */}
                            {(errors.quantity || errors.type) && (
                                <div className="bg-red-50 border border-red-100 p-4 rounded-xl mb-4 text-red-600 text-xs font-bold text-left">
                                    {errors.quantity && (
                                        <p>⚠️ {errors.quantity}</p>
                                    )}
                                    {errors.type && (
                                        <p>⚠️ 操作の種類を選んでください</p>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    onClick={() => submitStockChange("inbound")}
                                    disabled={processing}
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl transition shadow-lg shadow-emerald-100 active:scale-95 text-base"
                                >
                                    入荷する
                                </button>
                                <button
                                    onClick={() =>
                                        submitStockChange("outbound")
                                    }
                                    disabled={processing}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl transition shadow-lg shadow-indigo-100 active:scale-95 text-base"
                                >
                                    発送完了
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
