import { EventType } from "@/types/event";
import { useEffect } from "react";
import { useMap } from "@/components/ui/map";

interface PolygonLayerProps {
    coordinates: EventType["coordinates"];
    color: string; // Add dynamic color prop
}

export function PolygonLayer({ coordinates, color }: PolygonLayerProps) {
    const { map, isLoaded } = useMap();
    
    useEffect(() => {
        if (!map || !isLoaded) return;

        // 1. Guard clause: Cleanup if no points exist
        if (!coordinates || coordinates.length === 0) {
            ["geofence-fill", "geofence-outline", "geofence-points"].forEach(id => {
                if (map.getLayer(id)) map.removeLayer(id);
            });
            if (map.getSource("geofence")) map.removeSource("geofence");
            return;
        }

        // 2. Prepare GeoJSON Data
        const points = coordinates.map((c) => [c.long, c.lat]);
        
        const geojson: any = {
            type: "FeatureCollection",
            features: [
                ...(coordinates.length >= 3
                    ? [{
                          type: "Feature",
                          geometry: {
                              type: "Polygon",
                              coordinates: [[...points, points[0]]],
                          },
                      }]
                    : []),
                ...coordinates.map((c) => ({
                    type: "Feature",
                    geometry: { type: "Point", coordinates: [c.long, c.lat] },
                })),
            ],
        };

        const existingSource = map.getSource("geofence") as any;

        if (existingSource) {
            // Update Data
            existingSource.setData(geojson);
            
            // Update Colors dynamically if source already exists
            map.setPaintProperty("geofence-fill", "fill-color", color);
            map.setPaintProperty("geofence-outline", "line-color", color);
            map.setPaintProperty("geofence-points", "circle-stroke-color", color);
        } else {
            // Initial Source and Layers creation
            map.addSource("geofence", { type: "geojson", data: geojson });

            map.addLayer({
                id: "geofence-fill",
                type: "fill",
                source: "geofence",
                filter: ["==", ["geometry-type"], "Polygon"],
                paint: { 
                    "fill-color": color, 
                    "fill-opacity": 0.25,
                    "fill-antialias": true 
                },
            });

            map.addLayer({
                id: "geofence-outline",
                type: "line",
                source: "geofence",
                filter: ["==", ["geometry-type"], "Polygon"],
                paint: { 
                    "line-color": color, 
                    "line-width": 3,
                    // "line-join": "round" 
                },
            });

            map.addLayer({
                id: "geofence-points",
                type: "circle",
                source: "geofence",
                filter: ["==", ["geometry-type"], "Point"],
                paint: {
                    "circle-radius": 4,
                    "circle-color": "#ffffff",
                    "circle-stroke-width": 2,
                    "circle-stroke-color": color,
                },
            });
        }
    }, [map, isLoaded, coordinates, color]); // Added 'color' to dependency array

    return null;
}