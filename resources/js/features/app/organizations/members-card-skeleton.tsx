import React from "react";
import {
    Avatar,
    AvatarBadge,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
export default function MembersCardSkeleton() {
    return (
        <div
            className={` px-8 py-2 flex gap-3 items-center md:bg-white hover:bg-primary/5`}
        >
            <Skeleton className=" size-10 bg-gray-200 rounded-full" />
            <div className="space-y-2 grow">
                <Skeleton className="h-4 max-w-[250px] bg-gray-200" />
                <Skeleton className="h-4 w-[200px] bg-gray-200" />
            </div>
        </div>
    );
}
