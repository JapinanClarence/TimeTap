import React from "react";
import QRCode from "react-qr-code";

export function QRGenerator({ data, type }: { data: any, type: "user" | "event" }) {
    return (
        <div className="p-2 bg-white rounded-lg border">
            <QRCode
                className=""
                size={150}
                style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                    margin: "0px auto",
                }}
                value={JSON.stringify({
                    type: "user",
                    id: data.id,
                })}
                viewBox={`0 0 256 256`}
            />
        </div>
    );
}
