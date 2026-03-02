import React, { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app/AppLayout";
import Container from "@/components/ui/container";
import { formatSimpleDate, formatWeekDayOnly } from "@/util/dateUtil";
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

const upcomingEvent = [
    {
        month: "FEB",
        day: 23,
        title: "IT Week",
        dayOfWeek: "Sunday",
        time: "8:00 AM",
        location: "Gymnasium • Main Hall",
    },
    {
        month: "FEB",
        day: 25,
        title: "React Meetup",
        dayOfWeek: "Wednesday",
        time: "6:30 PM",
        location: "Tech Hub • Room 3A",
    },
    {
        month: "MAR",
        day: 1,
        title: "Cloud Summit",
        dayOfWeek: "Sunday",
        time: "9:00 AM",
        location: "Convention Center • Lobby",
    },
    {
        month: "MAR",
        day: 8,
        title: "Design Sprint",
        dayOfWeek: "Sunday",
        time: "10:00 AM",
        location: "Creative Studio • Floor 2",
    },
];

const currentEvent = {
    month: "FEB",
    day: 22,
    title: "DevMeet 2026",
    dayOfWeek: "Sunday",
    time: "8:00 AM",
    location: "IT Building • Main Hall",
    status: "in-range" as const,
};

interface AppHomeProps {
    currentOrg: OrganizationType | null;
    currentEvent: EventType | null;
    upcomingEvents: EventType[];
    [key: string]: unknown;
}

export default function Index() {
    const { props } = usePage<AppHomeProps>();
    const [time, setTime] = useState(new Date());
    // console.log(props);
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const isInRange = false;
    return (
        <AppLayout>
            <main className="pt-24">
                <Container className="space-y-5">
                    {props.currentOrg ? (
                        <div className="flex justify-between items-center bg-primary/10 rounded-xl shadow-lg px-4 py-1">
                            <p className="font-semibold">
                                <Building2 className="inline text-primary mr-2" />{" "}
                                ACES
                            </p>
                            <Button variant={"link"}>
                                Switch <ArrowRightLeft />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center bg-primary/10 rounded-xl shadow-lg px-4 py-1">
                            <p className="font-semibold">No Organization</p>
                            <Button variant={"link"}>
                                Joing Org <Plus />
                            </Button>
                        </div>
                    )}

                    <section>
                        <h2 className="font-semibold text-xl">Today's Event</h2>

                        <p className="text-muted-foreground text-sm">
                            {formatWeekDayOnly(time)},{formatSimpleDate(time)}
                        </p>
                        <div className="mt-5 ">
                            {props.currentEvent ? (
                                <>
                                    <EventCard {...currentEvent} />
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

                    <section className="sticky">
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

                        <div className="space-y-2">
                            {props.upcomingEvents.length > 0 ? (
                                upcomingEvent.map((e, i) => (
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
        </AppLayout>
    );
}
