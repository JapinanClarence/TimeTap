import MobileNav from "@/layouts/app/mobile-nav";
import MobileHeader from "@/layouts/app/mobile-header";
import { ReactNode } from "react";
import SecondaryHeader from "./secondary-header";

interface AppLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
}

export default function SecondaryLayout({
    children,
    showHeader = true,
}: AppLayoutProps) {
    return (
        <div>
            {showHeader && <SecondaryHeader />}
            <main className="mt-20">{children}</main>
            {/* <MobileNav /> */}
        </div>
    );
}
