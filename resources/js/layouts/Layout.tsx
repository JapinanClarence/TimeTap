import NavMain from "@/layouts/nav-main";
import NavFooter from "@/layouts/nav-footer";
import { ReactNode } from "react";

interface LayoutProps {
     children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="relative">
            <NavMain />
            <main>{children}</main>
            <NavFooter />
        </div>
    );
}
