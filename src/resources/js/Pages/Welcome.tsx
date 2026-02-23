import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            {/* 1. タブの名前を魔法っぽく！ */}
            <Head title="W//WizardStock - 魔法の在庫管理" />

            {/* 背景は魔法界の夜空のようなダークカラー */}
            <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-sky-500">
                <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
                    {/* 背景の装飾（ぼんやりした光） */}
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                    <div className="relative w-full max-w-4xl px-6 py-16 text-center">
                        {/* 2. ロゴタイトル */}
                        <header className="mb-12">
                            <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent italic">
                                W//WizardStock
                            </h1>
                        </header>

                        {/* 3. メインボタンエリア */}
                        <main>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                {auth.user ? (
                                    // ログイン済みならダッシュボードへ
                                    <Link
                                        href={route("dashboard")}
                                        className="group relative px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95"
                                    >
                                        ダッシュボードへ戻る
                                        <div className="absolute inset-0 rounded-2xl bg-white/20 blur-lg group-hover:blur-xl transition-all"></div>
                                    </Link>
                                ) : (
                                    // 未ログインなら ログイン or 登録
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="w-48 py-4 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-2xl shadow-lg shadow-sky-900/40 transition-all active:scale-95"
                                        >
                                            ログイン
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="w-48 py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 font-black rounded-2xl border border-gray-700 transition-all active:scale-95"
                                        >
                                            新規会員登録
                                        </Link>
                                    </>
                                )}
                            </div>
                        </main>


                    </div>
                </div>
            </div>
        </>
    );
}
