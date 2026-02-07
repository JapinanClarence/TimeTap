import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import "../css/app.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StrictMode } from "react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob("./pages/**/*.tsx"),
        ),
    setup({ el, App, props }) {
        createRoot(el).render(
            <TooltipProvider>
                <StrictMode>
                    <App {...props} />
                </StrictMode>
            </TooltipProvider>,
        );
    },
    progress: {
        color: "#2563EB",
    },
});
