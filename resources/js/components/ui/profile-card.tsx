import React, { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BubbleBgDecoration } from "@/components/ui/bubble-bg-decoration";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { FilePicker } from "./file-picker";

interface ProfileCardProps {
    name: string;
    email: string;
    created_at: string;
    id: string;
    fallback:string;
    image?: string;
    setShowFilePicker? : () => void;
}

export const ProfileCard = ({
    name,
    email,
    created_at,
    id,
    fallback,
    image,
    setShowFilePicker
}: ProfileCardProps) => {
   
    const isMobile = useIsMobile();
    return (
        <>
            <div className="flex items-center gap-5 px-6 py-5 bg-linear-to-tr from-[#4F6EF7]  to-[#6366f1] rounded-xl relative animate-fade-up">
                {/* Background decoration */}
                <BubbleBgDecoration />
                <Avatar
                    onClick={setShowFilePicker}
                    className="size-20 border-4 border-white/20 rounded-full shadow-sm relative "
                >
                    <AvatarImage src={image} alt={name} />
                    <AvatarFallback className="bg-white/20 text-white rounded-full font-bold text-xl backdrop-blur-sm">
                        {fallback}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h1 className="font-bold text-2xl text-white">{name}</h1>
                    <p className="font-semibold text-sm text-gray-300">
                        {email}
                    </p>
                    <Badge className="bg-white/10 font-semibold">
                        Created at {created_at}
                    </Badge>
                </div>
                {!isMobile && (
                    <Button
                        onClick={setShowFilePicker}
                        variant={"outline"}
                        className="relative md:ml-auto "
                    >
                        Edit Photo
                    </Button>
                )}
            </div>
          
        </>
    );
};
