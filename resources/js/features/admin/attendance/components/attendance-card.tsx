import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import React from "react";

interface AttendanceCardProps {
    data: AttendanceType;
}

export default function AttendanceCard({ data }: AttendanceCardProps) {
    return (
        <div className="border rounded-lg p-2 px-3.5 flex items-stretch h-full gap-3 hover-card shadow-xs">
            {/* indicator */}
            <div
                className={`self-stretch w-1 rounded-full 
                    ${data.type === "check-in" ? "bg-green-500" : "bg-red-500"} 
                    `}
            />

            {/* Main Content Group */}
            <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage
                            src={""}
                            alt={`${data.first_name} ${data.last_name}`}
                        />
                        <AvatarFallback
                            className={`rounded-lg font-bold 
                        ${data.type === "check-in" ? "bg-green-100 text-green-600" 
                            : "bg-red-100 text-red-600"}`}
                        >
                            JM
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <p className="font-semibold text-sm leading-tight">
                            {data.first_name} {data.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {data.email}
                        </p>
                        {/* Mobile Status badge */}
                        <div className="flex md:hidden items-center gap-2 mt-2">
                            <Badge
                                className={`border-none h-5 px-2 text-[10px]
                                    ${data.type === "check-in" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
                                    `}
                            >
                                {data.type === "check-in"
                                    ? "Checked in"
                                    : "Checked out"}
                            </Badge>
                            <span className="text-xs font-medium text-muted-foreground">
                                {data.time}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Desktop Status Badge */}
                <div className="hidden md:flex items-center gap-1">
                    <Badge
                        className={`border-none h-5 px-2 
                                    ${data.type === "check-in" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
                                    `}
                    >
                        {data.type === "check-in"
                            ? "Checked in"
                            : "Checked out"}
                    </Badge>
                    <span className="text-xs font-medium text-muted-foreground">
                        {data.time}
                    </span>
                </div>
            </div>
        </div>
    );
}
