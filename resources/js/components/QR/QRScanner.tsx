import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function QRScanner({
    open,
    onScan,
    onError,
}: {
    open: boolean;
    onScan: (data: string) => void;
    onError: (error: string) => void;
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
    //  const highlightCodeOnCanvas = (detectedCodes, ctx) => {
    // detectedCodes.forEach((detectedCode) => {
    //   const { boundingBox, cornerPoints } = detectedCode;

    //   // Draw bounding box
    //   ctx.strokeStyle = '#00FF00';
    //   ctx.lineWidth = 4;
    //   ctx.strokeRect(
    //     boundingBox.x,
    //     boundingBox.y,
    //     boundingBox.width,
    //     boundingBox.height
    //   );

    //   // Draw corner points
    //   ctx.fillStyle = '#FF0000';
    //   cornerPoints.forEach((point) => {
    //     ctx.beginPath();
    //     ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    //     ctx.fill();
    //   });
    // });
    //   };

    return (
        <div className={`${!open ? "hidden" : ""}`}>
            {open && (
                <Scanner
                    styles={{
                        container: {
                            // backgroundColor: "#000",
                        },
                        video:{
                            // backgroundColor:"#000"
                        }
                    }}
                    onScan={handleScan}
                    onError={handleError}
                    scanDelay={2000}
                    allowMultiple={true}
                    sound={false}
                />
            )}
        </div>
    );
}
