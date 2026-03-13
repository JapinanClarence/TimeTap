import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import React from "react";

export default function AttendanceCard() {
    return (
        <div className="border rounded-lg p-2 px-3.5 flex items-stretch gap-3 hover-card shadow-xs">
            {/* indicator */}
            <div className="self-stretch w-1 rounded-full bg-green-500 my-1" />

            {/* Main Content Group */}
            <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={""} alt={"John Marston"} />
                        <AvatarFallback className="rounded-lg bg-green-100 text-green-600 font-bold">
                            JM
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <p className="font-semibold text-sm leading-tight">
                            John Marston
                        </p>
                        <p className="text-xs text-muted-foreground">
                            johnM@gmail.com
                        </p>
                        {/* Mobile Status badge */}
                        <div className="flex md:hidden items-center gap-2 mt-2">
                            <Badge className="bg-green-500 hover:bg-green-600 border-none h-5 px-2 text-[10px]">
                                Checked In
                            </Badge>
                            <span className="text-xs font-medium text-muted-foreground">
                                8:00 AM
                            </span>
                        </div>
                    </div>
                </div>

                {/* Desktop Status Badge */}
                <div className="hidden md:flex items-center gap-1">
                    <Badge className="bg-green-500 hover:bg-green-600 border-none">
                        Checked In
                    </Badge>
                    <span className="text-xs font-medium text-muted-foreground">
                        8:00 AM
                    </span>
                </div>
            </div>
        </div>
    );
}
