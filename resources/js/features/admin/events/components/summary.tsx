import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EventType } from "@/types/event";
import React from "react";
import { formatSimpleDate, formatTime12h } from "@/util/dateUtil";
import { Calendar, Clock, MapPin } from "lucide-react";

interface SummaryProps {
    data: EventType;
}

export const Summary = ({ data }: SummaryProps) => {
    const start_date = formatSimpleDate(new Date(data.start_date));
    const end_date = formatSimpleDate(new Date(data.end_date));
    const start_time = formatTime12h(data.start_time);
    const end_time = formatTime12h(data.end_time);

    return (
        <div>
            <div className="mb-2">
                <h1 className="font-semibold">Looking Good?</h1>
                <p className="text-sm text-muted-foreground">
                    Check over your event summary below. If everything looks right, you’re ready to go!
                </p>
            </div>

            <div className="border  rounded-lg">
                <div className="p-5 space-y-5">
                    <div className="bg-background shadow-xs p-2 rounded-lg border ">
                        <h3 className="font-semibold text-lg text-muted-foreground">
                            {data.title}
                        </h3>
                    </div>
                    <h3 className="font-semibold text-sm">Description</h3>
                    <div className="bg-background min-h-37.5 h-40 shadow-xs p-2 rounded-lg border ">
                        <p className="text-sm text-muted-foreground">
                            {data.description || "No description..."}
                        </p>
                    </div>
                    <Separator />
                    <div className="grid md:grid-cols-3 items-center gap-2">
                        <div className="leading-none h-20 p-5 rounded-lg border shadow-xs flex items-start justify-baseline gap-2">
                            <MapPin className="inline size-4 text-muted-foreground" />
                            <div className="space-y-2">
                                <h3 className="font-semibold">Location</h3>
                                <p className="text-xs text-muted-foreground">
                                    {data.location}
                                </p>
                            </div>
                        </div>

                        <div className="leading-none h-20 p-5 rounded-lg border shadow-xs flex items-start justify-baseline gap-2">
                            <Calendar className="inline size-4 text-muted-foreground" />
                            <div className="space-y-2">
                                <h3 className="font-semibold">Date</h3>
                                <p className="text-xs text-muted-foreground">
                                    {`${start_date} - ${end_date}`}
                                </p>
                            </div>
                        </div>

                        <div className="leading-none h-20 p-5 rounded-lg border shadow-xs flex items-start justify-baseline gap-2">
                            <Clock className="inline size-4 text-muted-foreground" />
                            <div className="space-y-2">
                                <h3 className="font-semibold">Time</h3>
                                <p className="text-xs text-muted-foreground">
                                    {`${start_time} - ${end_time}`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
