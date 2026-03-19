import React, { useState } from "react";
import { BubbleBgDecoration } from "@/components/ui/bubble-bg-decoration";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { OrganizationType } from "@/types/organization";
import { Ellipsis, Settings, Users2 } from "lucide-react";
import LeaveOrgSheet from "./leave-org-sheet";
import { Button } from "@/components/ui/button";

interface OrganizationHeaderProps extends OrganizationType {
    joined_at: string;
    onShowSheet: () => void;
}

export default function OrganziationHeader({
    id,
    name,
    image,
    members_count,
    joined_at,
    onShowSheet,
}: OrganizationHeaderProps) {
    return (
        <div className="relative overflow-hidden flex items-center justify-between px-6 md:px-10 xl:px-8 py-5  bg-linear-to-tr from-[#4F6EF7]  to-[#6366f1]">
            {/* Background decoration */}
            <BubbleBgDecoration />
            <div className="flex items-start gap-5">
                <Avatar className="size-20 md:size-30 rounded-lg border border-primary/50">
                    <AvatarFallback className="rounded-lg bg-white/10 border border-white text-white text-xl font-bold">
                        {name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="">
                    <h3 className="text-xl md:text-3xl font-semibold text-white">{name}</h3>
                    <Badge className="bg-white/10 border border-white mb-2 md:mb-0 md: mr-2">
                        Member since {joined_at}
                    </Badge>
                    <Badge className="bg-white/10 border border-white">
                        <Users2 className="size-4" />
                        {members_count} members
                    </Badge>
                </div>

                <button
                    onClick={onShowSheet}
                    className="text-white relative md:hidden"
                >
                    <Ellipsis />
                </button>
            </div>
            <div className="gap-2 hidden md:flex">
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white">
                    <Users2 />
                    Members
                </Button>
                <Button variant="outline" onClick={onShowSheet}>
                    <Settings />
                    Manage
                </Button>
            </div>
        </div>
    );
}
