import AdminLayout from "@/layouts/dashboard/AdminLayout";
import { Header } from "@/components/ui/header";
import { DataTable } from "@/features/admin/events/components/data-table";
import { columns } from "@/features/admin/events/components/columns";
import { Deferred, usePage } from "@inertiajs/react";
import { EventType } from "@/types/event";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { route } from "ziggy-js";
import { useState } from "react";

interface Paginated<T> {
    data: T[];
    links: any[];
    meta: any;
}

interface EventsPageProps {
    [key: string]: unknown;
    events: Paginated<EventType>;
}

function EventsTableContent({
    events,
    onStatusChange,
    processingId,
}: {
    events: Paginated<EventType>;
    onStatusChange: (id: number, status: string) => void;
    processingId: number |null;
}) {
    return (
        <DataTable
            columns={columns}
            data={events.data}
            onStatusChange={onStatusChange}
            processingId={processingId}
        />
    );
}

export default function Events() {
    const { props } = usePage<EventsPageProps>();
    const [processingId, setProcessingId] = useState<number | null>(null);

    const handleStatusChange = async (id: number, status: string) => {
        console.log(id, status)
        router.patch(`/admin/events/${id}`,
            {
                status: status,
            },
            {
                // Keeps the user on the same scroll position after the table updates
                preserveScroll: true,
                onBefore: () => setProcessingId(id),
                onFinish: () => setProcessingId(null), // Stop loading
                onSuccess: () => toast.success("Event updated successfully!"),
                onError: (errors) => toast.error("Failed up update event!"),
            },
        );
    };

    return (
        <AdminLayout>
            <div className="bg-white min-h-screen flex-1 rounded-xl md:min-h-min flex flex-col p-5">
                <Header>Events</Header>
                <div className="bg-white p-5 border rounded-lg">
                    <Deferred
                        data={"events"}
                        fallback={<TableSkeleton columns={columns} data={[]} />}
                    >
                        <EventsTableContent
                            events={props.events}
                            onStatusChange={handleStatusChange}
                            processingId={processingId}
                        />
                    </Deferred>
                </div>
            </div>
        </AdminLayout>
    );
}
