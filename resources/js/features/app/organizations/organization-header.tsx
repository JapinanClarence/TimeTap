import React, { useState } from "react";
import { BubbleBgDecoration } from "@/components/ui/bubble-bg-decoration";
import { Badge } from "@/components/ui/badge";
import { OrganizationType } from "@/types/organization";
import { Calendar, Ellipsis, Settings, Users2 } from "lucide-react";
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";

interface OrganizationHeaderProps extends OrganizationType {
    joined_at: string;
    onShowSheet: () => void;
    onShowMembers: () =>void;
}

export default function OrganziationHeader({
    id,
    name,
    image,
    members_count,
    joined_at,
    onShowSheet,
    onShowMembers,
}: OrganizationHeaderProps) {
    return (
        <div className="relative overflow-hidden w-full min-h-[80px] flex items-stretch justify-between px-6 md:px-10 xl:px-8 py-5 bg-linear-to-tr from-[#4F6EF7] to-[#6366f1]">
            <BubbleBgDecoration />

            <div className="flex items-start  gap-5 grow">
                <Avatar className="flex-none size-15 md:h-full md:w-30 aspect-square rounded-xl border border-white/20 shadow-sm">
                    <AvatarFallback className="rounded-xl bg-white/90 border border-white text-primary text-xl font-bold h-full w-full">
                        {name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="grow py-1">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
                        {name}
                    </h3>
                    <div className="flex gap-2 flex-col  mt-1">
                        <Badge className="bg-white/10 border border-white md:mb-0 md:mr-4 w-fit text-[10px] md:text-xs">
                            <Users2 /> Since {joined_at}
                        </Badge>

                        <AvatarGroup className="hover:grayscale scale-90 origin-left cursor-pointer" onClick={onShowMembers}>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarImage src="https://github.com/maxleiter.png" />
                                <AvatarFallback>LR</AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarImage src="https://github.com/evilrabbit.png" />
                                <AvatarFallback>ER</AvatarFallback>
                            </Avatar>
                            <AvatarGroupCount>
                                    +3
                            </AvatarGroupCount>
                        </AvatarGroup>
                    </div>
                </div>

                <button
                    onClick={onShowSheet}
                    className="flex-none text-white relative  p-2 self-start"
                >
                    <Ellipsis />
                </button>
            </div>
           
           
        </div>
    );
}
