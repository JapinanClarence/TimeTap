import { AppSidebar } from "@/layouts/dashboard/app-sidebar";
import { SiteHeader } from "@/layouts/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
