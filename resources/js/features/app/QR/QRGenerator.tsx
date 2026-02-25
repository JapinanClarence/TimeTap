import React from "react";
import QRCode from "react-qr-code";
export  function QRGenerator() {
    return (
        <div>
            <QRCode
                className=""
                size={150}
                style={{
                    height: "auto",
                    maxWidth: "100%",
                    width: "100%",
                    margin: "0px auto",
                }}
                value={"Test"}
                viewBox={`0 0 256 256`}
            />
        </div>
    );
}
