import React, { useCallback, useEffect, useRef, useState } from "react";
import { Map, MapControls, useMap } from "@/components/ui/map";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Locate, MapPin, RotateCcw, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { EventType } from "@/types/event";
import { ButtonGroup } from "@/components/ui/button-group";

interface GeofenceMapProps {
    data: EventType;
    // This specific signature matches Inertia's useForm hook exactly
    setData: <K extends keyof EventType>(key: K, value: EventType[K]) => void;
    errors: any;
}

interface PolygonLayerProps {
    // This extracts the specific type of 'coordinates' from your EventType
    coordinates: EventType["coordinates"];
}

interface UserMarkerProps {
    center: [number, number];
    accuracy: number;
}
export const GeofenceMap = ({ data, setData, errors }: GeofenceMapProps) => {
    // Default to a fallback (e.g., NY) while loading
    const [center, setCenter] = useState<[number, number]>([
        126.02398199999999, 6.907349,
    ]);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [isLocating, setIsLocating] = useState(false);
    const watcherRef = useRef<number | null>(null);
    const startTracking = useCallback(() => {
        if (!navigator.geolocation) return;

        // Clear any existing watcher
        if (watcherRef.current !== null) {
            navigator.geolocation.clearWatch(watcherRef.current);
        }

        watcherRef.current = navigator.geolocation.watchPosition(
            (position) => {
                const { longitude, latitude } = position.coords;
                const newCoords: [number, number] = [longitude, latitude];

                setCenter(newCoords);

                // OPTIONAL: Only auto-pan map if user hasn't started drawing yet
                // if (!data.coordinates || data.coordinates.length === 0) {
                //    map.flyTo({ center: newCoords, speed: 0.8 });
                // }
            },
            (error) => console.error("Tracking error:", error),
            {
                enableHighAccuracy: true,
                maximumAge: 1000, // Don't use cached locations older than 1s
                timeout: 5000,
            },
        );
    }, [setData]);

    useEffect(() => {
        startTracking();
        return () => {
            if (watcherRef.current !== null) {
                navigator.geolocation.clearWatch(watcherRef.current);
            }
        };
    }, [startTracking]);

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
                alert(
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

    const addPoint = useCallback(
        (long: number, lat: number) => {
            const newPoint = { long, lat };
            const currentCoords = data.coordinates || [];

            // 'as const' or 'as keyof EventType' helps TS narrow down the signature
            setData("coordinates" as keyof EventType, [
                ...currentCoords,
                newPoint,
            ]);
        },
        [data.coordinates, setData],
    );

    const clearPoints = () => {
        setData("coordinates", []);
    };

    return (
        <div>
            <div className="mb-2">
                <div>
                    <h1 className="font-semibold">Define Event Perimeter</h1>
                    <p className="text-sm text-muted-foreground">
                        Click on the map to draw the boundaries for your event
                        area. (optional)
                    </p>
                </div>
            </div>

            <Card className="relative h-[60vh] max:h-[70vh] p-0 overflow-hidden shadow-none">
                <ButtonGroup className="absolute top-5 right-5 z-5">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGetLocation}
                        disabled={isLocating}
                    >
                        {isLocating ? (
                            <>
                                <Spinner />
                                Update Location
                            </>
                        ) : (
                            <>
                                <Locate /> Update Location
                            </>
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant={"outline"}
                        size={"sm"}
                        onClick={clearPoints}
                    >
                        <RotateCcw /> <span className="hidden md:flex">Clear Points</span>
                    </Button>
                </ButtonGroup>

                <Map center={center} zoom={15} theme="light">
                    {/* <MapControls /> */}
                    <MapClickHandler onPointAdd={addPoint} />
                    <UserLocationMarker center={center} accuracy={accuracy} />
                    {/* Visual Layer to show the geofence as the user clicks */}
                    <PolygonLayer coordinates={data.coordinates} />
                </Map>
            </Card>
        </div>
    );
};

function MapClickHandler({
    onPointAdd,
}: {
    onPointAdd: (lng: number, lat: number) => void;
}) {
    const { map } = useMap();

    useEffect(() => {
        if (!map) return;

        const handleClick = (e: any) => {
            const { lng, lat } = e.lngLat;
            onPointAdd(lng, lat);
        };

        map.on("click", handleClick);
        return () => {
            map.off("click", handleClick);
        };
    }, [map, onPointAdd]);

    return null;
}

function PolygonLayer({ coordinates }: PolygonLayerProps) {
    const { map, isLoaded } = useMap();

    useEffect(() => {
        // 1. Guard clause: Cleanup if no points exist
        if (!map || !isLoaded || !coordinates || coordinates.length === 0) {
            if (map?.getLayer("geofence-fill"))
                map.removeLayer("geofence-fill");
            if (map?.getLayer("geofence-outline"))
                map.removeLayer("geofence-outline");
            if (map?.getLayer("geofence-points"))
                map.removeLayer("geofence-points");
            if (map?.getSource("geofence")) map.removeSource("geofence");
            return;
        }

        // 2. Prepare GeoJSON Data
        const points = coordinates.map((c) => [c.long, c.lat]);

        // Use a FeatureCollection so we can have both the Polygon and the Points in one source
        const geojson: any = {
            type: "FeatureCollection",
            features: [
                // The Polygon (Area) - only if 3+ points
                ...(coordinates.length >= 3
                    ? [
                          {
                              type: "Feature",
                              geometry: {
                                  type: "Polygon",
                                  coordinates: [[...points, points[0]]],
                              },
                          },
                      ]
                    : []),
                // Individual Points (The Pins/Circles)
                ...coordinates.map((c) => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [c.long, c.lat],
                    },
                })),
            ],
        };

        const existingSource = map.getSource("geofence") as any;

        if (existingSource) {
            existingSource.setData(geojson);
        } else {
            map.addSource("geofence", { type: "geojson", data: geojson });

            // Layer 1: The Fill (The Area)
            map.addLayer({
                id: "geofence-fill",
                type: "fill",
                source: "geofence",
                filter: ["==", ["geometry-type"], "Polygon"],
                paint: { "fill-color": "#3b82f6", "fill-opacity": 0.2 },
            });

            // Layer 2: The Outline
            map.addLayer({
                id: "geofence-outline",
                type: "line",
                source: "geofence",
                filter: ["==", ["geometry-type"], "Polygon"],
                paint: { "line-color": "#3b82f6", "line-width": 2 },
            });

            // Layer 3: The Points (Small Circles)
            map.addLayer({
                id: "geofence-points",
                type: "circle",
                source: "geofence",
                filter: ["==", ["geometry-type"], "Point"],
                paint: {
                    "circle-radius": 5,
                    "circle-color": "#ffffff",
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#3b82f6",
                },
            });
        }
    }, [map, isLoaded, coordinates]);

    return null;
}

function UserLocationMarker({ center, accuracy }: UserMarkerProps) {
    const { map, isLoaded } = useMap();
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        if (!map || !isLoaded) return;

        const sourceId = "user-location";
        const layerId = "user-location-pulse";
        const dotId = "user-location-dot";

        // 1. Add Source
        if (!map.getSource(sourceId)) {
            map.addSource(sourceId, {
                type: "geojson",
                data: {
                    type: "Feature",
                    geometry: { type: "Point", coordinates: center },
                    properties: {},
                },
            });

            // 2. Add the pulsing outer ring
            map.addLayer({
                id: layerId,
                type: "circle",
                source: sourceId,
                paint: {
                    "circle-radius": 6,
                    "circle-color": "#3b82f6",
                    "circle-opacity": 0.5,
                },
            });

            // 3. Add the solid center dot
            map.addLayer({
                id: dotId,
                type: "circle",
                source: sourceId,
                paint: {
                    "circle-radius": 6,
                    "circle-color": "#3b82f6",
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffffff",
                },
            });
        }

        // 4. Update position when center changes
        (map.getSource(sourceId) as any).setData({
            type: "Feature",
            geometry: { type: "Point", coordinates: center },
            properties: {},
        });

        // 5. Animation Logic (The "Blink/Pulse")
        let timestamp = 0;
        const animatePulse = (t: number) => {
            if (!map.getLayer(layerId)) return;

            // Create a cycle every 2 seconds
            const duration = 1000;
            const progress = (t % duration) / duration;

            // Radius goes from 10 to 30, Opacity goes from 0.5 to 0
            const radius = 10 + progress * 20;
            const opacity = 0.5 * (1 - progress);

            map.setPaintProperty(layerId, "circle-radius", radius);
            map.setPaintProperty(layerId, "circle-opacity", opacity);

            animationRef.current = requestAnimationFrame(animatePulse);
        };

        animationRef.current = requestAnimationFrame(animatePulse);

        return () => {
            if (animationRef.current)
                cancelAnimationFrame(animationRef.current);
        };
    }, [map, isLoaded, center]);

    return null;
}
