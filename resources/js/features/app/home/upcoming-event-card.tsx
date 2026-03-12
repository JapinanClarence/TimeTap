import { Calendar, Clock, MapPin } from "lucide-react";

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
        <div className="flex items-center gap-4 rounded-xl bg-card p-4  border border-border hover-card md:bg-primary/5">
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
    );
}
