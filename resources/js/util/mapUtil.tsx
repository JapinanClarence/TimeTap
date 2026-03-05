import { EventType } from "@/types/event";
import { useEffect } from "react";
import { useMap } from "@/components/ui/map";

interface PolygonLayerProps {
    // This extracts the specific type of 'coordinates' from your EventType
    coordinates: EventType["coordinates"];
}
export function PolygonLayer({ coordinates }: PolygonLayerProps) {
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
