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
import { MemberType } from "@/types/member";
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


export const columns: ColumnDef<MemberType>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <div className="ml-2">
                <DataTableColumnHeader column={column} title="Name" />
            </div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <div className="ml-2">
                <DataTableColumnHeader column={column} title="Email" />
            </div>
        ),
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
