import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import React from "react";

interface EventFormProps {
    title: string;
    open: boolean;
    onOpenChange: () => void;
}

export const EventForm = ({ title, open, onOpenChange }: EventFormProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={""} showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className={"text-start"}>{title}</DialogTitle>
                    <DialogDescription className={"text-start"}>
                        Please fill in all required fields and click submit to
                        save.
                    </DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto max-h-[calc(95vh-120px)]"></div>
            </DialogContent>
        </Dialog>
    );
};
