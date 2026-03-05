import React, { useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import AppLayout from "@/layouts/app/AppLayout";
import { usePage } from "@inertiajs/react";
import { parseISO } from "date-fns";
import { EventType } from "@/types/event";
export default function Schedule() {
    const { events } = usePage<{ events: EventType[] }>().props;

    // 1. Generate colors and modifiers based on events
    const { modifiers, eventStyles, eventColors } = useMemo(() => {
        const mods: Record<string, any> = {};
        const colors: Record<string, string> = {};
        let styles = "";

        events.forEach((event, index) => {
            if (!event.id) return;
            // Generate a random-ish but pleasing HSL color
            // Using the index or ID ensures the color stays consistent for that event
            const hue = (index * 137.5) % 360; // Golden angle for even distribution
            const bgColor = `hsla(${hue}, 70%, 80%, 1)`;
            const textColor = `hsla(${hue}, 70%, 20%, 1)`;
            const modifierKey = `event-${event.id}`;

            mods[modifierKey] = {
                from: parseISO(event.start_date),
                to: parseISO(event.end_date),
            };

            colors[event.id] = bgColor;

            // Create a custom CSS class for this specific event
            styles += `
                .rdp .rdp-day.${modifierKey} {
                    background-color: ${bgColor} !important;
                    color: ${textColor} !important;
                    border-radius: 0;
                    font-weight: bold;
                }
                .rdp .rdp-day.${modifierKey}.rdp-day_range_start {
                    border-top-left-radius: 8px !important;
                    border-bottom-left-radius: 8px !important;
                }
                .rdp .rdp-day.${modifierKey}.rdp-day_range_end {
                    border-top-right-radius: 8px !important;
                    border-bottom-right-radius: 8px !important;
                }
            `;
        });

        return { modifiers: mods, eventStyles: styles, eventColors: colors };
    }, [events]);

    return (
        <AppLayout showHeader={false}>
            <style dangerouslySetInnerHTML={{ __html: eventStyles }} />
            <h1 className="text-start px-8 text-xl font-semibold mt-10">Schedules</h1>
            <div className="flex flex-col items-center justify-center p-8 gap-6">
                <Calendar
                    mode="multiple"
                    modifiers={modifiers}
                    captionLayout="dropdown"
                    className="rounded-lg border shadow-sm w-full max-w-2xl bg-background"
                />

                {/* 3. Event Legend with matching colors */}
                <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-3">
                    {events.map((event) => {
                        if (!event.id) return;
                        return (
                            <div
                                key={event.id}
                                style={{
                                    borderLeftColor: eventColors[event.id],
                                }}
                                className="text-xs p-3 border-l-4 border rounded-md bg-background shadow-sm flex flex-col gap-1"
                            >
                                <div className="flex justify-between font-bold text-foreground">
                                    <span>{event.title}</span>
                                    <span className="text-[10px] opacity-60">
                                        {event.start_time.slice(0, 5)}
                                    </span>
                                </div>
                                <p className="text-muted-foreground truncate">
                                    {event.location}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
