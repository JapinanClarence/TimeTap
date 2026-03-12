import { Calendar, Clock, Users, UserSquare2 } from "lucide-react";
import React from "react";

export default function QuickActions() {
    return (
        <div className=" bg-white border border-border rounded-2xl p-5 flex flex-col gap-3 hover-card transition-all duration-200">
            <h2 className="font-display font-bold text-sm text-ink">
                Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3 flex-1">
                <button className=" flex flex-col items-center justify-center gap-2 py-5 rounded-xl border border-border text-ink-soft text-[12px] font-semibold hover:text-primary hover:bg-primary/10 transition-all duration-150 cursor-pointer bg-primary/5">
                    <Clock size={22} />
                    View History
                </button>
                <button className=" flex flex-col items-center justify-center gap-2 py-5 rounded-xl border border-border text-ink-soft text-[12px] font-semibold hover:text-primary hover:bg-primary/10 transition-all duration-150 cursor-pointer bg-primary/5">
                    <UserSquare2 size={22} />
                    My ID
                </button>
                <button className=" flex flex-col items-center justify-center gap-2 py-5 rounded-xl border border-border text-ink-soft text-[12px] font-semibold hover:text-primary hover:bg-primary/10 transition-all duration-150 cursor-pointer bg-primary/5">
                    <Calendar size={22} />
                    Events
                </button>
                <button className=" flex flex-col items-center justify-center gap-2 py-5 rounded-xl border border-border text-ink-soft text-[12px] font-semibold hover:text-primary hover:bg-primary/10 transition-all duration-150 cursor-pointer bg-primary/5">
                    <Users size={22} />
                    Team
                </button>
            </div>
        </div>
    );
}
