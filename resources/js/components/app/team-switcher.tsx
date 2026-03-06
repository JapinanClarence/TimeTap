"use client";

import * as React from "react";
import { Building2, ChevronsUpDown, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import { OrganizationType } from "@/types/organization";
export function TeamSwitcher({
    currentOrg,
    organizations,
}: {
    currentOrg: OrganizationType | null;
    organizations: OrganizationType[];
}) {
    const { isMobile } = useSidebar();

    const [loading, setLoading] = useState(false);

    const handleSwitch = (selectedOrgId: string) => {
        if (!selectedOrgId) return;
        // Use Inertia to post the join request to your controller
        router.patch(
            "/app/organizations/switch",
            {
                organization_id: selectedOrgId,
            },
            {
                showProgress: false,
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false), // Stop loading
                onSuccess: () =>
                    toast.success("Organization switched successfully!"),
                onError: (errors) =>
                    toast.error("Failed to switch organization!"),
            },
        );
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                                <Building2 className="size-3.5 shrink-0" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {currentOrg?.name}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Teams
                        </DropdownMenuLabel>
                        {organizations.length > 0
                            ? organizations.map((org, index) => (
                                  <DropdownMenuItem
                                      key={org.name}
                                      onClick={() => handleSwitch(org.id || "")}
                                      className="gap-2 p-2"
                                  >
                                      <div className="flex size-6 items-center justify-center rounded-md border">
                                          <Building2 className="size-3.5 shrink-0" />
                                      </div>
                                      {org.name}
                                  </DropdownMenuItem>
                              ))
                            : "No organization found."}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
