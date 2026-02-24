import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from '@inertiajs/react';
import { Category, Product, StockLog, PaginateData, User } from "@/types/stock";

interface Props {
    auth: { user: User };

    categories: Category[];
    logs: PaginateData<StockLog>;
}

export default function LogIndex({ auth, categories, logs }: Props) {
    return (
        <AuthenticatedLayout categories={categories}>
            <Head title="操作履歴" />

            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        🗒️ 在庫操作履歴
                    </h2>
                </div>

                {/* ログテーブル */}
                <div className="hidden lg:block bg-[#25282c] rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1a1c20] text-gray-400 text-xs uppercase tracking-wider ">
                                <th className="px-3 py-4 md:px-6 font-bold">
                                    日時
                                </th>
                                <th className="px-3 py-4 md:px-6 font-bold">
                                    担当者
                                </th>
                                <th className="px-3 py-4 md:px-6 font-bold">
                                    商品
                                </th>
                                <th className="px-3 py-4 md:px-6 font-bold">
                                    変動数
                                </th>
                                <th className="px-3 py-4 md:px-6 font-bold">
                                    理由
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {logs.data.map((log) => (
                                <tr
                                    key={log.id}
                                    className="hover:bg-[#2d3035] transition-colors"
                                >
                                    <td className="px-3 py-4 md:px-6 text-sm text-gray-300">
                                        {new Date(
                                            log.created_at,
                                        ).toLocaleString("ja-JP")}
                                    </td>
                                    <td className="px-3 py-4 md:px-6">
                                        <span className="text-sm font-medium text-sky-400">
                                            👤 {log.user?.name || "不明"}
                                        </span>
                                    </td>
                                    <td className="px-3 py-4 md:px-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-white font-bold">
                                                {log.product?.name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {log.product?.sku}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 md:px-6">
                                        <span
                                            className={`font-bold text-lg md:text-xl ${log.quantity > 0 ? "text-emerald-400" : "text-rose-400"}`}
                                        >
                                            {log.quantity > 0
                                                ? `+${log.quantity}`
                                                : log.quantity}
                                        </span>
                                    </td>
                                    <td className="px-3 py-4 md:px-6 text-sm text-gray-400">
                                        {log.note || "---"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ログリスト：スマホ用（md未満で表示） */}
                <div className="lg:hidden space-y-4">
                    {logs.data.map((log) => (
                        <div
                            key={log.id}
                            className="bg-[#25282c] p-4 rounded-xl border border-gray-700 shadow-md"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] text-gray-500 font-mono">
                                    {new Date(log.created_at).toLocaleString(
                                        "ja-JP",
                                    )}
                                </span>
                                <span
                                    className={`text-2xl font-bold ${log.quantity > 0 ? "text-emerald-400" : "text-rose-400"}`}
                                >
                                    {log.quantity > 0
                                        ? `+${log.quantity}`
                                        : log.quantity}
                                </span>
                            </div>
                            <div className="mb-2">
                                <p className="text-white font-bold text-sm">
                                    {log.product?.name}
                                </p>
                                <p className="text-[10px] text-sky-400 font-medium">
                                    👤 {log.user?.name || "不明"}
                                </p>
                            </div>
                            {log.note && (
                                <div className="bg-[#1a1c20] p-2 rounded text-xs text-gray-400 border-l-2 border-gray-600">
                                    理由: {log.note}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* ログが空っぽの場合 */}
                {logs.data.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        履歴はまだありません。
                    </div>
                )}

                {/* ページネーション */}
                <div className="mt-8 flex justify-center gap-2">
                    {logs.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || ""}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-4 rounded-lg font-bold text-sm transition ${
                                link.active
                                    ? "bg-sky-600 text-white"
                                    : "bg-[#25282c] text-gray-400 hover:bg-gray-700"
                            } ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}