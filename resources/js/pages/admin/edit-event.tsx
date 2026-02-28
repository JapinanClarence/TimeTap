import AdminLayout from "@/layouts/dashboard/AdminLayout";
import React, { useState } from "react";
import Form from "@/features/admin/events/components/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { EventType } from "@/types/event";

interface EventResourceResponse {
    data: EventType; // The 'data' wrapper from Laravel
}

interface EventsPageProps {
    [key: string]: unknown;
    event: EventResourceResponse;
}

export default function EditEvent() {
    const { props } = usePage<EventsPageProps>();

    return (
        <AdminLayout>
            <div className="bg-white min-h-screen flex-1 rounded-xl md:min-h-min flex flex-col p-5">
                <div className="mb-5">
                    <Link href={"/admin/events"}>
                        <Button variant={"outline"}>
                            <ArrowLeft /> Back
                        </Button>
                    </Link>
                </div>
                <div className="bg-white p-5 border rounded-lg">
                    <Form
                        method="edit"
                        event_data={{
                            title: props.event.data.title,
                            description: props.event.data.description,
                            location: props.event.data.location,
                            start_date: props.event.data.start_date,
                            end_date: props.event.data.end_date,
                            start_time: props.event.data.start_time,
                            end_time: props.event.data.end_time,
                            coordinates: props.event.data.coordinates,
                            id: props.event.data.id,
                        }}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
