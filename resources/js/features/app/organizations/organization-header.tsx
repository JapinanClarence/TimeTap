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
import { MemberType } from "@/types/member";
import { Deferred } from "@inertiajs/react";

interface OrganizationHeaderProps extends OrganizationType {
    joined_at: string;
    members: MemberType[];
    onShowSheet: () => void;
    onShowMembers: () => void;
}

export default function OrganziationHeader({
    id,
    name,
    image,
    joined_at,
    members,
    onShowSheet,
    onShowMembers,
}: OrganizationHeaderProps) {
    const DISPLAY_LIMIT = 3;
    const displayMembers = members?.slice(0, DISPLAY_LIMIT) || [];
    const remainingCount = Math.max(0, (members?.length || 0) - DISPLAY_LIMIT);
    return (
        <div className="relative overflow-hidden w-full min-h-[80px] flex items-stretch justify-between px-6 md:px-10 xl:px-8 py-5 bg-linear-to-tr from-[#4F6EF7] to-[#6366f1]">
            <BubbleBgDecoration />

            <div className="flex items-start  gap-5 grow">
                <Avatar className="flex-none size-15 md:h-full md:w-30 aspect-square rounded-xl border border-white/20 shadow-sm">
                    <AvatarImage src={image} alt={name} />
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

                        <Deferred
                            data="members"
                            fallback={
                                <div className="flex items-center -space-x-3 scale-90 origin-left">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="size-8 rounded-full border-2 border-background bg-gray-200 animate-pulse"
                                        />
                                    ))}
                                    <div className="size-8 rounded-full border-2 border-background bg-gray-200 animate-pulse flex items-center justify-center text-[10px] text-transparent">
                                        +00
                                    </div>
                                </div>
                            }
                        >
                            <AvatarGroup
                                className="hover:grayscale scale-90 origin-left cursor-pointer"
                                onClick={onShowMembers}
                            >
                                {displayMembers.map((member) => (
                                    <Avatar key={member.id}>
                                        <AvatarImage src={member.profile} />
                                        <AvatarFallback>
                                            {member.first_name[0]}
                                            {member.last_name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                ))}

                                {remainingCount > 0 && (
                                    <AvatarGroupCount>
                                        +{remainingCount}
                                    </AvatarGroupCount>
                                )}
                            </AvatarGroup>
                        </Deferred>
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
