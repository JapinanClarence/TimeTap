import React from "react";

import { Bell, Building2, Calendar, Home, ScanQrCode, User } from "lucide-react";
import { Link } from "@inertiajs/react";
export default function DesktopNav() {
    return (
        <div className="flex relative  h-12 py-1">
            <div className="w-20 relative lg:w-32 rounded-lg hover:bg-muted py-1 flex items-center justify-center flex-col text-primary">
                <Home className=" text-primary" />
                <div className="absolute border rounded-full border-primary -bottom-1 w-full">

                </div>
            </div>
            <div className="w-20  lg:w-32 rounded-lg hover:bg-muted py-1 flex items-center justify-center flex-col text-muted-foreground">
                <Calendar className=" " />
            </div>
            <div className="w-20  lg:w-32 rounded-lg hover:bg-muted py-1 flex items-center justify-center flex-col text-muted-foreground">
                <Building2 className=" " />
            </div>
            <div className="w-20  lg:w-32 rounded-lg hover:bg-muted py-1 flex items-center justify-center flex-col text-muted-foreground">
                <ScanQrCode className=" " />
            </div>
        </div>
    );
}
