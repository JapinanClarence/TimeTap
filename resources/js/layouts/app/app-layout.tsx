import MobileNav from "@/layouts/app/mobile-nav";
import MobileHeader from "@/layouts/app/mobile-header";
import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Sidebar,
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "@/components/ui/separator";
import SecondaryHeader from "./secondary-header";

interface AppLayoutProps {
    children: ReactNode;
    showHeader?: boolean;
    secondaryHeader?: boolean;
    showNav?: boolean;
    title?:string;
}

export default function AppLayout({
    children,
    showHeader = true,
    showNav = true,
    secondaryHeader = false,
    title,
}: AppLayoutProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div>
                {showHeader && !secondaryHeader && <MobileHeader />}
                {secondaryHeader && <SecondaryHeader title={title}/>}
                <main className={showHeader ? `py-16` : ""}>{children}</main>
                {showNav && <MobileNav />}
            </div>
        );
    }

    return (
        <div>
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <h1 className="text-base font-medium">Documents</h1>
                            {/* <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            Build Your Application
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>
                                            Data Fetching
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb> */}
                        </div>
                    </header>
                    <main>
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
