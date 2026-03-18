import { QRScanner } from "@/components/ui/qr-scanner";
import { useDevices } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface QrScannerModalProps {
    open: boolean;
    onClose: () => void;
}

export default function QrScannerModal({ open, onClose }: QrScannerModalProps) {
    const devices = useDevices();
    const [selectedDevice, setSelectedDevice] = useState<any>(null);

    const handleScan = (data: any) => {
        router.post("/attendance/record", {
            qr_data: data[0].rawValue,
        });
    };

    const handleError = (error: any) => {
        console.log(error);
    };

    return (
        <div
            className={`
    ${open ? "flex" : "hidden"} 
    fixed z-100 bg-white overflow-clip
    
    /* Mobile: Full Screen */
    top-0 left-0 w-full h-full 
    
    /* Medium+ Screens: Centered Modal Style */
    md:top-1/2 md:left-1/2 md:w-125 md:h-125 
    md:-translate-x-1/2 md:-translate-y-1/2 
    md:rounded-2xl md:shadow-2xl md:border
  `}
        >
            <Button
                onClick={onClose}
                className="absolute right-3 top-3 z-200 border border-white/20 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 text-white"
                size="sm"
            >
                <X className="size-4 mr-1" /> Close
            </Button>

            <div className="relative w-full h-full">
                <QRScanner
                    device={selectedDevice}
                    open={open}
                    onScan={handleScan}
                    onError={handleError}
                />
            </div>
        </div>
    );
}
