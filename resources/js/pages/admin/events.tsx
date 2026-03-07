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
import { OrganizationType } from "@/types/organization";
import { QRGenerator } from "@/features/admin/events/components/qr-generator";

interface Paginated<T> {
    data: T[];
    links: any[];
    meta: any;
}

interface EventsPageProps {
    [key: string]: unknown;
    events: Paginated<EventType>;
    owned_org: OrganizationType;
}

function EventsTableContent({
    events,
    onStatusChange,
    processingId,
    onGenerateQR,
}: {
    events: Paginated<EventType>;
    onStatusChange: (id: number, status: string) => void;
    processingId: number | null;
    onGenerateQR: (data: EventType) => void;
}) {
    return (
        <DataTable
            columns={columns}
            data={events.data}
            onStatusChange={onStatusChange}
            processingId={processingId}
            onGenerateQR={onGenerateQR}
        />
    );
}

export default function Events() {
    const { props } = usePage<EventsPageProps>();

    const [processingId, setProcessingId] = useState<number | null>(null);
    const [showCard, setShowCard] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({});
    const handleStatusChange = async (id: number, status: string) => {
        router.patch(
            `/admin/events/${id}`,
            {
                status: status,
            },
            {
                showProgress: false,
                // Keeps the user on the same scroll position after the table updates
                preserveScroll: true,
                onBefore: () => setProcessingId(id),
                onFinish: () => setProcessingId(null), // Stop loading
                onSuccess: () => toast.success("Event updated successfully!"),
                onError: (errors) => toast.error("Failed up update event!"),
            },
        );
    };

    const handleShowQRCard = (data: EventType) => {
        setShowCard(true);
        setCurrentEvent({
            id: data.id,
            title:data.title,
            location: data.location,
            start_date: data.start_date,
            end_date: data.end_date,
            start_time: data.start_time,
            end_time: data.end_time,
            org_id: props.owned_org.id
        })
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
                            onGenerateQR={handleShowQRCard}
                        />
                    </Deferred>
                </div>
            </div>
            <QRGenerator
                open={showCard}
                onClose={() => setShowCard(false)}
                data={currentEvent}
            />
        </AdminLayout>
    );
}
