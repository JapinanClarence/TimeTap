
import { AppLayoutProps } from "@/types/ui";
import MobileNav from "@/components/mobile-nav";
import MobileHeader from "@/components/mobile-header";

export default function AppLayout({ children, showHeader = true }: AppLayoutProps) {
    return (
        <div className="relative">
            {showHeader && <MobileHeader/>}
            <main>{children}</main>
            <MobileNav />
        </div>
    );
}
