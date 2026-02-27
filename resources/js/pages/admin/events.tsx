import AdminLayout from "@/layouts/dashboard/AdminLayout";
import { Header } from "@/components/ui/header";
import { DataTable } from "@/features/admin/events/components/data-table";
import { columns } from "@/features/admin/events/components/columns";
import { Deferred, usePage } from "@inertiajs/react";
import { EventType } from "@/types/event";
import { TableSkeleton } from "@/components/ui/table-skeleton";

interface Paginated<T> {
    data: T[];
    links: any[];
    meta: any;
}

interface EventsPageProps {
    [key: string]: unknown;
    events: Paginated<EventType>;
}

function EventsTableContent({ events }: { events: Paginated<EventType> }) {
    return <DataTable columns={columns} data={events.data} />;
}

export default function Events() {
    const { props } = usePage<EventsPageProps>();

    // Check if events data is available
    // if (!props.events || !props.events.data) {
    //     return (
    //         <AdminLayout>
    //             <div className="bg-white min-h-screen flex-1 rounded-xl md:min-h-min flex flex-col p-5">
    //                 <Header>Events</Header>
    //                 <div className="bg-white p-5 border rounded-lg">
    //                     <TableSkeleton columns={columns} data={[]} />
    //                 </div>
    //             </div>
    //         </AdminLayout>
    //     );
    // }

    return (
        <AdminLayout>
            <div className="bg-white min-h-screen flex-1 rounded-xl md:min-h-min flex flex-col p-5">
                <Header>Events</Header>
                <div className="bg-white p-5 border rounded-lg">
                    <Deferred data={"events"} fallback={<TableSkeleton columns={columns} data={[]}/>}>
                        <EventsTableContent events={props.events} />
                    </Deferred>
                </div>
            </div>
        </AdminLayout>
    );
}
