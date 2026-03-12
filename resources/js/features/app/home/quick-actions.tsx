import { Link } from "@inertiajs/react";
import { Calendar, Clock, Users, UserSquare2 } from "lucide-react";
import React from "react";

export default function QuickActions() {
    return (
        <div className=" bg-white border border-border rounded-2xl p-5 flex flex-col gap-3 hover-card transition-all duration-200">
            <h2 className="font-display font-bold text-sm text-ink">
                Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3 flex-1">
                <Link   className=" flex flex-col items-center justify-center gap-2 py-5 rounded-xl border border-border text-muted-foreground text-[12px] font-semibold hover:text-primary hover:bg-primary/10 transition-all duration-150 cursor-pointer bg-primary/5">
                    <Clock size={22} />
                    View History
                </Link>
                <Link className=" flex flex-col items-center justify-center gap-2 py-5 rounded-xl border border-border text-muted-foreground text-[12px] font-semibold hover:text-primary hover:bg-primary/10 transition-all duration-150 cursor-pointer bg-primary/5">
                    <UserSquare2 size={22} />
                    My ID
                </Link>
                <Link href={"/app/schedule"} className=" flex flex-col items-center justify-center gap-2 py-5 rounded-xl border border-border text-muted-foreground text-[12px] font-semibold hover:text-primary hover:bg-primary/10 transition-all duration-150 cursor-pointer bg-primary/5">
                    <Calendar size={22} />
                    Events
                </Link>
                <Link href={"/app/organizations"} className=" flex flex-col items-center justify-center gap-2 py-5 rounded-xl border border-border text-muted-foreground text-[12px] font-semibold hover:text-primary hover:bg-primary/10 transition-all duration-150 cursor-pointer bg-primary/5">
                    <Users size={22} />
                    Team
                </Link>
            </div>
        </div>
    );
}
