import { QRScanner } from "@/components/ui/qr-scanner";
import AppLayout from "@/layouts/app/app-layout";
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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface QRPageProps {
    [key: string]: unknown;
    flash: {
        success: string | null;
        error: string | null;
    };
}

interface QrScannerModalProps {
    open: boolean;
    onClose: () => void;
}

export default function QrScannerModal({ open, onClose }: QrScannerModalProps) {
    const { props } = usePage<QRPageProps>();
    const devices = useDevices();
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false); // 1. Add loading state

    const handleScan = (data: any) => {
        // Check if already processing a request
        if (isProcessing || !data?.[0]?.rawValue) return;

        setIsProcessing(true); // 3. Lock the scanner

        router.post(
            "/attendance/record",
            {
                qr_data: data[0].rawValue,
            },
            {
                
                //  Reset the lock when the request finishes
                onFinish: () => {
                    // delay so it doesn't instantly re-scan
                    setTimeout(() => setIsProcessing(false), 2000);
                },
                onError: () => setIsProcessing(false),
            },
        );
    };

    const handleError = (error: any) => {
        console.log(error);
        setIsProcessing(false);
    };

    useEffect(() => {
        // Check if flash exists AND if success has a value
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }

        if (props.flash?.error) {
            toast.error(props.flash.error);
        }
    }, [props.flash]);
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
