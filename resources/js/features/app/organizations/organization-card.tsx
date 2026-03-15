import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, CheckCircle2, ChevronRight, Users, Users2 } from "lucide-react";
import React from "react";

interface OrganizationCardProps {
    name: string;
    description?: string;
    image?: string;
    isCurrent?: boolean;
}

export default function OrganizationCard({
    name,
    description,
    isCurrent = false,
}: OrganizationCardProps) {
    return (
        <div className="flex gap-2 items-center justify-between border p-3.5 bg-white rounded-xl shadow-xs animate-fade-up cursor-pointer hover-card">
            <div className="flex gap-2 items-center">
                <Avatar className="h-12 w-12 rounded-lg border border-primary/50">
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary font-bold">
                        VD
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex gap-2 items-center">
                        <h2 className="text-md font-medium">{name} </h2>
                        {isCurrent && (
                            <div className="bg-primary size-4  rounded-full p-1">
                                <Check
                                    className="size-2 text-white"
                                    strokeWidth={5}
                                />
                            </div>
                        )}
                    </div>
                    <span className="inline-flex gap-2 text-sm text-muted-foreground">
                        <Users2 className="size-4" />
                        12 Members
                    </span>
                </div>
            </div>

            <div>
                <ChevronRight className="text-muted-foreground shrink-0 transition-all duration-150" />
            </div>
        </div>
    );
}
