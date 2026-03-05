import SecondaryLayout from "@/layouts/app/secondary-layout";
import { EventType } from "@/types/event";
import { usePage } from "@inertiajs/react";
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
import { PolygonLayer } from "@/util/mapUtil";
import EventDetailSheet from "@/features/app/event/event-detail-sheet";
import { toast } from "sonner";

export default function EventDetail() {
    const { event } = usePage<{ event: { data: EventType } }>().props;
    const coordinates = event.data.coordinates;
    const [center, setCenter] = useState<[number, number]>([
        126.02398199999999, 6.907349,
    ]);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [isLocating, setIsLocating] = useState(false);

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
        }

        setIsLocating(true);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (!position.coords) return;
                setCenter([
                    position.coords.longitude,
                    position.coords.latitude,
                ]);
                setAccuracy(position.coords.accuracy);
                setIsLocating(false);
            },
            (error) => {
                setIsLocating(false);
                console.error("Error getting location:", error);
                toast.error(
                    "Unable to retrieve your location. Please check your browser permissions.",
                );
            },
            { enableHighAccuracy: true },
        );
    };

    // Optional: Auto-request on mount
    useEffect(() => {
        handleGetLocation();
    }, []);

    console.log(coordinates)
    return (
        <SecondaryLayout>
            <div className="h-[94vh] relative">
                <Map center={center} zoom={15} theme="light">
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
                        showZoom={false}
                        showLocate
                        showCompass
                    />
                    {/* <UserLocationMarker center={center} accuracy={accuracy} /> */}
                    {/* Visual Layer to show the geofence as the user clicks */}
                    <PolygonLayer coordinates={coordinates} />
                </Map>
                <EventDetailSheet data={event.data} />
            </div>
        </SecondaryLayout>
    );
}
