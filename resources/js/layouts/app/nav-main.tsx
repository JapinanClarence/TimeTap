"use client";

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        activeIcon: Icon;
        inactiveIcon: Icon;
    }[];
}) {
    const { url } = usePage();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => {
                        const isActive =
                            item.url === "/app"
                                ? url === item.url
                                : url.startsWith(item.url);

                        const Icon = isActive
                            ? item.activeIcon
                            : item.inactiveIcon;
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    isActive={isActive}
                                    tooltip={item.title}
                                    asChild
                                    className={`
                                    transition-colors
                                    /* Normal state */
                                    text-muted-foreground 
                                    hover:bg-primary/5 hover:text-primary
                                    
                                    /* Active state: Text white, Background Primary */
                                    data-[active=true]:bg-primary 
                                    data-[active=true]:text-primary-foreground
                                    data-[active=true]:hover:bg-primary/90
                                    `}
                                >
                                    <Link href={item.url}>
                                        <Icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
