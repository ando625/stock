//検索・登録・ログアウト

import { Link, usePage, router } from '@inertiajs/react';
import { Category, Product } from "@/types/stock";
import { useState } from 'react';
import CreateProductModal from './CreateProductModal';

interface Props{
    categories?: Category[];
    products: Product[];
    isAdmin?: boolean;
}

export default function SearchBar({
    categories = [],
    products = [],
    isAdmin = false,
}: Props) {
    const user = usePage().props.auth.user;

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // オートコンプリート（入力候補）の設定
    const [suggestions, setSuggestions] = useState<Product[]>([]);

    // --- 【サーバーに聞きに行く魔法】 ---
    const performSearch = (searchTerm: string) => {
        router.get(
            route(isAdmin ? "admin.dashboard" : "dashboard"),
            { search: searchTerm, category: selectedCategory },
            { preserveState: true, replace:true, },
        );
    };

    

    // --- 【検索ボタンを自分で押した時】 ---
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // 画面リロードを阻止！
        setSuggestions([]); // 検索したら候補リストは片付ける
        performSearch(search); // 今の箱の中身(search)で検索
    };

    // --- 【文字を入力するたびに動く魔法】 ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value); // 入力欄の文字を書き換える

        if (value.length > 0) {
            // 商品リストの中から、名前かSKUにその文字が入っているものを探す
            const matched = products.filter(
                (p) =>
                    p.name.toLowerCase().includes(value.toLowerCase()) ||
                    p.sku.toLowerCase().includes(value.toLowerCase()),
            );
            setSuggestions(matched.slice(0, 5)); // 5つだけ候補に見せる
        } else {
            setSuggestions([]);
        }
    };

    // --- 【候補をポチッと押した時】 ---
    const handleSuggestionClick = (product: Product) => {
        const value = product.name;
        setSearch(value);
        setSuggestions([]);
        performSearch(value);
    };

    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#25282c] p-4 rounded-2xl shadow-lg border gap-4">
            {/* 左側：商品検索 */}
            <div className="relative flex-1 w-full">
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row flex-1 w-full gap-2 items-center bg-[#1a1c20] rounded-lg p-2 border border-gray-600 focus-within:border-sky-500 transition"
                >
                    <div className="flex items-center w-full bg-[#25282c] md:bg-transparent rounded px-2">
                        <span className="text-gray-400">🔍</span>
                        <input
                            type="text"
                            value={search}
                            onChange={handleInputChange}
                            placeholder="商品名/SKU"
                            className="w-full bg-transparent border-none text-sm text-gray-200 focus:ring-0"
                        />
                    </div>

                    {/* カテゴリのプルダウン */}
                    <div className="flex w-full sm:w-auto gap-2">
                        <select
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                            className="flex-1 sm:w-32 bg-[#25282c] border-none rounded-lg py-2 px-2 text-xs text-gray-400 focus:ring-1 focus:ring-sky-500"
                        >
                            <option value="">カテゴリ</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="ml-2 bg-sky-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap"
                        >
                            検索
                        </button>
                    </div>
                </form>

                {/* 検索候補のリスト表示 */}
                {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-[#25282c] border border-gray-600 rounded-b-lg overflow-hidden z-50 shadow-2xl ">
                        {suggestions.map((p) => (
                            <li
                                key={p.id}
                                onClick={() => {handleSuggestionClick(p);}}
                                className="px-4 py-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-none flex justify-between items-center"
                            >
                                <span className="text-sm text-white font-bold">
                                    {p.name}
                                </span>
                                <span className="text-xs text-gray-500 font-mono">
                                    {p.sku}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 右側：登録ボタン */}
            <div className="flex items-center justify-end lg:justify-end gap-4 w-full lg:w-auto shrink-0 border-t border-gray-700 pt-3 lg:border-none lg:pt-0">
                {/* isAdminがtrueの時だけボタンとモーダル表示 */}
                {isAdmin && (
                    <>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-gradient-to-br from-rose-500 to-pink-600  text-white px-3 py-2 rounded-lg text-xs font-bold shadow-lg whitespace-nowrap"
                        >
                            + 新規商品登録
                        </button>

                        <div className="h-8 w-px bg-gray-700"></div>

                        {/* スイッチがONの時だけ、モーダルを表示する */}
                        {isCreateModalOpen && (
                            <CreateProductModal
                                categories={categories}
                                onClose={() => setIsCreateModalOpen(false)}
                            />
                        )}
                    </>
                )}

                {/* ユーザー名とログアウト */}
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 leading-tight">
                        こんにちは、{user.name}さん
                    </span>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        onSuccess={()=> {}}
                        className="text-[10px] text-red-500 hover:text-red-300 font-bold"
                    >
                        ログアウト
                    </Link>
                </div>
            </div>
        </div>
    );
}