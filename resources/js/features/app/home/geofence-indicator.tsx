import { MapPin, Navigation } from "lucide-react";

export function GeofenceIndicator({ 
    isInRange, 
    distanceText, 
    onViewMap, 
    onCheckIn,
    locationName 
}: {
    isInRange: boolean;
    distanceText: string | null;
    onViewMap: () => void;
    onCheckIn: () => void;
    locationName: string;
}) {
    return (
        <div className="space-y-3">
            <div className={`relative flex items-center justify-between p-3 rounded-xl border transition-all ${
                isInRange ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
            }`}>
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
                        <span className={`text-[10px] font-bold uppercase ${isInRange ? "text-green-700" : "text-amber-700"}`}>
                            {isInRange ? "Location Verified" : "Outside Geofence"}
                        </span>
                        <span className="text-xs text-slate-600">
                            {isInRange ? locationName : distanceText || "Calculating..."}
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