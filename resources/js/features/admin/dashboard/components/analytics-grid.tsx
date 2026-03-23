import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Zap, MapPinOff } from "lucide-react";

export default function AnalyticsGrid() {
    const stats = [
        {
            title: "Total Active Events",
            value: "12",
            description: "Currently open for check-in",
            icon: Activity,
            color: "text-blue-600",
        },
        {
            title: "Total Attendance Rate",
            value: "88.4%",
            description: "+2.1% from last month",
            icon: Users,
            color: "text-green-600",
        },
        {
            title: "Peak Attendance Time",
            value: "10:15 AM",
            description: "Most check-ins recorded",
            icon: Zap,
            color: "text-yellow-600",
        },
        {
            title: "Geofence Breach Rate",
            value: "4.2%",
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