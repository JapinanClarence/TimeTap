import NavMain from "@/components/nav-main";
import NavFooter from "@/components/nav-footer";
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
