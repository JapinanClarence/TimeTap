
import { AppLayoutProps } from "@/types/ui";
import MobileNav from "@/layouts/app/mobile-nav";
import MobileHeader from "@/layouts/app/mobile-header";

export default function AppLayout({ children, showHeader = true }: AppLayoutProps) {
    return (
        <div className="relative">
            {showHeader && <MobileHeader/>}
            <main>{children}</main>
            <MobileNav />
        </div>
    );
}
