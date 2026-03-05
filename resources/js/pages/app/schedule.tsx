import React from "react";

import { Calendar } from "@/components/ui/calendar";
import AppLayout from "@/layouts/app/AppLayout";
import Container from "@/components/ui/container";
export default function Schedule() {
    return (
        <AppLayout showHeader={false}>
            <Container className="flex items-center justify-center h-full">
                <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    className="rounded-lg border w-full"
                />
            </Container>
        </AppLayout>
    );
}
