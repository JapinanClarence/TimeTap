import { Calendar, CalendarDays, Clock, MapPin } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { Progress } from "../../../components/ui/progress";
import { Badge } from "../../../components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "@inertiajs/react";

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
                {/* <Badge className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
                    1 event
                </Badge> */}
            </div>
            {/* <!-- Event row --> */}
            <div className="flex items-center gap-3 bg-primary/5 rounded-xl p-3">
                <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10">
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
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {dayOfWeek}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {time}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {location}
                    </span>
                </div>
            </div>
            {/* <Link
                href={`/app/schedule`}
                className="text-xs font-semibold text-primary hover:underline mt-auto"
            >
                View full schedule →
            </Link> */}
        </div>
    );
}
