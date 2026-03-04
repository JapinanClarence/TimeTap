import React, { useState } from "react";
import {
    ArrowRightLeft,
    Bell,
    Building2,
    MenuIcon,
    PanelRight,
    ScanQrCode,
    Timer,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import DesktopNav from "./desktop-nav";
import ProfileDropdown from "@/components/app/profile-dropdown";
import NotificationDropdown from "@/components/app/notification-dropdown";
import SwitchOrgSheet from "@/features/app/home/switch-org-sheet";
import { EventType } from "@/types/event";
import { OrganizationType } from "@/types/organization";
import { usePage } from "@inertiajs/react";

interface AppHomeProps {
    currentOrg: OrganizationType | null;
    currentEvent: { data: EventType } | null;
    upcomingEvents: { data: EventType[] };
    joinableOrganizations: OrganizationType[];
    myOrganizations: OrganizationType[];
    [key: string]: unknown;
}

export default function DesktopHeader() {
      const { props } = usePage<AppHomeProps>();
    const [showSwitchDrawer, setShowSwitchDrawer] = useState(false);
    return (
        <header className="fixed top-0 z-50 w-full   border bg-background shadow-xs">
            <Container className="flex items-center justify-between ">
                <div className="flex justify-between items-center bg-primary/10 border border-primary rounded-xl h-min  px-4">
                    <p className="font-semibold">
                        <Building2 className="hidden lg:inline text-primary mr-2" />{" "}
                        Aces
                    </p>
                    <Button
                        variant={"link"}
                        onClick={(e) => {
                            (e.currentTarget as HTMLButtonElement).blur();
                            setShowSwitchDrawer(true);
                        }}
                    >
                        Switch <ArrowRightLeft />
                    </Button>
                </div>
                <div>
                    <DesktopNav />
                </div>

                <div className="flex flex-row  items-center gap-2">
                    <NotificationDropdown/>
                    <ProfileDropdown />
                </div>
            </Container>
            {/* <SwitchOrgSheet open={showSwitchDrawer} onClose={()=>setShowSwitchDrawer(false)} organizations={props.myOrganizations}/> */}
        </header>
    );
}
