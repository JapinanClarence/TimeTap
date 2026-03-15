import { Badge } from "@/components/ui/badge";
import { EventType } from "@/types/event";
import {
    formatDate,
    formatMonthDayOnly,
    formatSimpleDate,
    formatTime12h,
} from "@/util/dateUtil";
import React from "react";

interface HistoryCardProps {
    title: string;
    location: string;
    start_date: string;
    id?: string;
    is_present: boolean;
    check_in_time: string;
}

export default function HistoryCard({
    title,
    start_date,
    location,
    is_present,
    check_in_time,
}: HistoryCardProps) {
    return (
        <div
            className={`text-xs p-3 border  rounded-xl flex gap-3 shadow-xs items-center bg-white hover-card`}
        >
            {/* indicator */}
            <div
                className={`self-stretch w-1 rounded-full 
                    ${is_present ? "bg-green-500" : "bg-red-500"} 
                    `}
            />
            <div className="grow">
                <p className={`font-bold text-base`}>{title}</p>
                <p className="text-muted-foreground">{location}</p>
            </div>
            <div className="text-right space-y-2">
                <div className="text-muted-foreground font-medium">
                    {formatSimpleDate(start_date)}
                </div>
                {check_in_time ? (
                    <Badge className="font-bold bg-green-100 text-green-600">
                        Checked in {check_in_time}
                    </Badge>
                ) : (
                    <Badge className="bg-red-100 text-red-500">Absent</Badge>
                )}
            </div>
        </div>
    );
}
