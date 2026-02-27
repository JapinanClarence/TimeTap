"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "../../../../components/ui/data-table-column-header";
import { EventType } from "@/types/event";
import { formatSimpleDate, formatTime12h } from "@/util/dateUtil";



export const columns: ColumnDef<EventType>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <div className="ml-2">
                <DataTableColumnHeader column={column} title="Title" />
            </div>
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="w-20 truncate">{row.getValue("description")}</div>
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
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                            View payment details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
