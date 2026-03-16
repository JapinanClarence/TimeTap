import { Badge } from "@/components/ui/badge";
import { EventType } from "@/types/event";
import { formatMonthDayOnly, formatSimpleDate, formatTime12h } from "@/util/dateUtil";
import { Link } from "@inertiajs/react";
import React from "react";

interface ScheduleCardProps {
    event: EventType;
    color: {
        bg: string;
        dot: string;
        border: string;
        text: string;
    };
}
export const ScheduleCard = ({ event, color }: ScheduleCardProps) => {
    return (
        <Link key={event.id} href={`/app/schedule/${event.id}`}>
            <div
                className={`text-xs p-3 border  rounded-xl flex justify-between shadow-xs items-center bg-white hover-card`}
            >
                <div className="flex items-center gap-2">
                    <div
                        className={`w-1 self-stretch mr-2 ${color.dot}  rounded-full`}
                    />
                    <div>
                        <p className={`font-bold text-base`}>{event.title}</p>
                        <p className="text-muted-foreground">
                            {event.location}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-muted-foreground ">
                        {formatMonthDayOnly(event.start_date)} - {formatSimpleDate(event.end_date)}
                    </div>
                    <Badge className="font-bold bg-primary/5 text-primary">
                        {formatTime12h(event.start_time).slice(0, 5)}-
                        {formatTime12h(event.end_time)}
                    </Badge>
                </div>
            </div>
        </Link>
    );
};
