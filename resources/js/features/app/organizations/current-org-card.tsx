import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BubbleBgDecoration } from "@/components/ui/bubble-bg-decoration";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { OrganizationType } from "@/types/organization";

interface CurrentOrgProps {
    organization: OrganizationType;
    onSwitch: () => void;
}

export default function CurrentOrgCard({
    organization,
    onSwitch,
}: CurrentOrgProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="flex justify-between items-center bg-primary/5 rounded-xl border border-primary/50 px-3 py-1.5 animate-fade-up">
                <div>
                    <p className="font-semibold text-sm text-muted-foreground">
                        Current Organization
                    </p>
                    <p className="font-semibold text-primary">
                        {organization.name}
                    </p>
                </div>

                <Button
                    className="text-muted-foreground px-0"
                    variant={"link"}
                    onClick={(e) => {
                        (e.currentTarget as HTMLButtonElement).blur();
                        onSwitch();
                    }}
                >
                    Tap to switch
                </Button>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-between px-6 py-5 bg-linear-to-tr from-[#4F6EF7]  to-[#6366f1] rounded-xl relative ">
            {/* Background decoration */}
            <BubbleBgDecoration />
            <div className="flex items-center gap-5">
                <Avatar className="h-12 w-12 rounded-lg border border-primary/50">
                    <AvatarFallback className="rounded-lg bg-white/10 text-white font-bold">
                        VD
                    </AvatarFallback>
                </Avatar>
                <div className="">
                    <p className="font-semibold text-xs text-gray-300">
                        Current Organization
                    </p>
                    <h1 className="font-bold text-2xl text-white">
                        {organization.name}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex flex-col items-center justify-center text-white bg-white/10 rounded-xl p-4">
                    <p className="font-extrabold text-lg">12</p>
                    <p className="text-xs">Members</p>
                </div>
                <div className="flex flex-col items-center justify-center text-white bg-white/10 rounded-xl p-4">
                    <p className="font-extrabold text-lg">2</p>
                    <p className="text-xs">Schedules</p>
                </div>
                <Button
                    size={"sm"}
                    className="bg-white/10 border border-white/50 hover:bg-white/20"
                    onClick={()=>onSwitch()}
                >
                    Switch Org
                </Button>
            </div>
        </div>
    );
}
