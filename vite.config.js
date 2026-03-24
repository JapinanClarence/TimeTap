import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [
            laravel({
                input: ["resources/css/app.css", "resources/js/app.tsx"],
                refresh: true,
            }),
            tailwindcss(),
            react(),
        ],

        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./resources/js"),
            },
        },

        // -------------------------------------------------------
        // Optimizations
        // -------------------------------------------------------
        optimizeDeps: {
            include: ["react", "react-dom", "@inertiajs/react", "maplibre-gl"],
        },
    };
});
