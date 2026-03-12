import React, { useEffect, useMemo, useState } from "react";
import AppLayout from "@/layouts/app/app-layout";
import Container from "@/components/ui/container";
import {
    formatSimpleDate,
    formatTime12h,
    formatWeekDayOnly,
} from "@/util/dateUtil";
import { cn } from "@/lib/utils";
import EventCard from "@/features/app/home/event-card";
import {
    ArrowRight,
    ArrowRightLeft,
    Building2,
    Clock,
    History,
    MapPin,
    Plus,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpcomingEventCard } from "@/features/app/home/upcoming-event-card";
import { GeofenceIndicator } from "@/features/app/home/geofence-indicator";
import { EventType } from "@/types/event";
import { OrganizationType } from "@/types/organization";
import { Link, usePage } from "@inertiajs/react";
import { NoContent } from "@/features/app/home/no-content";
import JoinOrgSheet from "@/components/app/join-org-sheet";
import SwitchOrgSheet from "@/features/app/home/switch-org-sheet";
import { router } from "@inertiajs/react";
import * as turf from "@turf/turf";
import { Badge } from "@/components/ui/badge";
import QuickActions from "@/features/app/home/quick-actions";

interface AppHomeProps {
    currentOrg: OrganizationType | null;
    currentEvent: { data: EventType } | null;
    upcomingEvents: { data: EventType[] };
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
    const [userLocation, setUserLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const [isInRange, setIsInRange] = useState(false);
    const [distance, setDistance] = useState<string | null>(null);
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
    useEffect(() => {
        if (!currentEvent?.coordinates) return;

        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setUserLocation({ lat: latitude, lng: longitude });

                try {
                    if (!currentEvent?.coordinates) return;
                    // 1. Convert [{long, lat}] to [[long, lat]]
                    const formattedCoords = currentEvent.coordinates.map(
                        (coord) => [coord.long, coord.lat],
                    );

                    // 2. Turf Polygon needs coordinates wrapped in an extra array (the "ring")
                    const eventPolygon = turf.polygon([formattedCoords]);
                    const userPoint = turf.point([longitude, latitude]);

                    // 3. Perform the check
                    const inside = turf.booleanPointInPolygon(
                        userPoint,
                        eventPolygon,
                    );
                    setIsInRange(inside);

                    if (!inside) {
                        // Calculate distance to the center or boundary
                        const center = turf.center(eventPolygon);
                        const d = turf.distance(userPoint, center, {
                            units: "meters",
                        });
                        setDistance(`${Math.round(d)}m from destination`);
                    }
                } catch (error) {
                    console.error("Geofence calculation error:", error);
                }
            },
            (err) => {
                /* Error logic */
                console.error(err);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            },
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [currentEvent]);

    const handleCheckIn = () => {
        router.get(`/app/qr/`);
    };

    const handleViewMap = () => {
        router.get(`/app/schedule/${currentEvent?.id}`);
    };

    return (
        <AppLayout>
            <Container className="space-y-5 mt-5 md:px-5 md:flex-1 lg:px-5 xl:px-8 mx-none">
                {currentOrg ? (
                    <div className="md:hidden flex justify-between items-center bg-primary/5 border border-primary rounded-xl  px-3 py-1.5 animate-fade-up">
                        <p className="font-semibold">
                            <Building2 className="inline text-primary mr-2" />{" "}
                            {currentOrg.name}
                        </p>
                        <Button
                            className="text-muted-foreground px-0"
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
                    <div className="flex justify-between items-center bg-primary/10 rounded-xl shadow-lg px-4 py-1 animate-fade-up">
                        <p className="font-semibold">No Organization</p>
                        <Button
                            variant={"link"}
                            onClick={(e) => {
                                (e.currentTarget as HTMLButtonElement).blur();
                                setShowJoinOrgSheet(true);
                            }}
                        >
                            Join Org <Plus />
                        </Button>
                    </div>
                )}

                <section className="animate-fade-up-1">
                    <h2 className="md:hidden font-semibold text-xl">
                        Today's Event
                    </h2>

                    <p className="text-muted-foreground text-sm font-medium mb-5">
                        {formatWeekDayOnly(time)},{formatSimpleDate(time)}
                    </p>
                    <div className=" max-w-sm space-y-2 md:hidden">
                        {currentEvent ? (
                            <>
                                <EventCard {...processedEvent} />
                                {/* Geofence Status Indicator */}
                                <GeofenceIndicator
                                    isInRange={isInRange}
                                    distanceText={distance}
                                    onViewMap={handleViewMap}
                                    onCheckIn={handleCheckIn}
                                    locationName={currentEvent.location}
                                />
                            </>
                        ) : (
                            <NoContent
                                title="No Event"
                                description="No current event found"
                            />
                        )}
                    </div>
                    <div className="hidden md:grid grid-cols-3 gap-5 animate-fade-up-2">
                        {currentEvent ? (
                            <>
                                <div className="col-span-1">
                                    <EventCard {...processedEvent} />
                                </div>
                                <div className="col-span-1">
                                    <GeofenceIndicator
                                        isInRange={isInRange}
                                        distanceText={distance}
                                        onViewMap={handleViewMap}
                                        onCheckIn={handleCheckIn}
                                        locationName={currentEvent.location}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="col-span-2">
                                <NoContent
                                    title="No Event"
                                    description="No current event found"
                                />
                            </div>
                        )}
                        <div className="col-span-1">
                            <QuickActions />
                        </div>
                    </div>
                </section>

                <section className="sticky md:hidden animate-fade-up-2">
                    <h2 className="font-semibold text-xl mb-5">
                        Quick Actions
                    </h2>
                    <div className="flex flex-row gap-5">
                        <div className="border  bg-white rounded-lg w-40  py-2 px-3 flex flex-col items-center justify-center">
                            <History className="text-primary mb-2" />
                            <span className="text-xs font-semibold">
                                View History
                            </span>
                        </div>
                        <div className="border  bg-white rounded-lg w-40 py-2 px-3 flex flex-col items-center justify-center-safe">
                            <User className="text-primary mb-2" />
                            <span className="text-xs font-semibold">My ID</span>
                        </div>
                    </div>
                </section>
                <section className=" pb-10 animate-fade-up-2 bg">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="font-display font-bold text-base">
                                Upcoming Schedule
                            </h2>
                            <p className="hidden md:flex text-xs text-muted-foreground ">
                                Next events on your calendar
                            </p>
                        </div>
                        <Link
                            href="/app/schedules"
                            className="text-sm font-semibold text-primary hover:underline"
                        >
                            View all <ArrowRight className="inline size-3"/>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:border md:p-5 rounded-xl">
                        {upcomingEvents?.length > 0 ? (
                            processedUpcomingEvents?.map((e, i) => (
                                <Link key={i} href={`/app/schedule/${e.id}`}>
                                    <UpcomingEventCard {...e} />
                                </Link>
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

            <JoinOrgSheet
                open={showJoinOrgSheet}
                onClose={() => setShowJoinOrgSheet(false)}
            />
            <SwitchOrgSheet
                open={showSwitchDrawer}
                onClose={() => setShowSwitchDrawer(false)}
                organizations={props.myOrganizations}
            />
        </AppLayout>
    );
}
