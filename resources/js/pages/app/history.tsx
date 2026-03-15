import Container from "@/components/ui/container";
import { Progress } from "@/components/ui/progress";
import HistoryCard from "@/features/app/history/history-card";
import { NoContent } from "@/features/app/home/no-content";
import AppLayout from "@/layouts/app/app-layout";
import { usePage } from "@inertiajs/react";
import { Calendar, ChartLine, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import AttendanceStats from "@/features/app/history/attendance-stats";
import StatCard from "@/features/app/history/stat-card";

interface HistoryPageProps {
    history: {
        title: string;
        location: string;
        start_date: string;
        check_in_time: string;
        is_present: boolean;
        id: string;
    }[];
    [key: string]: unknown;
}

export default function History() {
    const { history } = usePage<HistoryPageProps>().props;
    const [activeTab, setActiveTab] = useState("all");

    // 1. Calculate Stats (Total, Present, Absent, Rate)
    const totalEvents = history.length;
    const presentCount = history.filter((h) => h.is_present).length;
    const absentCount = totalEvents - presentCount;
    const rate =
        totalEvents > 0 ? Math.round((presentCount / totalEvents) * 100) : 0;

    // 2. Helper function to group any array by Month
    const getGroupedData = (dataArray: typeof history) => {
        return dataArray.reduce(
            (acc, item) => {
                const date = new Date(item.start_date);
                const monthLabel = date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                });
                if (!acc[monthLabel]) acc[monthLabel] = [];
                acc[monthLabel].push(item);
                return acc;
            },
            {} as Record<string, typeof history>,
        );
    };

    // 3. Pre-calculate the groups for each tab to keep JSX clean
    const groups = {
        all: useMemo(() => getGroupedData(history), [history]),
        present: useMemo(
            () => getGroupedData(history.filter((h) => h.is_present)),
            [history],
        ),
        absent: useMemo(
            () => getGroupedData(history.filter((h) => !h.is_present)),
            [history],
        ),
    };

    const renderGroupedList = (groupedData: Record<string, typeof history>) => {
        const monthKeys = Object.keys(groupedData);
        if (monthKeys.length === 0) return <NoContent className="py-10" />;

        return (
            <div className="space-y-6">
                {monthKeys.map((month) => (
                    <div key={month} className="space-y-3">
                        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] px-1">
                            {month}
                        </h3>
                        <div className="space-y-2">
                            {groupedData[month].map((data) => (
                                <HistoryCard key={data.id} {...data} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    return (
        <AppLayout secondaryHeader={true} title="History" showNav={false}>
            <Container className="mt-5 space-y-5">
                <StatCard
                    absentCount={absentCount}
                    presentCount={presentCount}
                    totalEvents={totalEvents}
                />
                {totalEvents > 0 && <AttendanceStats rate={rate} />}

                <Tabs className="animate-fade-up-2" defaultValue="all">
                    <TabsList className="bg-gray-200/80">
                        <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-white data-[state=active]:text-foreground text-sm"
                        >
                            All
                        </TabsTrigger>
                        <TabsTrigger
                            value="present"
                            className="data-[state=active]:bg-white data-[state=active]:text-foreground text-sm"
                        >
                            Present
                        </TabsTrigger>
                        <TabsTrigger
                            value="absent"
                            className="data-[state=active]:bg-white data-[state=active]:text-foreground text-sm"
                        >
                            Absent
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-0">
                        {renderGroupedList(groups.all)}
                    </TabsContent>

                    <TabsContent value="present" className="mt-0">
                        {renderGroupedList(groups.present)}
                    </TabsContent>

                    <TabsContent value="absent" className="mt-0">
                        {renderGroupedList(groups.absent)}
                    </TabsContent>
                </Tabs>
            </Container>
        </AppLayout>
    );
}
