"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { EventType } from "@/types/event";
import { formatSimpleDate, formatTime12h } from "@/util/dateUtil";

export interface EventColumn extends EventType {
    attendees: number;
}

export const columns: ColumnDef<EventColumn>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <div className="ml-2">
                <DataTableColumnHeader column={column} title="Title" />
            </div>
        ),
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "start_date",
        header: "Start date",
        cell: ({ row }) => {
            const start_date = formatSimpleDate(row.getValue("start_date"));
            return <div>{start_date}</div>;
        },
    },
    {
        accessorKey: "end_date",
        header: "End date",
        cell: ({ row }) => {
            const end_date = formatSimpleDate(row.getValue("end_date"));
            return <div>{end_date}</div>;
        },
    },
    {
        accessorKey: "start_time",
        header: "Start time",
        cell: ({ row }) => {
            const start_time = formatTime12h(row.getValue("start_time"));
            return <div>{start_time}</div>;
        },
    },
    {
        accessorKey: "end_time",
        header: "End time",
        cell: ({ row }) => {
            const end_time = formatTime12h(row.getValue("end_time"));
            return <div>{end_time}</div>;
        },
    },
    {
        accessorKey: "attendees",
        header: ({ column }) => (
            <div className="ml-2">
                <DataTableColumnHeader column={column} title="Attendees" />
            </div>
        ),
    },
];
