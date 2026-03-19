import React, { useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "radix-ui";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";

interface LeaveOrgSheetProps {
    open: boolean;
    onClose: () => void;
    onLeave: () => void;
}
export default function LeaveOrgSheet({
    open,
    onClose,
    onLeave,
}: LeaveOrgSheetProps) {
    const [showAlert, setShowAlert] = useState(false);
    const handleLeave = () => {
        setShowAlert(false);
        onLeave();
    };
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={(val) => !val && onClose()}>
                <DrawerContent className="bg-white">
                    <DrawerHeader>
                        <DrawerTitle>Leave Organization</DrawerTitle>
                        <DrawerDescription>
                            Leaving will remove access to the organization
                            events.
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <Button
                            onClick={() => setShowAlert(true)}
                            variant={"destructive"}
                        >
                            Leave
                        </Button>
                        <DrawerClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
                <ConfirmationDialog
                    open={showAlert}
                    onClose={() => setShowAlert(false)}
                    onLeave={handleLeave}
                />
            </Drawer>
        );
    }
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm" showCloseButton={false}>
                 <DialogHeader>
                        <DialogTitle>Leave Organization</DialogTitle>
                        <DialogDescription>
                            Leaving will remove access to the organization
                            events.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={() => setShowAlert(true)}
                            variant={"destructive"}
                        >
                            Leave
                        </Button>
                        <DialogClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
            </DialogContent>
            <ConfirmationDialog
                open={showAlert}
                onClose={() => setShowAlert(false)}
                onLeave={handleLeave}
            />
        </Dialog>
    );
}

const ConfirmationDialog = ({ open, onClose, onLeave }: LeaveOrgSheetProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        variant={"destructive"}
                        onClick={onLeave}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
