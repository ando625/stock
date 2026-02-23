import React from 'react';
import { useForm, router } from '@inertiajs/react';
import { Category, Product } from "@/types/stock";

interface Props {
    product: Product;
    onClose: () => void;
    categories: Category[];
}




export default function EditProductModal({
    product,
    onClose,
    categories,
}: Props) {

    //商品削除する関数
    const handleDeleteProduct = () => {
        if (
            confirm(
                "この商品を完全に削除します。元には戻せませんが、本当によろしいですか？",
            )
        ) {
            router.delete(route("admin.products.destroy", product.id), {
                onSuccess: () => onClose(),
            });
        }
    };

    // 初期値に現在のProductの情報を入れる
    const { data, setData, post, processing, errors } = useForm({
        _method: "patch",
        name: product.name,
        sku: product.sku,
        price: product.price,
        description: product.description || "",
        current_stock: product.current_stock,
        category_id: product.categories[0]?.id ? String(product.categories[0].id) : "",
        status: product.status,
        new_category_name: "",
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 送り先をadmin.product.updateにする
        post(route("admin.products.update", product.id), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <div className="bg-[#25282c] w-full max-w-2xl p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        商品情報の編集
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-white text-2xl"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 基本はCreateProductModalと同じだけどvalue{data.name}に今の情報が入った状態でスタート */}

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
                                現在の在庫（強制修正）
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
                                既存カテゴリから選ぶ・カテゴリ自体を消去
                            </label>
                            <div className="flex gap-2">
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
                        </div>

                        {/* カテゴリ削除ボタン */}
                        {data.category_id && (
                            <button
                                type="button"
                                onClick={() => {
                                    if (
                                        confirm(
                                            "このカテゴリ名自体を削除します。このカテゴリに紐付いている他の商品からもカテゴリが外れますがよろしいですか？",
                                        )
                                    ) {
                                        router.delete(
                                            route(
                                                "admin.categories.destroy",
                                                data.category_id,
                                            ),
                                            {
                                                onSuccess: () =>
                                                    setData("category_id", ""),
                                            },
                                        );
                                    }
                                }}
                                className="bg-red-900/50 hover:bg-red-600 text-red-200 px-3 rounded-lg border border-red-700 transition"
                                title="このカテゴリ名自体を削除する"
                            >
                                🗑️削除
                            </button>
                        )}

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

                    {/* 商品説明 */}
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

                    {/* 決定ボタン */}
                    <div className="flex justify-between items-center gap-4 pt-6 border-t border-gray-700">
                        {/* 左：削除ボタン */}
                        <button
                            type="button"
                            onClick={handleDeleteProduct}
                            className="text-red-500 hover:text-red-400 text-sm font-bold transition flex items-center gap-1"
                        >
                            <span>🗑️</span>商品を完全に削除する
                        </button>

                        {/* 右：キャンセル＆保存 */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-white font-bold"
                        >
                            キャンセル
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-sky-600 hover:bg-sky-500 text-white px-10 py-3 rounded-xl font-bold shadow-lg transition"
                        >
                            {processing ? "更新中..." : "変更を保存する"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}