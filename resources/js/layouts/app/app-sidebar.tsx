"use client";

import * as React from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "@/components/app/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { NavSecondary } from "./nav-secondary";
import {
    IconBell,
    IconCalendar,
    IconHelp,
    IconHistory,
    IconHome,
    IconQrcode,
    IconSearch,
    IconSettings,
    IconUser,
    IconUsersGroup,
} from "@tabler/icons-react";
import { usePage } from "@inertiajs/react";
import { OrganizationType } from "@/types/organization";
import { EventType } from "@/types/event";
import { UserType } from "@/types/user";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Home",
            url: "/",
            icon: IconHome,
        },
        {
            title: "Schedules",
            url: "/app/schedule",
            icon: IconCalendar,
        },
        {
            title: "QR",
            url: "/app/qr",
            icon: IconQrcode,
        },
        {
            title: "Teams",
            url: "#",
            icon: IconUsersGroup,
        },
        {
            title: "Notifications",
            url: "/app/notifications",
            icon: IconBell,
        },
    ],
    navSecondary: [
        {
            title: "History",
            url: "#",
            icon: IconHistory,
        },
        {
            title: "My ID",
            url: "#",
            icon: IconUser,
        },
    ],
};

interface AppHomeProps {
    currentOrg: OrganizationType | null;
    myOrganizations: OrganizationType[];
    auth: { user: { data: UserType } };
    [key: string]: unknown;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { currentOrg, myOrganizations, auth } = usePage<AppHomeProps>().props;

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher
                    currentOrg={currentOrg}
                    organizations={myOrganizations}
                />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user.data} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
