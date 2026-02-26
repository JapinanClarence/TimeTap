import AdminLayout from "@/layouts/dashboard/AdminLayout";
import React, { useState } from "react";
import { columns, Payment } from "@/features/admin/events/components/columns";
import Form from "@/features/admin/events/components/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@inertiajs/react";

const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
];

export default function Events() {
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleShowForm = () => {
        setShowForm(true);
    };
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
