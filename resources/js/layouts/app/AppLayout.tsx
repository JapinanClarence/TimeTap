import MobileNav from "@/layouts/app/mobile-nav";
import MobileHeader from "@/layouts/app/mobile-header";
import { ReactNode } from "react";

interface AppLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
}

export default function AppLayout({
    children,
    showHeader = true,
}: AppLayoutProps) {
    return (
        <div className="relative">
            {showHeader && <MobileHeader />}
            <main>{children}</main>
            <MobileNav />
        </div>
    );
}
