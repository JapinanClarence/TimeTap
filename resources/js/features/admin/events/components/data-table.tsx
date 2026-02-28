"use client";
import React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { Plus } from "lucide-react";
import { Link } from "@inertiajs/react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onStatusChange: (id: number, status: string) => void;
    processingId: number | null;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onStatusChange,
    processingId,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [globalFilter, setGlobalFilter] = React.useState("");

    const filterColumns = ["status", "title", "location"];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            onStatusChange,
            processingId,
        },
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, columnId, filterValue) => {
            const searchableValue = String(filterValue).toLowerCase();

            return filterColumns.some((id) => {
                const cellValue = row.getValue(id);
                return String(cellValue)
                    .toLowerCase()
                    .includes(searchableValue);
            });
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            globalFilter,
        },
    });

    return (
        <>
            <div className="flex items-center justify-between gap-2 py-4">
                <Input
                    placeholder="Filter events..."
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)}
                    className="max-w-sm"
                />
                <div className="flex items-center gap-2 ">
                    <Link href={"/admin/events/add"}>
                        <Button className="" size={"sm"}>
                            <Plus />{" "}
                            <span className="hidden md:flex">Add Event</span>
                        </Button>
                    </Link>
                    <DataTableViewOptions table={table} />
                </div>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className="">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className=""
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className=" py-4">
                <DataTablePagination table={table} />
            </div>
        </>
    );
}
