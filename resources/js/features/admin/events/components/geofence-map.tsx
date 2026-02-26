import React from "react";
import { Map, MapControls } from "@/components/ui/map";
import { Card, CardTitle } from "@/components/ui/card";

export const GeofenceMap = () => {
    return (
        <div>
            <div className="mb-2">
                <h1 className="font-semibold">Event Area</h1>
                <p className="text-sm text-muted-foreground">
                    Mark area of the event to the map.
                </p>
            </div>

            <Card className="h-[60vh] max:h-[70vh] p-0 overflow-hidden shadow-none">
                <Map center={[-74.006, 40.7128]} zoom={11} theme="light">
                    <MapControls />
                </Map>
            </Card>
        </div>
    );
};
