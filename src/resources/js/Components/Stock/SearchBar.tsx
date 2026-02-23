//検索・登録・ログアウト

import { Link, usePage, router } from '@inertiajs/react';
import { Category } from "@/types/stock";
import { useState } from 'react';
import CreateProductModal from './CreateProductModal';

interface Props{
    categories?: Category[];
    isAdmin?: boolean;
}

export default function SearchBar({ categories = [], isAdmin = false }: Props) {

    const user = usePage().props.auth.user;

    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('dashboard'), { search: search, category: selectedCategory }, { preserveState: true });
    };

    return (
        <div className="flex items-center justify-between bg-[#25282c] p-4 rounded-2xl shadow-lg border">
            {/* 左側：商品検索 */}
            <form
                onSubmit={handleSearch}
                className="flex flex-1 max-w-3xl items-center bg-[#1a1c20] rounded-lg px-3 py-1 mr-4 border border-gray-600 focus-within:border-sky-500 transition"
            >
                <span className="text-gray-400">🔍</span>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="商品名またはSKUで検索"
                    className="w-full bg-transparent border-none text-sm text-gray-200 focus:ring-0"
                />

                {/* カテゴリのプルダウン */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-[#25282c] border-none rounded-lg py-2 px-4 text-sm text-gray-400 focus:ring-1 focus:ring-sky-500"
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
                    className="ml-2 bg-sky-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-bold transition w-20"
                >
                    検索
                </button>
            </form>

            {/* 右側：登録ボタン */}
            <div className="flex items-center gap-4">
                {/* isAdminがtrueの時だけボタンとモーダル表示 */}
                {isAdmin && (
                    <>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-sky-500/20"
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
                    <span className="text-xs text-gray-400">
                        こんにちは、{user.name}さん
                    </span>
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="text-xs text-red-500 hover:text-red-300 font-bold"
                    >
                        ログアウト
                    </Link>
                </div>
            </div>
        </div>
    );
}