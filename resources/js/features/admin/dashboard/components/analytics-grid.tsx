import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Zap, MapPinOff } from "lucide-react";

export default function AnalyticsGrid({
    active_events,
    attendance_rate,
    peak_time,
    breach_rate,
    attendance_change
}: {
    active_events: number;
    attendance_rate: number;
    peak_time: string;
    breach_rate: number;
    attendance_change: string;
}) {
    const stats = [
        {
            title: "Total Active Events",
            value: active_events,
            description: "Total events created",
            icon: Activity,
            color: "text-blue-600",
        },
        {
            title: "Total Attendance Rate",
            value: `${attendance_rate}%`,
            description: attendance_change,
            icon: Users,
            color: "text-green-600",
        },
        {
            title: "Peak Attendance Time",
            value: peak_time,
            description: "Most check-ins recorded",
            icon: Zap,
            color: "text-yellow-600",
        },
        {
            title: "Geofence Breach Rate",
            value: `${breach_rate}%`,
            description: "Out-of-bounds attempts",
            icon: MapPinOff,
            color: "text-destructive",
        },
    ];

    return (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 animate-fade-up">
            {stats.map((stat) => (
                <Card key={stat.title} className="shadow-sm hover-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
