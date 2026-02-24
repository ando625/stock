import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import Sidebar from '@/Components/Stock/Sidebar';
import SearchBar from '@/Components/Stock/SearchBar';
import Footer from '@/Components/Stock/Footer';
import { Category } from "@/types/stock";
import { usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

export default function Authenticated({

    children,
    categories = [],

}: PropsWithChildren<{
    header?: ReactNode 
    categories?: Category[];
    
}>) {

    const props = usePage().props as any;
    const auth = props.auth;
    const flash = props.flash || {};
    const isAdmin = Number(auth.user.role) === 1;

    const [showMsg, setShowMsg] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (flash.message) {
            setShowMsg(true);

            const timer = setTimeout(() => {
                setShowMsg(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flash.message]);


    return (
        <div className="flex min-h-screen bg-[#1a1c20] text-gray-200 overflow-x-hidden">
            {/* スマホ用サイドバーを表示した時の背景 */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* 左サイドバー ：isAdminを渡してメニューを切り替えられるようにする スマホではハンバーガー*/}
            <div
                className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:block`}
            >
                <Sidebar categories={categories} isAdmin={isAdmin} />
            </div>

            {/* 右メインコンテンツエリア */}
            <div className="flex flex-1 flex-col min-w-0 w-full">
                {/* スマホ用：ヘッダーにハンバーガーボタン設置 */}
                <div className="md:hidden p-4 flex items-center bg-[#1a1c20] border-b border-gray-800">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-gray-400 hover:text-white focus:outline-none"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                    <span className="ml-4 font-bold text-xl bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent italic">
                        W//Stock
                    </span>
                </div>

                {/* メッセージ表示 */}
                {showMsg && flash.message && (
                    <div className="fixed top-5 right-5 z-[100] bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl animate-bounce">
                        {flash.message}
                    </div>
                )}

                <header className="p-2 md:p-6 w-full">
                    {/* 検索バー：isAdminを渡して「新規登録ボタン」の表示制御 */}
                    <SearchBar categories={categories} isAdmin={isAdmin} />
                </header>

                {/* 真ん中商品表示 */}
                <main className="flex-1 px-4 md:px-8 pb-12 overflow-y-auto w-full">
                    {children}

                    {/* フッター表示 */}
                    <Footer />
                </main>
            </div>
        </div>
    );
}
