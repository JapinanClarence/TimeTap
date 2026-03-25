import AdminLayout from "@/layouts/dashboard/admin-layout";
import AnalyticsGrid from "@/features/admin/dashboard/components/analytics-grid";
import { AttendanceOverTime } from "@/features/admin/dashboard/components/attendance-over-time-chart";
import { AttendanceDistribution } from "@/features/admin/dashboard/components/attendance-distribution-chart";
import { DataTable } from "@/features/admin/dashboard/components/data-table";
import {
    columns,
    EventColumn,
} from "@/features/admin/dashboard/components/columns";
import { usePage } from "@inertiajs/react";

interface DashboardProps {
    [key: string]: unknown;
    stats: {
        active_events: number;
        attendance_rate: number;
        peak_time: string;
        breach_rate: number;
        attendance_change: string;
    };
    attendance_distribution: {
        method: string;
        count: number;
    }[];
    attendance_chart: {
        day: string;
        count: number;
    }[];
    top_events:EventColumn[]
}

export default function Dashboard() {
    const { stats, attendance_distribution, attendance_chart, top_events } =
        usePage<DashboardProps>().props;
    console.log(stats);
    return (
        <AdminLayout>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 px-6 md:gap-6 md:py-6">
                        <AnalyticsGrid {...stats} />
                        <div className="grid gap-5 col-span-1 md:grid-cols-3 animate-fade-up-1">
                            <div className="md:col-span-2">
                                <AttendanceOverTime data={attendance_chart}/>
                            </div>
                            <div className="">
                                <AttendanceDistribution
                                    data={attendance_distribution}
                                />
                            </div>
                        </div>
                        <div className="animate-fade-up-2 space-y-4">
                            <DataTable columns={columns} data={top_events} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
