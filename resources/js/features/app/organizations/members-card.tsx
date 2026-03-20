import React from "react";
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import { MemberType } from "@/types/member";
import { capitalize } from "@/util/stringUtil";
export default function MembersCard({
    first_name,
    last_name,
    email,
}: MemberType) {
    return (
        <div
            className={`text-xs px-8 md:px-2 md:border rounded-lg md:shadow-xs py-2  flex gap-3  hover:bg-primary/5`}
        >
            <Avatar className="size-10 rounded-full border border-primary/50">
                <AvatarFallback className="rounded-full bg-primary/10 text-primary font-semibold">
                    {first_name.charAt(0).toUpperCase()}
                    {last_name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div>
                <div className="flex flex-col">
                    <h2 className="text-sm font-semibold">
                        {capitalize(first_name)} {capitalize(last_name)}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                       {email}
                    </p>
                </div>
            </div>
        </div>
    );
}
