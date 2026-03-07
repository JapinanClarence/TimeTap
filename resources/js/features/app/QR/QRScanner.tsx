import React, { useState } from "react";
import { Scanner, useDevices } from "@yudiel/react-qr-scanner";


export function QRScanner({
    open,
    onScan,
    onError,
    device,
}: {
    open: boolean;
    onScan: (data: string) => void;
    onError: (error: string) => void;
    device:string;
}) {
    
    const [scanSuccess, setScanSuccess] = useState(false);

    const handleScan = (data: any) => {
        if (data) {
            setScanSuccess(true);
            onScan(data);
        }
    };

    const handleError = (error: any) => {
        setScanSuccess(false);
        onError(error);
    };

    return (
        <div className={`${!open ? "hidden" : ""}`}>
            
            <Scanner
                styles={{
                    container: {
                        // backgroundColor: "#000",
                    },
                    video: {
                        // backgroundColor:"#000"
                    },
                }}
                constraints={{
                    deviceId: device,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                }}
                onScan={handleScan}
                onError={handleError}
                scanDelay={2000}
                allowMultiple={false}
                sound={false}
            />
        </div>
    );
}
