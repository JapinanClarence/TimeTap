import React from "react";
import { cn } from "@/lib/utils";

export default function Container({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "container mx-auto px-8 lg:px-10 xl:px-30",
                className,
            )}
        >
            {children}
        </div>
    );
}
