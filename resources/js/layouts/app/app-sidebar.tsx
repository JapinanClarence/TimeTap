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
    IconBellFilled,
    IconCalendar,
    IconCalendarFilled,
    IconHome,
    IconHomeFilled,
    IconCircles,
    IconCirclesFilled
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
            url: "/app",
            activeIcon: IconHomeFilled,
            inactiveIcon: IconHome
        },
        {
            title: "Schedules",
            url: "/app/schedule",
            activeIcon: IconCalendarFilled,
            inactiveIcon: IconCalendar
        },
        {
            title: "Teams",
            url: "/app/organizations",
            activeIcon: IconCirclesFilled,
            inactiveIcon: IconCircles
        },
        {
            title: "Notifications",
            url: "/app/notifications",
            activeIcon: IconBellFilled,
            inactiveIcon: IconBell
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
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={auth.user.data} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
