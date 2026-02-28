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
import {
    ArrowUpDown,
    Check,
    Cross,
    Edit,
    Loader2,
    Minus,
    MoreHorizontal,
    Plus,
} from "lucide-react";
import { DataTableColumnHeader } from "../../../../components/ui/data-table-column-header";
import { EventType } from "@/types/event";
import { formatSimpleDate, formatTime12h } from "@/util/dateUtil";
import { QrCode, FileText, UserPen } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link } from "@inertiajs/react";


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
        accessorKey: "status",
        header: "Status",
        cell: ({ row, table }: any) => {
            const statusStyles: Record<string, string> = {
                active: "bg-green-100 text-green-700 border-green-200 hover:bg-green-200 hover:text-green-800",
                inactive:
                    "bg-red-100 text-red-700 border-red-200 hover:bg-red-200 hover:text-red-800",
            };
            const currentStatus = row.original.status; // 'active' or 'inactive'

            const meta = table.options.meta as any;

            const isProcessing = meta?.processingId === row.original.id;
            return (
                <>
                    <Select
                        disabled={isProcessing}
                        defaultValue={currentStatus}
                        onValueChange={(value) => {
                            if (meta?.onStatusChange) {
                                meta.onStatusChange(row.original.id, value);
                            }
                        }}
                    >
                        <SelectTrigger
                            className={`w-32 h-8 font-medium transition-colors ${statusStyles[currentStatus] || "bg-gray-100"}`}
                            size="sm"
                        >
                            {/* Show spinner if processing, otherwise show value */}
                            {isProcessing ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className=" animate-spin" />
                                    Loading
                                </div>
                            ) : (
                                <SelectValue placeholder="Status" />
                            )}
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectItem value="active">
                                <div className="flex items-center gap-2">
                                    <Plus className="text-green-700" />
                                    Active
                                </div>
                            </SelectItem>
                            <SelectItem value="inactive">
                                <div className="flex items-center gap-2">
                                    <Minus className="text-red-700" />
                                    Inactive
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
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
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/events/edit/${row.original.id}`}>
                                <Edit />
                                Edit Event
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <QrCode />
                            Generate QR
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FileText />
                            Manage Attendance
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <UserPen />
                            Manage Event Guest
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
