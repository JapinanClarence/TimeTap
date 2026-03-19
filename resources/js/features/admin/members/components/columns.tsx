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
import { MoreHorizontal, UserX } from "lucide-react";
import { DataTableColumnHeader } from "../../../../components/ui/data-table-column-header";
import { MemberType } from "@/types/member";
import { formatSimpleDate } from "@/util/dateUtil";
import { capitalize } from "@/util/stringUtil";

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
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => {
            const gender : string = row.getValue("gender")
            return <div>{capitalize(gender)}</div>;
        },
    },
    {
        accessorKey: "joined_at",
        header: ({ column }) => (
            <div className="ml-2">
                <DataTableColumnHeader column={column} title="Date Joined" />
            </div>
        ),
        cell: ({ row }) => {
            const joined_at = formatSimpleDate(row.getValue("joined_at"));
            return <div>{joined_at}</div>;
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
                        <DropdownMenuItem>
                            <UserX />
                            Remove User
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
