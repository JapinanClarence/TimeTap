import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import React from "react";

interface EventFormProps {
    title: string;
    open: boolean;
    onOpenChange: () => void;
}

export default function EventForm ({ title, open, onOpenChange }: EventFormProps){
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
                <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                    <form>
                        <FieldGroup>
                            <Field>
                                
                            </Field>
                        </FieldGroup>

                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
