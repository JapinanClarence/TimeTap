import React, { useState } from "react";
import { BubbleBgDecoration } from "@/components/ui/bubble-bg-decoration";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { OrganizationType } from "@/types/organization";
import { Ellipsis, Users2 } from "lucide-react";
import LeaveOrgSheet from "./leave-org-sheet";

interface OrganizationHeaderProps extends OrganizationType {
    joined_at: string;
    onShowSheet: () =>void;
}

export default function OrganziationHeader({
    id,
    name,
    image,
    members_count,
    joined_at,
    onShowSheet
}: OrganizationHeaderProps) {
  

    return (
        <div className="relative overflow-hidden flex items-center justify-between px-6 py-5 bg-linear-to-tr from-[#4F6EF7]  to-[#6366f1]">
            {/* Background decoration */}
            <BubbleBgDecoration />
            <div className="flex items-start gap-5">
                <Avatar className="size-20 rounded-lg border border-primary/50">
                    <AvatarFallback className="rounded-lg bg-white/10 border border-white text-white text-xl font-bold">
                        {name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="">
                    <h3 className="text-xl font-semibold text-white">{name}</h3>
                    <Badge className="bg-white/10 border border-white mb-2">
                        Member since {joined_at}
                    </Badge>
                    <Badge className="bg-white/10 border border-white">
                        <Users2 className="size-4" />
                        {members_count} members
                    </Badge>
                </div>

                <button
                    onClick={onShowSheet}
                    className="text-white relative"
                >
                    <Ellipsis />
                </button>
            </div>
           
        </div>
    );
}
