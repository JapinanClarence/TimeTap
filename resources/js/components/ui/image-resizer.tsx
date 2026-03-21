import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { Button } from "./button";
import { Slider } from "@/components/ui/slider"; // Or a basic <input type="range" />
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageResizerProps {
    image: string; // The previewUrl from your FilePicker
    onCropComplete: (croppedFile: File) => void;
}

export const ImageResizer = ({ image, onCropComplete }: ImageResizerProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null,
    );

    const onCropChange = (crop: { x: number; y: number }) => setCrop(crop);

    const onCropCompleteInternal = useCallback((_: Area, pixels: Area) => {
        setCroppedAreaPixels(pixels);
    }, []);
    const generateCroppedImage = async () => {
        if (!croppedAreaPixels || !image) return;

        const canvas = document.createElement("canvas");
        const img = new Image();
        img.src = image;

        await new Promise((resolve) => (img.onload = resolve));

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas to a standard 1:1 size (e.g., 500x500) for high quality
        canvas.width = 500;
        canvas.height = 500;

        ctx.drawImage(
            img,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            500,
            500,
        );

        canvas.toBlob(
            (blob) => {
                if (blob) {
                    const uniqueId = Math.random().toString(36).substring(2, 6);
                    const fileName = `profile_${Date.now()}_${uniqueId}.jpg`;
                    const file = new File([blob], fileName, {
                        type: "image/jpeg",
                    });
                    onCropComplete(file);
                }
            },
            "image/jpeg",
            0.9,
        );
    };

    return (
        <div className="flex flex-col w-full h-full">
            {/* Cropper Container */}
            <div className="relative flex-1 w-full min-h-[300px] bg-slate-900 overflow-hidden">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round" // This adds your circular guide overlay
                    showGrid={false}
                    onCropChange={onCropChange}
                    onCropComplete={onCropCompleteInternal}
                    onZoomChange={setZoom}
                />
            </div>

            {/* Controls */}
            <div className="p-4 bg-white border-t space-y-4">
                <div className="flex items-center gap-4">
                    <ZoomOut className="size-4 text-slate-400" />
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4F6EF7]"
                    />
                    <ZoomIn className="size-4 text-slate-400" />
                </div>

                <Button
                    onClick={generateCroppedImage}
                    className="w-full bg-[#4F6EF7] hover:bg-[#435ecb] font-bold"
                >
                    Apply Crop
                </Button>
            </div>
        </div>
    );
};
