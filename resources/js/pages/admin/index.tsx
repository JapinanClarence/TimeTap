import AdminLayout from "@/layouts/dashboard/admin-layout";
import AnalyticsGrid from "@/features/admin/dashboard/components/analytics-grid";
import { AttendanceOverTime } from "@/features/admin/dashboard/components/attendance-over-time-chart";
import { AttendanceDistribution } from "@/features/admin/dashboard/components/attendance-distribution-chart";
import { DataTable } from "@/features/admin/dashboard/components/data-table";
import { columns, EventColumn } from "@/features/admin/dashboard/components/columns";
import { usePage } from "@inertiajs/react";


const data: EventColumn[] = [
    {
        id: " 1",
        title: "Cover page",
        location: "Cover page",
        status: "active",
        start_date: "18",
        end_date: "5",
        start_time: "12:00:00",
        end_time: "01:00:00",
        attendees: 6,
    },
    {
        id: "2",
        title: "Table of contents",
        location: "Table of contents",
        status: "inactive",
        start_date: "29",
        end_date: "24",
        start_time: "10:00:00",
        end_time: "12:00:00",
        attendees: 5
    },
];

interface DashboardProps{
    [key: string]: unknown;
    stats: {
        active_events: number;
        attendance_rate: number;
        peak_time: string;
        breach_rate: number;
        attendance_change: string;
    }, 
    attendance_distribution:{
        method:string;
        count: number;
    }[]
}

export default function Dashboard() {
    const {stats, attendance_distribution} = usePage<DashboardProps>().props;
 
    return (
        <AdminLayout>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 px-6 md:gap-6 md:py-6">
                        <AnalyticsGrid {...stats}/>
                        <div className="grid gap-5 col-span-1 md:grid-cols-3 animate-fade-up-1">
                            <div className="md:col-span-2">
                                <AttendanceOverTime />
                            </div>
                            <div className="">
                                <AttendanceDistribution data={attendance_distribution}/>
                            </div>
                        </div>
                        <div className="animate-fade-up-2 space-y-4">
                            <DataTable columns={columns} data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
