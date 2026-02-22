import { Calendar, CalendarDays, Clock, MapPin } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Progress } from "./progress";
import { Badge } from "./badge";

interface EventCardProps {
    month: string;
    day: number;
    title: string;
    dayOfWeek: string;
    time: string;
    location: string;
    status: "in-range" | "upcoming" | "passed";
    showStatus?: boolean;
}

const statusConfig = {
    "in-range": {
        label: "In Range",
        className: "bg-green-100 text-green-700",
    },
    upcoming: {
        label: "Upcoming",
        className: "bg-badge-warning-bg text-badge-warning-text",
    },
    passed: {
        label: "Passed",
        className: "bg-badge-muted-bg text-badge-muted-text",
    },
};
export default function EventCard({
    month,
    day,
    title,
    dayOfWeek,
    time,
    location,
    status,
    showStatus = true,
}: EventCardProps) {
    const s = statusConfig[status];
    return (
        <div className="flex items-center gap-4 rounded-lg bg-card p-4 shadow-sm border border-border border-l-5 border-l-[#b6cbfb] transition-shadow hover:shadow-md">
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10">
                <span className="text-[11px] font-semibold uppercase leading-none tracking-wide text-primary">
                    {month}
                </span>
                <span className="text-xl font-bold leading-tight text-primary">
                    {day}
                </span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex justify-between items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-card-foreground">
                        {title}
                    </h3>
                    <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${s.className}`}
                    >
                        {s.label}
                    </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {dayOfWeek} • {time}
                    </span>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {location}
                </span>
            </div>
        </div>
    );
}
