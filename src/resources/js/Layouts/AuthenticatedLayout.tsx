import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import Sidebar from '@/Components/Stock/Sidebar';
import SearchBar from '@/Components/Stock/SearchBar';
import Footer from '@/Components/Stock/Footer';
import { Category } from "@/types/stock";
import { usePage } from '@inertiajs/react';

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
        <div className="flex min-h-screen bg-[#1a1c20] text-gray-200">
            {/* 左サイドバー ：isAdminを渡してメニューを切り替えられるようにする*/}
            <Sidebar categories={categories} isAdmin={isAdmin} />

            {/* 右メインコンテンツエリア */}
            <div className="flex flex-1 flex-col">

                {/* メッセージ表示 */}
                {showMsg && flash.message && (
                    <div className="fixed top-5 right-5 z-[100] bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl animate-bounce">
                        {flash.message}
                    </div>
                )}

                <header className="p-6">
                    {/* 検索バー：isAdminを渡して「新規登録ボタン」の表示制御 */}
                    <SearchBar categories={categories} isAdmin={isAdmin} />
                </header>

                {/* 真ん中商品表示 */}
                <main className="flex-1 px-8 pb-12 overflow-y-auto">
                    {children}

                    {/* フッター表示 */}
                    <Footer />
                </main>
            </div>
        </div>
    );
}
