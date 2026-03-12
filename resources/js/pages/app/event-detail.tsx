import { EventType } from "@/types/event";
import { Head, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import {
    Map,
    MapControls,
    MapMarker,
    MapRef,
    MarkerContent,
    MarkerLabel,
    useMap,
} from "@/components/ui/map";
import { PolygonLayer } from "@/features/admin/events/components/polygon-layer";
import EventDetailSheet from "@/features/app/event/event-detail-sheet";
import { toast } from "sonner";
import EventDetailModal from "@/features/app/event/event-detail-modal";
import AppLayout from "@/layouts/app/app-layout";
import { useIsMobile } from "@/hooks/use-mobile";
import * as turf from "@turf/turf";

export default function EventDetail() {
    const { event } = usePage<{ event: { data: EventType } }>().props;
    const coordinates = event.data.coordinates;
    // Default center or first coordinate of the event
    if (!coordinates) return;
    const [center, setCenter] = useState<[number, number]>([
        coordinates[0]?.long || 126.023981,
        coordinates[0]?.lat || 6.907349,
    ]);

    const [isInRange, setIsInRange] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!navigator.geolocation) return;

        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { longitude, latitude } = position.coords;
                const userLoc: [number, number] = [longitude, latitude];

                setCenter(userLoc);

                // 1. Format coordinates for Turf: [[long, lat], [long, lat]]
                const formatted = coordinates.map((c: any) => [c.long, c.lat]);

                // 2. Create Turf objects
                const userPoint = turf.point(userLoc);
                const eventPolygon = turf.polygon([formatted]);

                // 3. Check if inside
                const inside = turf.booleanPointInPolygon(
                    userPoint,
                    eventPolygon,
                );
                setIsInRange(inside);
            },
            (error) => toast.error("Position tracking failed."),
            { enableHighAccuracy: true, maximumAge: 0 },
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, [coordinates]);

    return (
        <AppLayout secondaryHeader={true} showNav={false}>
                 <Head title="Event" />
            <div className="md:h-[89vh]">
                <Map
                    center={center}
                    zoom={15}
                    theme="light"
                >
                    {/* User location marker */}
                    {center && (
                        <MapMarker longitude={center[0]} latitude={center[1]}>
                            <MarkerContent>
                                <div className="relative">
                                    {/* The solid inner circle */}
                                    <div className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow-lg"></div>
                                    {/* pulsing outer circle animation */}
                                    <div className="absolute inset-0 h-4 w-4 rounded-full bg-blue-400 animate-ping"></div>
                                </div>
                            </MarkerContent>
                        </MapMarker>
                    )}
                    <MapControls
                        position={isMobile ? "top-right" : "bottom-right"}
                        showZoom={false}
                        showLocate
                        showCompass
                        showFullscreen={!isMobile}
                    />
                    {/* Visual Layer to show the geofence as the user clicks */}
                    <PolygonLayer
                        coordinates={coordinates}
                        color={isInRange ? "#22c55e" : "#ef4444"} // green-500 : red-500
                    />
                </Map>

                <EventDetailModal data={event.data} />
            </div>
            <EventDetailSheet data={event.data} />
        </AppLayout>
    );
}
