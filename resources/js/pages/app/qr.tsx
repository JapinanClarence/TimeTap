import { QRScanner } from "@/features/app/QR/QRScanner";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app/app-layout";
import { ScanQrCode, Upload } from "lucide-react";
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

interface QRPageProps {
    [key: string]: unknown;
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function QR() {
    const { props } = usePage<QRPageProps>();
    const devices = useDevices();
    const [selectedDevice, setSelectedDevice] = useState<any>(null);
    const handleScan = (data: any) => {
        // console.log(data[0].rawValue)
        router.post(
            "/attendance/record",
            {
                qr_data: data[0].rawValue,
            },
        );
    };

    const handleError = (error: any) => {
        console.log(error);
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
        <AppLayout showHeader={false}>
            <div className="relative">
                <QRScanner
                    open={true}
                    onError={handleError}
                    onScan={handleScan}
                    device={selectedDevice}
                />
                {/* <div className="absolute top-[70%] w-full flex justify-evenly">
                    <Button
                        size={"lg"}
                        onClick={() => console.log("Upload QR")}
                    >
                        <Upload /> Upload QR
                    </Button>

                </div> */}
            </div>
        </AppLayout>
    );
}
