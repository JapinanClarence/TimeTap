import React from "react";

import { cn } from "@/lib/utils";

export default function GradientBg({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                " w-full bg-background bg-[radial-gradient(50%_100%_at_100%_40%,rgba(0,163,255,0.13)_80%,rgba(0,163,255,0)_100%,rgba(0,163,255,0)_100%)]",
                className,
            )}
        >
         
            {children}
        </div>
    );
}
