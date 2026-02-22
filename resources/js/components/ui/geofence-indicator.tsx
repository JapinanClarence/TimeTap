import { MapPin, Navigation } from "lucide-react";
import React from "react";

export default function GeofenceIndicator({isInRange}: {
    isInRange: boolean;
}) {
    return (
        <div
            className={`mt-3 relative flex items-center justify-between p-3 rounded-xl border transition-all ${
                isInRange
                    ? "bg-green-50 border-green-200"
                    : "bg-amber-50 border-amber-200"
            }`}
        >
            <div className="relative  flex items-center gap-3">
                <div className="relative flex h-8 w-8 items-center justify-center">
                    {isInRange ? (
                        <MapPin className="h-5 w-5 text-green-600" />
                    ) : (
                        <>
                            <span className="animate-ping absolute h-full w-full rounded-full bg-amber-400 opacity-25"></span>
                            <Navigation className="h-4 w-4 text-amber-600 " />
                        </>
                    )}
                </div>
                <div className="flex flex-col">
                    <span
                        className={`text-[10px] font-bold uppercase ${isInRange ? "text-green-700" : "text-amber-700"}`}
                    >
                        {isInRange ? "Location Verified" : "Outside Geofence"}
                    </span>
                    <span className="text-xs text-slate-600">
                        {isInRange
                            ? "DoRSU Gymnasium"
                            : "150m from destination"}
                    </span>
                </div>
            </div>
            {!isInRange && (
                <button className="text-[10px] font-bold text-amber-700 underline uppercase">
                    View Map
                </button>
            )}
        </div>
    );
}
