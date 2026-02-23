// サイドバーメニュー

import { Link, usePage } from '@inertiajs/react';
import { Category } from "@/types/stock";

interface SidebarProps {
    categories?: Category[];
    isAdmin: boolean;
}

export default function Sidebar({ categories = [], isAdmin }: SidebarProps) {
    const { url } = usePage();
    return (
        <aside className="w-56 bg-[#25282c] border-r border-gray-800 flex flex-col p-6">
            <div className="mb-10 px-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent italic">
                    W//WizardStock
                </h1>
            </div>

            <nav className="flex-1 space-y-2">
                <p className="text-[10] uppercase text-gray-500 font-gray-500 font-bold">
                    在庫管理
                </p>
                <Link
                    href={route("dashboard")}
                    className={`flex items-center gap-3 px-3 py-2   rounded-lg transition ${!url.includes("category=") ? "bg-[#1a1c20] text-sky-400" : "text-gray-400 hover:text-white"}`}
                >
                    <span>#</span>カテゴリ
                </Link>

                {/* 管理者　ログタブ */}
                {isAdmin && (
                    <Link
                        href={route("admin.logs.index")}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                            url.includes("admin/logs")
                                ? "bg-[#1a1c20] text-sky-400 font-bold"
                                : "text-gray-400 hover:text-white"
                        }`}
                    >
                        <span>🗒️</span> 操作履歴(ログ)
                    </Link>
                )}

                {/* カテゴリ表示 */}
                <div className="pt-4">
                    <p className="text-xs uppercase text-gray-500 font-bold mb-2">
                        カテゴリ
                    </p>
                    {categories.map((cat) => {
                        const isActive = url.includes(`category=${cat.id}`);
                        return (
                            <Link
                                key={cat.id}
                                href={route("dashboard", { category: cat.id })}
                                className={`block px-3 py-2 text-sm transition ${
                                    isActive
                                        ? "bg-sky-500/10 text-sky-400 font-bold border-l-2 border-sky-500"
                                        : "text-gray-400 hover:text-sky-400"
                                }`}
                            >
                                # {cat.name}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </aside>
    );
}