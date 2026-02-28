import AdminLayout from "@/layouts/dashboard/AdminLayout";
import React, { useState } from "react";
import Form from "@/features/admin/events/components/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function AddEvent() {
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
                    <Form />
                </div>
            </div>
        </AdminLayout>
    );
}
