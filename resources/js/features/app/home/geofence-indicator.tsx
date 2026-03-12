import { Button } from "@/components/ui/button";
import { MiniMap } from "@/components/ui/mini-map";
import { useIsMobile } from "@/hooks/use-mobile";
import { MapPin, Navigation } from "lucide-react";

export function GeofenceIndicator({
    isInRange,
    distanceText,
    onViewMap,
    onCheckIn,
    locationName,
}: {
    isInRange: boolean;
    distanceText: string | null;
    onViewMap: () => void;
    onCheckIn: () => void;
    locationName: string;
}) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="space-y-3">
                <div
                    className={`relative flex items-center justify-between p-3 rounded-xl border transition-all ${
                        isInRange
                            ? "bg-green-50 border-green-200"
                            : "bg-amber-50 border-amber-200"
                    }`}
                >
                    <div className="relative flex items-center gap-3">
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
                                {isInRange
                                    ? "Location Verified"
                                    : "Outside Geofence"}
                            </span>
                            <span className="text-xs text-slate-600">
                                {isInRange
                                    ? locationName
                                    : distanceText || "Calculating..."}
                            </span>
                        </div>
                    </div>

                    {!isInRange && (
                        <button
                            onClick={onViewMap}
                            className="text-[10px] font-bold text-amber-700 underline uppercase"
                        >
                            View Map
                        </button>
                    )}
                </div>

                {/* Check-in Button: Only visible/enabled when in range */}
                {isInRange && (
                    <button
                        onClick={onCheckIn}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
                    >
                        Proceed to Check-in
                    </button>
                )}
            </div>
        );
    }

    return (
        <div
            className={`h-full rounded-2xl p-5 flex flex-col justify-between hover-card transition-all duration-200 border
        ${
            isInRange
                ? "bg-green-50 border-green-200"
                : "bg-amber-50 border-amber-200"
        }
        `}
        >
            <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                    <p
                        className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                            isInRange ? "text-green-600" : "text-amber-600"
                        }`}
                    >
                        {isInRange ? "Location Verified" : "Outside Geofence"}
                    </p>
                    <p className="text-[13px] font-medium text-ink">
                        {isInRange
                            ? locationName
                            : distanceText || "Calculating..."}
                    </p>
                </div>
                <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isInRange ? "bg-green-100" : "bg-amber-100"}`}
                >
                    <Navigation
                        size={18}
                        className={
                            isInRange ? `text-green-500` : `text-amber-500`
                        }
                    />
                </div>
            </div>
            <MiniMap isInRange={isInRange} />
            {!isInRange ? (
                <button
                    onClick={onViewMap}
                    className="w-full py-2 rounded-xl  text-white text-[12px] font-bold  transition-colors duration-150 bg-amber-500"
                >
                    View Map
                </button>
            ) : (
                <button
                    onClick={onCheckIn}
                    className="w-full py-2 rounded-xl  text-white text-[12px] font-bold  transition-colors duration-150 bg-green-500"
                >
                    Proceed to Check-in
                </button>
            )}
        </div>
    );
}
