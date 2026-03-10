import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import React from "react";

interface OrganizationCardProps {
    name: string;
    description?: string;
    image?:string;
}

export default function OrganizationCard({
    name,
    description,
}: OrganizationCardProps) {
    return (
        <div className="flex gap-2 items-center border p-2 rounded-lg shadow-xs">
            <Avatar className="h-12 w-12 rounded-full">
                <AvatarFallback className="rounded-full bg-primary/10">
                    VD
                </AvatarFallback>
            </Avatar>
            <div>
                <h2 className="text-md font-medium">{name}</h2>
            </div>
        </div>
    );
}
