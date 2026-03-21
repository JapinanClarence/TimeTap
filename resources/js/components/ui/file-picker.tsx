import { useIsMobile } from "@/hooks/use-mobile";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { X, Upload, Loader2 } from "lucide-react";
import { ImageResizer } from "./image-resizer";

interface FilePickerProps {
    open: boolean;
    onClose: () => void;
    onFileSelect: (file: File) => void;
    currentImage?: string;
    isLoading?: boolean;
}

export const FilePicker = ({
    open,
    onClose,
    onFileSelect,
    currentImage,
    isLoading,
}: FilePickerProps) => {
    const isMobile = useIsMobile();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isCropping, setIsCropping] = useState(false);
    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

    useEffect(() => {
        if (!open) {
            setSelectedFile(null);
            setError(null);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    }, [open]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            setError("File size must be less than 1MB.");
            return;
        }

        setError(null);
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setIsCropping(true);
    };

    const handleFinalCrop = (croppedFile: File) => {
        setSelectedFile(croppedFile);
        setPreviewUrl(URL.createObjectURL(croppedFile));
        setIsCropping(false); // Go back to the preview/save screen
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            {/* Modal Container */}
            <div
                className={`
                bg-white flex flex-col overflow-hidden shadow-2xl transition-all
                ${isMobile ? "w-full h-full" : "w-full max-w-sm h-[500px] rounded-2xl"}
            `}
            >
                {isCropping && previewUrl ? (
                    <ImageResizer
                        image={previewUrl}
                        onCropComplete={handleFinalCrop}
                    />
                ) : (
                    <>
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h2 className="text-lg font-bold text-slate-800">
                                Preview Photo
                            </h2>
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="p-1 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
                            >
                                <X className="size-6 text-slate-500" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center  bg-slate-50/50">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            <div
                                onClick={() =>
                                    !isLoading && fileInputRef.current?.click()
                                }
                                className={`
                            relative w-full aspect-square 
                            flex flex-col items-center justify-center cursor-pointer overflow-hidden
                            transition-all duration-200 group
                            
                            ${isLoading ? "cursor-not-allowed opacity-80" : ""}
                        `}
                            >
                                {previewUrl || currentImage ? (
                                    <img
                                        src={previewUrl || currentImage}
                                        className="w-full h-full object-cover"
                                        alt="Preview"
                                    />
                                ) : (
                                    <div
                                        className={`p-10 flex flex-col items-center border-2 border-dashed rounded-2xl  text-slate-400
                                            ${error ? "border-red-400 bg-red-50" : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/30"}
                                            `}
                                    >
                                        <Upload className="size-10 mb-3 opacity-40 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-medium">
                                            Click to select photo
                                        </span>
                                    </div>
                                )}

                                {/* Overlay on hover for existing image */}
                                {(previewUrl || currentImage) && !isLoading && (
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <span className="bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-slate-700">
                                            Change
                                        </span>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <p className="mt-4 text-sm text-red-600 font-semibold text-center">
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex gap-2 p-6 border-t bg-white space-y-3">
                            <Button
                                variant={"outline"}
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isLoading}
                                className="flex-1"
                                size={"lg"}
                            >
                                {selectedFile
                                    ? "Choose different image"
                                    : "Cancel"}
                            </Button>
                            <Button
                                onClick={() =>
                                    selectedFile && onFileSelect(selectedFile)
                                }
                                disabled={!selectedFile || isLoading}
                                size={"lg"}
                                className="flex-1"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="size-5 animate-spin" />
                                        <span>Uploading...</span>
                                    </div>
                                ) : (
                                    "Save Profile"
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
