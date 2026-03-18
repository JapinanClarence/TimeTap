import { Progress } from "@/components/ui/progress";
import React from "react";

export default function OrganizationStats({
    total_events,
    present,
    absent,
    rate,
}: {
    total_events: number;
    present: number;
    absent: number;
    rate: number;
}) {
    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-2 animate-fade-up">
            <div className="p-5 bg-white border rounded-xl shadow-xs">
                <p className="text-muted-foreground text-xs font-semibold">
                    TOTAL EVENTS
                </p>
                <p className="font-semibold text-2xl">{total_events}</p>
            </div>
            <div className="p-5 bg-white border rounded-xl shadow-xs">
                <p className="text-muted-foreground text-xs font-semibold">
                    ATTENDANCE RATE
                </p>
                <p className="font-semibold text-2xl">{rate}%</p>
                <Progress className="h-1" value={rate} />
            </div>
            <div className="p-5 bg-white border rounded-xl shadow-xs">
                <p className="text-muted-foreground text-xs font-semibold">
                    PRESENT
                </p>
                <div className="inline-flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500" />
                    <p className="font-semibold text-2xl">{present}</p>
                </div>
            </div>
            <div className="p-5 bg-white border rounded-xl shadow-xs">
                <p className="text-muted-foreground text-xs font-semibold">
                    ABSENT
                </p>
                <div className="inline-flex items-center gap-2">
                    <div className="size-2 rounded-full bg-red-500" />
                    <p className="font-semibold text-2xl">{absent}</p>
                </div>
            </div>
        </div>
    );
}
