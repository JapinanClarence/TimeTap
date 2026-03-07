import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { formatSimpleDate, formatTime12h } from "@/util/dateUtil";

interface QRGeneratorProps {
    data: any;
    open: boolean;
    onClose: () => void;
}

export function QRGenerator({ open, onClose, data }: QRGeneratorProps) {
    console.log(data)
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-75">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="w-75 rounded-lg border border-timetap-border bg-timetap-background p-5 shadow-md">
                    <div className="w-full rounded-lg bg-white">
                      
                    </div>
                    <h1 className="mt-1 text-sm font-bold text-slate-500">
                        {data.title}
                    </h1>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                        {formatSimpleDate(data.start_date)} {formatTime12h(data.start_time)} - {formatTime12h(data.end_time)}
                    </p>
                    <div className="mt-2 space-y-2 text-sm font-medium text-slate-500">
                        {data.location}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
