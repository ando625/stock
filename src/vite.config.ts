import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "0.0.0.0", // すべてのIPから受け付ける
        port: 5173, // ポート番号を固定する
        strictPort: true, // ポートが使えなかったらエラーにする（勝手に変えない）
        hmr: {
            host: "localhost",
        },
        watch: {
            usePolling: true,
        },
    },
});