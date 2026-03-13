import React, { useCallback, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { formatSimpleDate, formatTime12h } from "@/util/dateUtil";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Download, MapPin } from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import { toPng } from "html-to-image";
import { Separator } from "@/components/ui/separator";

interface QRGeneratorProps {
    data: any;
    open: boolean;
    onClose: () => void;
}

export function QRGenerator({ open, onClose, data }: QRGeneratorProps) {
    if(!data || !data.title) return;
    const downloadRef = useRef<HTMLDivElement>(null);

    const title = data?.title.replaceAll(" ", "_");
    const handleDownload = useCallback(() => {
        if (downloadRef.current === null) {
            return;
        }
       
        toPng(downloadRef.current, {
            cacheBust: true,
            filter: (node) => !node.classList?.contains("download-button-hide"),
        })
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = `${title}_QR.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [downloadRef]);
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="md:max-w-lg overflow-hidden">
                <VisuallyHidden.Root>
                    <DialogHeader>
                        <DialogTitle>QR Code</DialogTitle>
                        <DialogDescription>Event QR Details</DialogDescription>
                    </DialogHeader>
                </VisuallyHidden.Root>

                {/* This is the area we capture */}
                <div
                    // ref={downloadRef}
                    // id="qr-download-area"
                    className="flex flex-row gap-4 p-2 bg-white"
                >
                    <div   ref={downloadRef} id="qr-download-area" className="w-60  shrink-0 rounded-lg  border bg-white p-2">
                        <QRCode
                            size={150}
                            style={{
                                height: "auto",
                                maxWidth: "100%",
                                width: "100%",
                            }}
                            value={JSON.stringify({
                                type: "event",
                                id: data.id,
                            })}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    <Separator orientation="vertical"/>
                    <div className="flex flex-col flex-1 relative">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold">{data.title}</h2>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <span className="p-1.5 rounded-full bg-primary/10">
                                    <Calendar className="w-3.5 h-3.5 text-primary" />
                                </span>
                                <div>
                                    <p className="text-[10px] uppercase text-muted-foreground font-bold leading-none">
                                        Date
                                    </p>
                                    <p className="text-sm font-medium">
                                        {formatSimpleDate(data.start_date)}
                                    </p>
                                </div>
                            </div>

                            {data.location && (
                                <div className="flex items-start gap-3">
                                    <span className="p-1.5 rounded-full bg-primary/10">
                                        <MapPin className="w-3.5 h-3.5 text-primary" />
                                    </span>
                                    <div>
                                        <p className="text-[10px] uppercase text-muted-foreground font-bold leading-none">
                                            Location
                                        </p>
                                        <p className="text-sm font-medium">
                                            {data.location}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <span className="p-1.5 rounded-full bg-primary/10">
                                    <Clock className="w-3.5 h-3.5 text-primary" />
                                </span>
                                <div>
                                    <p className="text-[10px] uppercase text-muted-foreground font-bold leading-none">
                                        Time
                                    </p>
                                    <p className="text-sm font-medium">
                                        {data.start_time &&
                                            formatTime12h(data.start_time)}{" "}
                                        -{" "}
                                        {data.end_time &&
                                            formatTime12h(data.end_time)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Button hidden during download via class name logic in onclone */}
                        <div className="mt-6 flex justify-end download-button-hide">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDownload}
                            >
                                <Download className="w-4 h-4 mr-2" /> Download
                                Image
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
