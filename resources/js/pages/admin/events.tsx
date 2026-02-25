import AdminLayout from "@/layouts/dashboard/AdminLayout";
import React, { useState } from "react";
import { Header } from "@/components/ui/header";
import { DataTable } from "@/features/admin/events/components/data-table";
import {columns, Payment} from "@/features/admin/events/components/columns";
import EventForm  from "@/features/admin/events/components/event-form";

const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
]
 

export default function Events() {
   const [showForm, setShowForm] = useState<boolean>(false);

   const handleShowForm = () =>{
    setShowForm(true);
   }
    return (
        <AdminLayout>
            <div className="bg-white min-h-screen flex-1 rounded-xl md:min-h-min flex flex-col p-5">
                <Header>Events</Header>
                <div className="bg-white p-5 border rounded-lg">
                    <DataTable columns={columns} data={data} onAdd={handleShowForm}/>
                </div>
            </div>
            <EventForm
                title="Event Form"
                open={showForm}
                onOpenChange={()=>setShowForm(false)}
            />
        </AdminLayout>
    );
}
