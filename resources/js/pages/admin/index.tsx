import AdminLayout from "@/layouts/dashboard/AdminLayout";
import React from "react";
import { SectionCards } from "@/features/admin/dashboard/components/section-cards";
import { ChartAreaInteractive } from "@/features/admin/dashboard/components/chat-area-interactive";

export default function Dashboard() {
    return (
        <AdminLayout>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <SectionCards />
                        <div className="px-4 lg:px-6">
                            <ChartAreaInteractive />
                        </div>
                        {/* <DataTable data={data} /> */}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
