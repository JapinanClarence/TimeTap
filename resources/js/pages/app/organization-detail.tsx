import React, { useMemo, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app/app-layout";
import OrganizationStats from "@/features/app/organizations/organization-stats";
import OrganziationHeader from "@/features/app/organizations/organization-header";
import { OrganizationType } from "@/types/organization";
import { NoContent } from "@/features/app/home/no-content";
import LeaveOrgSheet from "@/features/app/organizations/leave-org-sheet";
import Container from "@/components/ui/container";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import EventCard from "@/features/app/home/event-card";
import { UpcomingEventCard } from "@/features/app/home/upcoming-event-card";
import { ScheduleCard } from "@/features/app/event/schedule-card";
import HistoryCard from "@/features/app/history/history-card";
import { EventType } from "@/types/event";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrganizationDetailProps {
    [key: string]: unknown;
    organization: OrganizationType;
    events: {
        title: string;
        location: string;
        start_date: string;
        check_in_time: string;
        is_present: boolean;
        id: string;
    }[];
    joined_at: string;
    stats: {
        total_events: number;
        present: number;
        absent: number;
        rate: number;
    };
}

export default function OrganizationDetail() {
    const { organization, joined_at, stats, events } =
        usePage<OrganizationDetailProps>().props;
    const [showSheet, setShowSheet] = useState(false);
    const [currentTab, setCurrentTab] = useState("all");

    // 2. Helper function to group any array by Month
    const getGroupedData = (dataArray: typeof events) => {
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
            {} as Record<string, typeof events>,
        );
    };

    // 3. Pre-calculate the groups for each tab to keep JSX clean
    const groups = {
        all: useMemo(() => getGroupedData(events), [events]),
        present: useMemo(
            () => getGroupedData(events.filter((h) => h.is_present)),
            [events],
        ),
        absent: useMemo(
            () => getGroupedData(events.filter((h) => !h.is_present)),
            [events],
        ),
    };

    const renderGroupedList = (groupedData: Record<string, typeof events>) => {
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

    const handleLeave = () => {
        router.delete(`/app/organizations/${organization.id}`, {
            onSuccess: () => setShowSheet(false),
        });
    };
    return (
        <AppLayout
            secondaryHeader={true}
            showNav={false}
            title={organization.name}
        >
            <Head title={organization.name} />

            <OrganziationHeader
                id={organization.id}
                name={organization.name}
                image={organization.image}
                members_count={organization.members_count}
                joined_at={joined_at}
                onShowSheet={() => setShowSheet(true)}
            />
            <Container className="xl:px-8 lg:px-8 py-8 space-y-5">
                <div className="border p-5 rounded-xl flex-1 bg-white md:bg-gray-50 shadow-xs animate-fade-up-1">
                    <h4 className="font-semibold ">About</h4>

                    <p className="text-muted-foreground text-pretty">
                        {organization.description}
                    </p>
                </div>

                <div className="gap-5 flex flex-col md:flex-row">
                    <OrganizationStats {...stats} />
                    <div className="flex-1 gap-2 flex flex-col">
                        <h4 className="font-semibold ">Events</h4>
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList variant={"line"}>
                                <TabsTrigger
                                    value="all"
                                    className="w-15   data-[state=active]:text-primary"
                                >
                                    All
                                </TabsTrigger>
                                <TabsTrigger
                                    value="present"
                                    className=" data-[state=active]:text-primary "
                                >
                                    Present
                                </TabsTrigger>
                                <TabsTrigger
                                    value="absent"
                                    className=" data-[state=active]:text-primary"
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
                    </div>
                </div>
                <LeaveOrgSheet
                    open={showSheet}
                    onClose={() => setShowSheet(false)}
                    onLeave={handleLeave}
                />
            </Container>
        </AppLayout>
    );
}
