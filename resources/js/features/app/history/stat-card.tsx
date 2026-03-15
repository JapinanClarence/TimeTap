import { Calendar, Check, X } from "lucide-react";

interface StatCardProps{
    presentCount:number;
    absentCount:number;
    totalEvents:number;
}

export default function StatCard({presentCount, absentCount, totalEvents}: StatCardProps) {
    return (
        <div className=" grid grid-cols-3 gap-2 animate-fade-up">
            <div className="border border-green-500 bg-green-100 text-green-500 flex flex-col justify-center items-center px-2 py-1.5 rounded-xl shadow-xs hover-card">
                <Check className="size-4" />
                <span className="">{presentCount}</span>
                <span className="text-xs">Present</span>
            </div>
            <div className="border bg-white text-destructive flex flex-col justify-center items-center px-2 py-1.5 rounded-xl shadow-xs hover-card">
                <X className="size-4" />
                <span className="">{absentCount}</span>
                <span className="text-xs text-muted-foreground">Absent</span>
            </div>
            <div className="border bg-white text-muted-foreground flex flex-col justify-center items-center px-2 py-1.5 rounded-xl shadow-xs hover-card">
                <Calendar className="size-4" />
                <span className="">{totalEvents}</span>
                <span className="text-xs">Events</span>
            </div>
        </div>
    );
}
