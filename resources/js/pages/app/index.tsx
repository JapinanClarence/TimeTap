import React, { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app/AppLayout";
import Container from "@/components/ui/container";
import {
    formatSimpleDate,
    formatTime12h,
    formatWeekDayOnly,
} from "@/util/dateUtil";
import { cn } from "@/lib/utils";
import EventCard from "@/features/app/home/event-card";
import { ArrowRightLeft, Building2, History, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpcomingEventCard } from "@/features/app/home/upcoming-event-card";
import { GeofenceIndicator } from "@/features/app/home/geofence-indicator";
import { EventType } from "@/types/event";
import { OrganizationType } from "@/types/organization";
import { usePage } from "@inertiajs/react";
import { NoContent } from "@/features/app/home/no-content";
import JoinOrgSheet from "@/components/app/join-org-sheet";
import SwitchOrgSheet from "@/features/app/home/switch-org-sheet";

interface AppHomeProps {
    currentOrg: OrganizationType | null;
    currentEvent: { data: EventType } | null;
    upcomingEvents: { data: EventType[] };
    joinableOrganizations: OrganizationType[];
    myOrganizations: OrganizationType[];
    [key: string]: unknown;
}

export interface ProcessedEvent extends EventType {
    month: string;
    day: number;
    dayOfWeek: string;
    time: string;
}

export const formatEventDisplay = (event: EventType): ProcessedEvent => {
    if (!event)
        return {
            month: "",
            day: 0,
            title: "",
            dayOfWeek: "",
            time: "",
            location: "",
            start_time: "",
            end_time: "",
            start_date: "",
            end_date: "",
        };

    const start = new Date(event.start_date);
    const end = new Date(event.end_date);

    return {
        ...event,
        month: start.toLocaleString("en-US", { month: "short" }).toUpperCase(),
        day: start.getDate(),
        dayOfWeek: `${formatWeekDayOnly(start)} - ${formatWeekDayOnly(end)}`,
        // Ensure formatTime12h handles the logic, avoid .slice(0,5) here if it cuts off AM/PM
        time: `${formatTime12h(event.start_time).slice(0, 5)} - ${formatTime12h(event.end_time)}`,
    };
};

export default function Index() {
    const { props } = usePage<AppHomeProps>();
    const [time, setTime] = useState(new Date());
    const [showJoinOrgSheet, setShowJoinOrgSheet] = useState(false);
    const [showSwitchDrawer, setShowSwitchDrawer] = useState(false);
    const currentOrg = props.currentOrg;
    const currentEvent = props.currentEvent?.data;
    const upcomingEvents = props.upcomingEvents?.data;

    const processedEvent = useMemo(() => {
        if (!currentEvent) {
            return {
                month: "",
                day: 0,
                title: "",
                dayOfWeek: "",
                time: "",
                location: "",
            };
        }
        return formatEventDisplay(currentEvent);
    }, [currentEvent]);

    const processedUpcomingEvents = useMemo(() => {
        if (!upcomingEvents) return [];

        return upcomingEvents.map(formatEventDisplay);
    }, [upcomingEvents]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const isInRange = false;

    return (
        <AppLayout>
            <main >
                <Container className="space-y-5">
                    {currentOrg ? (
                        <div className="md:hidden flex justify-between items-center bg-primary/10 rounded-xl shadow-lg px-4 py-1">
                            <p className="font-semibold">
                                <Building2 className="inline text-primary mr-2" />{" "}
                                {currentOrg.name}
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
                    ) : (
                        <div className="flex justify-between items-center bg-primary/10 rounded-xl shadow-lg px-4 py-1">
                            <p className="font-semibold">No Organization</p>
                            <Button
                                variant={"link"}
                                onClick={(e) => {
                                    (
                                        e.currentTarget as HTMLButtonElement
                                    ).blur();
                                    setShowJoinOrgSheet(true);
                                }}
                            >
                                Join Org <Plus />
                            </Button>
                        </div>
                    )}

                    <section>
                        <h2 className="font-semibold text-xl">Today's Event</h2>

                        <p className="text-muted-foreground text-sm">
                            {formatWeekDayOnly(time)},{formatSimpleDate(time)}
                        </p>
                        <div className="mt-5 max-w-sm">
                            {currentEvent ? (
                                <>
                                    <EventCard {...processedEvent} />
                                    {/* Geofence Status Indicator */}
                                    <GeofenceIndicator isInRange={isInRange} />
                                </>
                            ) : (
                                <NoContent
                                    title="No Event"
                                    description="No current event found"
                                />
                            )}
                        </div>
                    </section>

                    <section className="sticky md:hidden">
                        <h2 className="font-semibold text-xl mb-5">
                            Quick Actions
                        </h2>
                        <div className="flex flex-row gap-5">
                            <div className="border shadow-sm bg-white rounded-lg w-40  py-2 px-3 flex flex-col items-center justify-center">
                                <History className="text-primary mb-2" />
                                <span className="text-xs font-semibold">
                                    View History
                                </span>
                            </div>
                            <div className="border shadow-sm bg-white rounded-lg w-40 py-2 px-3 flex flex-col items-center justify-center-safe">
                                <User className="text-primary mb-2" />
                                <span className="text-xs font-semibold">
                                    My ID
                                </span>
                            </div>
                        </div>
                    </section>
                    <section className=" pb-10">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="font-semibold text-xl">
                                Upcoming Schedule
                            </h2>
                            {/* <Button variant={"link"}>See More</Button> */}
                        </div>

                        <div className="space-y-2 md:grid grid-cols-2 lg:grid-cols-3 gap-2">
                            {upcomingEvents?.length > 0 ? (
                                processedUpcomingEvents?.map((e, i) => (
                                    <UpcomingEventCard key={i} {...e} />
                                ))
                            ) : (
                                <NoContent
                                    title="No Events"
                                    description="No upcoming events"
                                />
                            )}
                        </div>
                    </section>
                </Container>
            </main>
            <JoinOrgSheet
                open={showJoinOrgSheet}
                onClose={() => setShowJoinOrgSheet(false)}
                organizations={props.joinableOrganizations}
            />
            <SwitchOrgSheet
                open={showSwitchDrawer}
                onClose={() => setShowSwitchDrawer(false)}
                organizations={props.myOrganizations}
            />
        </AppLayout>
    );
}
