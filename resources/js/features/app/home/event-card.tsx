import { Calendar, CalendarDays, Clock, MapPin } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { Progress } from "../../../components/ui/progress";
import { Badge } from "../../../components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface EventCardProps {
    month: string;
    day: number;
    title: string;
    dayOfWeek: string;
    time: string;
    location: string;
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
}: EventCardProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="flex items-center gap-4 rounded-lg bg-card p-4 border border-border border-l-5 border-l-[#b6cbfb] transition-shadow hover:shadow-md">
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
                        {/* <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${s.className}`}
                    >
                        {s.label}
                    </span> */}
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

    return (
        <div className="h-full bg-white border border-border rounded-2xl p-5 flex flex-col gap-3 hover-card transition-all duration-200">
            <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-sm text-muted-foreground">
                    Today's Event
                </h2>
                <Badge className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
                    1 event
                </Badge>
            </div>
            {/* <!-- Event row --> */}
            <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-3">
                <div className="flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-primary/10 shrink-0">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                        MAR
                    </span>
                    <span className="font-display font-bold text-lg text-primary leading-none">
                        9
                    </span>
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-muted-foreground truncate">
                        Sample Event
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Clock className="size-3" />
                        Mon – Thu · 10:00–12:00 PM
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="size-3" />
                        Gymnasium
                    </div>
                </div>
            </div>
            <a
                href="#"
                className="text-xs font-semibold text-primary hover:underline mt-auto"
            >
                View full schedule →
            </a>
        </div>
    );
}
