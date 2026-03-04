import MobileNav from "@/layouts/app/mobile-nav";
import MobileHeader from "@/layouts/app/mobile-header";
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import DesktopHeader from "./desktop-header";

interface AppLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
}

export default function AppLayout({
    children,
    showHeader = true,
}: AppLayoutProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div>
                {showHeader && <MobileHeader />}
                <main className={showHeader ? `py-24` : ""}>
                    {children}
                </main>
                {isMobile && <MobileNav />}
            </div>
        );
    }

    return (
        <div>
            {<DesktopHeader />}
            <main className={showHeader ? `py-20` : ""}>
                {children}
            </main>
            {isMobile && <MobileNav />}
        </div>
    );
}
