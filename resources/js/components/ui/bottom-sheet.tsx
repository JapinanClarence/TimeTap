import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export default function BottomSheet({ 
    isOpen, 
    onClose, 
    children, 
    title,
    className 
}: CustomSheetProps) {
    const sheetRef = useRef<HTMLDivElement>(null);

    // Handle Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={sheetRef}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className={cn(
                        "fixed bottom-0 left-0 right-0 z-[100]",
                        "bg-white border-t rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.12)]",
                        "max-h-[90vh] overflow-y-auto",
                        className
                    )}
                >
                    {/* Header with Close Button */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <h3 className="font-semibold text-lg">{title}</h3>
                        <button 
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}