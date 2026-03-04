import React from "react";

import { Bell, Building2, Calendar, Home, ScanQrCode, User } from "lucide-react";
import { Link } from "@inertiajs/react";
export default function DesktopNav() {
    return (
        <div className="flex relative  h-12 py-1">
            <div className="w-20 relative lg:w-32 rounded-lg hover:bg-primary/10 py-1 flex items-center justify-center flex-col text-primary">
                <Home className=" text-primary" />
                <div className="absolute border rounded-full border-primary -bottom-1 w-full">

                </div>
            </div>
            <div className="w-20  lg:w-32 rounded-lg hover:bg-primary/10 py-1 flex items-center justify-center flex-col text-primary">
                <Calendar className=" text-primary/60" />
            </div>
            <div className="w-20  lg:w-32 rounded-lg hover:bg-primary/10 py-1 flex items-center justify-center flex-col text-primary">
                <Building2 className=" text-primary/60" />
            </div>
            <div className="w-20  lg:w-32 rounded-lg hover:bg-primary/10 py-1 flex items-center justify-center flex-col text-primary">
                <ScanQrCode className=" text-primary/60" />
            </div>
        </div>
    );
}
