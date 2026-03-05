import React, { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import AppLayout from "@/layouts/app/AppLayout";
import { usePage } from "@inertiajs/react";
import { parseISO, isSameMonth, isWithinInterval, startOfDay } from "date-fns";
import { EventType } from "@/types/event";
import { formatTime12h } from "@/util/dateUtil";
import { Empty } from "@/components/ui/empty";
import { NoContent } from "@/features/app/home/no-content";

// A palette of distinct Tailwind-compatible colors assigned round-robin to events
const EVENT_COLORS: {
    bg: string;
    dot: string;
    text: string;
    border: string;
}[] = [
    {
        bg: "bg-blue-500",
        dot: "bg-blue-500",
        border: "border-l-blue-500",
        text: "text-blue-600",
    },
    {
        bg: "bg-rose-500",
        dot: "bg-rose-500",
        border: "border-l-rose-500",
        text: "text-rose-600",
    },
    {
        bg: "bg-emerald-500",
        dot: "bg-emerald-500",
        border: "border-l-emerald-500",
        text: "text-emerald-600",
    },
    {
        bg: "bg-amber-500",
        dot: "bg-amber-500",
        border: "border-l-amber-500",
        text: "text-amber-600",
    },
    {
        bg: "bg-violet-500",
        dot: "bg-violet-500",
        border: "border-l-violet-500",
        text: "text-violet-600",
    },
    {
        bg: "bg-pink-500",
        dot: "bg-pink-500",
        border: "border-l-pink-500",
        text: "text-pink-600",
    },
    {
        bg: "bg-cyan-500",
        dot: "bg-cyan-500",
        border: "border-l-cyan-500",
        text: "text-cyan-600",
    },
    {
        bg: "bg-orange-500",
        dot: "bg-orange-500",
        border: "border-l-orange-500",
        text: "text-orange-600",
    },
];

export default function Schedule() {
    const { events } = usePage<{ events: EventType[] }>().props;

    // Track which month the calendar is currently showing
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    // Assign a stable color index to each event by its id
    const eventColorMap = useMemo(() => {
        const map: Record<string | number, number> = {};
        events.forEach((event, idx) => {
            if (!event.id) return;
            map[event.id] = idx % EVENT_COLORS.length;
        });
        return map;
    }, [events]);

    // Build a map: dateString (YYYY-MM-DD) → list of color indices for dots
    const dayColorMap = useMemo(() => {
        const map: Record<string, number[]> = {};

        events.forEach((event) => {
            if (!event.id) return;
            const start = startOfDay(parseISO(event.start_date));
            const end = startOfDay(parseISO(event.end_date));
            const colorIdx = eventColorMap[event.id];

            // Iterate every day in the event range
            const cursor = new Date(start);
            while (cursor <= end) {
                const key = cursor.toISOString().slice(0, 10);
                if (!map[key]) map[key] = [];
                if (!map[key].includes(colorIdx)) map[key].push(colorIdx);
                cursor.setDate(cursor.getDate() + 1);
            }
        });

        return map;
    }, [events, eventColorMap]);

    // Events visible in the current calendar month
    const currentMonthEvents = useMemo(() => {
        return events.filter((event) => {
            const start = parseISO(event.start_date);
            const end = parseISO(event.end_date);
            // Show if ANY part of the event falls in the current month
            return (
                isSameMonth(start, currentMonth) ||
                isSameMonth(end, currentMonth) ||
                isWithinInterval(currentMonth, { start, end })
            );
        });
    }, [events, currentMonth]);

    // Custom day renderer: renders the date number + colored dots for each event
    const renderDay = (day: Date) => {
        const key = day.toISOString().slice(0, 10);
        const colorIndices = dayColorMap[key] ?? [];

        return (
            <div className="relative flex flex-col items-center justify-center w-full h-full gap-0.5">
                <span>{day.getDate()}</span>
                {colorIndices.length > 0 && (
                    <div className="flex gap-0.5">
                        {colorIndices.slice(0, 4).map((ci) => (
                            <span
                                key={ci}
                                className={`w-1 h-1 rounded-full ${EVENT_COLORS[ci].dot}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <AppLayout showHeader={false}>
            <h1 className="text-start px-8 text-2xl font-semibold my-10">
                Event Calendar
            </h1>
            <div className="flex flex-col items-center justify-center px-8 gap-6">
                <Calendar
                    mode="multiple"
                    captionLayout="dropdown"
                    className="rounded-lg border shadow-sm w-full max-w-md bg-background"
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    components={{
                        Day: ({ day, ...props }) => {
                            const date = day.date;
                            const key = date.toISOString().slice(0, 10);
                            const colorIndices = dayColorMap[key] ?? [];
                            const isOutside =
                                date.getMonth() !== day.displayMonth.getMonth();

                            return (
                                <td
                                    {...props}
                                    className={[
                                        props.className,
                                        "relative flex flex-col items-center justify-start pt-1 h-9 w-9",
                                        isOutside ? "opacity-30" : "",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    <span className="text-sm leading-none">
                                        {date.getDate()}
                                    </span>
                                    {colorIndices.length > 0 && !isOutside && (
                                        <span className="flex gap-0.5 mt-0.5">
                                            {colorIndices
                                                .slice(0, 4)
                                                .map((ci) => (
                                                    <span
                                                        key={ci}
                                                        className={`block w-1 h-1 rounded-full ${EVENT_COLORS[ci].dot}`}
                                                    />
                                                ))}
                                        </span>
                                    )}
                                </td>
                            );
                        },
                    }}
                />

                {/* Event Legend / List — current month only */}
                <div className="w-full max-w-md space-y-2">
                    <h2 className="text-sm font-semibold px-1">
                        Events in{" "}
                        {currentMonth.toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                        })}
                    </h2>

                    {currentMonthEvents.length === 0 ? (
                       <NoContent title="No data" description="No events found this month"/>
                    ) : (
                        currentMonthEvents.map((event) => {
                            if (!event.id) return;
                            const ci = eventColorMap[event.id];
                            const color = EVENT_COLORS[ci];
                            return (
                                <div
                                    key={event.id}
                                    className={` text-xs p-3 border border-l-4  ${color.border} rounded-md flex justify-between shadow-sm items-center bg-muted/30`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div>
                                            <p
                                                className={`font-medium ${color.text}`}
                                            >
                                                {event.title}
                                            </p>
                                            <p className="text-muted-foreground">
                                                {event.location}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right text-[10px] text-muted-foreground">
                                        <span className="text-[10px] opacity-60">
                                            {formatTime12h(
                                                event.start_time,
                                            ).slice(0, 5)}
                                            -{formatTime12h(event.end_time)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
