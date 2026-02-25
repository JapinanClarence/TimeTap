import NavMain from "@/layouts/nav-main";
import NavFooter from "@/layouts/nav-footer";
import { LayoutProps } from "@/types/ui";

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="relative">
            <NavMain />
            <main>{children}</main>
            <NavFooter />
        </div>
    );
}
