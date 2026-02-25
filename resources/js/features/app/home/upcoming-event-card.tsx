import { Clock, MapPin } from "lucide-react";

interface EventCardProps {
    month: string;
    day: number;
    title: string;
    dayOfWeek: string;
    time: string;
    location: string;
}

export function UpcomingEventCard({
    month,
    day,
    title,
    dayOfWeek,
    time,
    location,
}: EventCardProps) {
    return (
        <div className="flex items-center gap-4 rounded-lg bg-card p-4 shadow-sm border border-border transition-shadow hover:shadow-md">
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
