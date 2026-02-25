import QRScanner from "@/components/app/QR/QRScanner";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app/AppLayout";
import { ScanQrCode, Upload } from "lucide-react";
import React from "react";

export default function QR() {
    return (
        <AppLayout showHeader={false}>
            <div className="relative">
                <QRScanner
                    open={true}
                    onError={(error) => console.log(error)}
                    onScan={(data) => console.log(data)}
                />
                <div className="absolute top-[70%] w-full flex justify-evenly">
                    <Button
                        size={"lg"}
                        onClick={() => console.log("Upload QR")}
                    >
                        <Upload /> Upload QR
                    </Button>
                    <Button
                        size={"lg"}
                        onClick={() => console.log("Generate QR")}
                    >
                        <ScanQrCode /> Generate QR
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
