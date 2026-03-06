import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { EventType } from "@/types/event";
import { formatSimpleDate, formatTime12h } from "@/util/dateUtil";
import { Calendar, Clock, MapPin, Menu, X } from "lucide-react";
import React, { useState } from "react";

interface EventDetailProps {
    data: EventType;
}

export default function EventDetailModal({ data }: EventDetailProps) {
    const [showModal, setShowModal] = useState(true);

    const handleShowModal = () => {
        setShowModal((prev) => (prev === true ? false : true));
    };
    return (
        <div className="hidden md:flex">
            <div className="absolute  top-10 right-2">
                <Button variant={"outline"} onClick={handleShowModal}>
                    {showModal ? <X /> : <Menu />}
                </Button>
            </div>
            <div className="absolute top-20 right-2 w-md">
                {showModal && (
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Event Details</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {/* Title + description */}
                                <div>
                                    <h2 className="text-xl font-bold ">
                                        {data.title}
                                    </h2>
                                    {data.description && (
                                        <p className="text-md text-pretty text-muted-foreground mt-1 ">
                                            {data.description}
                                        </p>
                                    )}
                                </div>

                                <div className="h-px bg-border" />

                                {/* Meta info */}
                                <div className="space-y-3">
                                    {data.location && (
                                        <div className="flex items-start gap-3">
                                            <span className="mt-0.5 p-1.5 rounded-full bg-primary/10">
                                                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                                            </span>
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground uppercase ">
                                                    Location
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {data.location}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 p-1.5 rounded-full bg-primary/10">
                                            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                                        </span>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase ">
                                                Date
                                            </p>
                                            <p className="text-sm font-medium">
                                                {formatSimpleDate(
                                                    data.start_date,
                                                )}
                                                {data.start_date !==
                                                    data.end_date && (
                                                    <>
                                                        {" "}
                                                        &ndash;{" "}
                                                        {formatSimpleDate(
                                                            data.end_date,
                                                        )}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 p-1.5 rounded-full bg-primary/10">
                                            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                                        </span>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground uppercase">
                                                Time
                                            </p>
                                            <p className="text-sm font-medium">
                                                {formatTime12h(data.start_time)}{" "}
                                                &ndash;{" "}
                                                {formatTime12h(data.end_time)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
