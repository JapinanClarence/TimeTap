"use client";

import * as React from "react";
import {
    IconClock,
    IconDashboard,
    IconDashboardFilled,
    IconListDetails,
    IconUsers,
} from "@tabler/icons-react";
import { NavMain } from "@/layouts/dashboard/nav-main";
import { NavUser } from "@/layouts/dashboard/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/user";
import { usePage } from "@inertiajs/react";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "https://github.com/shadcn.png",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            activeIcon: IconDashboard,
            inactiveIcon: IconDashboard,
        },
        {
            title: "Events",
            url: "/admin/events",
            activeIcon: IconListDetails,
            inactiveIcon: IconListDetails
        },
        {
            title: "Members",
            url: "/admin/members",
            activeIcon: IconUsers,
            inactiveIcon: IconUsers
        },
    ],
};
interface AppSidebar {
    auth: { user: { data: UserType } };
    [key: string]: unknown;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<AppSidebar>().props;
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <a href="#">
                                <Button
                                    size={"icon-sm"}
                                    className="rounded-full"
                                >
                                    <IconClock className="size-5!" />
                                </Button>
                                <span className="text-base font-semibold">
                                    TimeTap
                                </span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user.data} />
            </SidebarFooter>
        </Sidebar>
    );
}
