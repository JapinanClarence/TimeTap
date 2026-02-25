import AdminLayout from "@/layouts/AdminLayout";
import React from "react";
import { Header } from "@/components/ui/header";
import { DataTable } from "@/features/admin/events/components/data-table";
import {columns, Payment} from "@/features/admin/events/components/columns";


const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
]
 

export default function Events() {
   
    return (
        <AdminLayout>
            <div className="flex flex-col p-5">
                <Header>Events</Header>
                <div className="bg-white p-5 border rounded-lg">
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </AdminLayout>
    );
}
