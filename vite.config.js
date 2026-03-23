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
                input: ["resources/css/app.css", "resources/js/app.jsx"],
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
        // Dev server — works both locally and inside Docker
        // -------------------------------------------------------
        server: {
            host: "0.0.0.0", // Bind to all interfaces (required inside Docker)
            port: 5173,
            strictPort: true,
            hmr: {
                // Use APP_URL for HMR so the browser connects back correctly.
                // In docker-compose the Vite container is reachable on localhost:5173.
                host: "localhost",
                port: 5173,
            },
            cors: true,
        },

        // -------------------------------------------------------
        // Build output — Laravel expects assets in public/build
        // -------------------------------------------------------
         build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            if (id.includes("react")) return "react-vendor";
                            if (id.includes("@inertiajs")) return "inertia-vendor";
                            return "vendor";
                        }
                    },
                },
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
