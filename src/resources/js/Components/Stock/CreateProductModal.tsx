import React from 'react';
import { useForm } from '@inertiajs/react';
import { Category } from "@/types/stock";

interface Props {
    onClose: () => void;
    categories: Category[];
}

export default function CreateProductModal({ onClose, categories }: Props) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        sku: '',
        price: '',
        description: '',
        current_stock: '',
        category_id: '',
        status: 'active',
        image_url: '',
        new_category_name: '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <div className="bg-[#25282c] w-full max-w-2xl p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        新規商品登録
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white text-2xl"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 商品名 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="blok text-sm font-bold text-gray-400 mb-1">
                                商品名
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full bg-[#1a1c20] border-gray-600 rounded-lg text-white focus-ring-rose-500"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="blok text-sm font-bold text-gray-400 mb-1">
                                SKU(型番)
                            </label>
                            <input
                                type="text"
                                value={data.sku}
                                onChange={(e) => setData("sku", e.target.value)}
                                placeholder="ACC-RI-001"
                                className="w-full bg-[#1a1c20] border-gray-600 rounded-lg text-white"
                            />
                            {errors.sku && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.sku}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* 価格・在庫・ステータス */}
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                価格 (円)
                            </label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    // もし入力が空なら "" を、数字があれば Number(val) を入れる
                                    setData(
                                        "price",
                                        val === "" ? "" : Number(val),
                                    );
                                }}
                                className="w-full bg-[#1a1c20] border-gray-600 rounded-lg text-white"
                            />
                            {errors.price && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.price}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-1">
                                在庫数
                            </label>
                            <input
                                type="number"
                                value={data.current_stock}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    // ここも同じ！空っぽを許容する
                                    setData(
                                        "current_stock",
                                        val === "" ? "" : Number(val),
                                    );
                                }}
                                className="w-full bg-[#1a1c20] border-gray-600 rounded-lg text-white"
                            />
                            {errors.current_stock && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.current_stock}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-1">
                                ステータス
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData("status", e.target.value)
                                }
                                className="w-full bg-[#1a1c20] border-gray-600 rounded-lg text-white text-sm"
                            >
                                <option value="active">販売中</option>
                                <option value="out_of_stock">在庫切れ</option>
                                <option value="inactive">停止</option>
                            </select>
                        </div>
                    </div>

                    {/* カテゴリ選択作成 */}
                    <div className="p-4 bg-[#1a1c20] rounded-xl border border-gray-700 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">
                                既存カテゴリ
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) => {
                                    setData("category_id", e.target.value);
                                    if (e.target.value !== "")
                                        setData("new_category_name", "");
                                }}
                                className="w-full bg-[#25282c] border-gray-600 rounded-lg text-white"
                            >
                                <option value="">選択してください</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        <div className="relative flex items-center py-1">
                            <div className="flex-grow border-t border-gray-800"></div>
                            <span className="mx-3 text-[10px] text-gray-600 font-bold">
                                OR
                            </span>
                            <div className="flex-grow border-t border-gray-800"></div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-sky-500 mb-2 uppercase">
                                新しくカテゴリを作る
                            </label>
                            <input
                                type="text"
                                value={data.new_category_name}
                                onChange={(e) => {
                                    setData(
                                        "new_category_name",
                                        e.target.value,
                                    );
                                    if (e.target.value !== "")
                                        setData("category_id", "");
                                }}
                                placeholder="新しいカテゴリ名を入力"
                                className="w-full bg-[#25282c] border-gray-600 focus:border-sky-500 rounded-lg text-white placeholder:text-gray-700"
                            />
                            {errors.new_category_name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.new_category_name}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* 商品名 */}
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-1">
                            商品説明
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="w-full bg-[#1a1c20] border-gray-600 rounded-lg text-white h-24 p-3"
                            placeholder="商品の詳細な説明を入力してください..."
                        />
                    </div>

                    {/* 画像ファイル添付 */}
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-1">
                            商品画像
                        </label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-[#1a1c20] hover:bg-[#25282c] transition">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <span className="text-gray-400">
                                        📷画像を選択
                                    </span>
                                    {data.image && (
                                        <p className="text-sky-400 text-xs mt-2">
                                            {data.image.name}
                                        </p>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) =>
                                        setData(
                                            "image",
                                            e.target.files
                                                ? e.target.files[0]
                                                : null,
                                        )
                                    }
                                />
                            </label>
                        </div>
                    </div>

                    {/* ボタンエリア */}
                    <div className="flex justify-end items-center gap-4 pt-6 border-t border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-white font-bold transition"
                        >
                            キャンセル
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-gradient-to-br from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-rose-900/20 transition transform hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                            {processing ? "保存中..." : "商品を登録する"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}