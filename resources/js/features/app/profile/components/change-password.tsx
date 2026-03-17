import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "@/features/app/profile/components/change-password-form";
import AppLayout from "@/layouts/app/app-layout";
import { UserType } from "@/types/user";
import { Head, usePage } from "@inertiajs/react";
import { Lock } from "lucide-react";
import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "radix-ui";
import { useIsMobile } from "@/hooks/use-mobile";
import EditForm from "./edit-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ChangePasswordProps {
    user: UserType;
    open: boolean;
    onClose: () => void;
}

export default function ChangePassword({
    user,
    open,
    onClose,
}: ChangePasswordProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={(val) => !val && onClose()}>
                <DrawerContent className="bg-white">
                    <VisuallyHidden.Root>
                        <DrawerTitle />
                        <DrawerDescription />
                    </VisuallyHidden.Root>

                    <div className="p-5 space-y-5">
                        <div className="flex gap-2">
                            <div className="bg-primary/10 text-primary size-10 inline-flex items-center justify-center rounded-lg">
                                <Lock />
                            </div>
                            <div>
                                <h3 className="font-semibold">
                                    Change password
                                </h3>
                                <p className="text-muted-foreground text-xs">
                                    Keep you account secure
                                </p>
                            </div>
                        </div>
                        <Separator />
                        <ChangePasswordForm user={user} onClose={onClose}/>
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent >
                <VisuallyHidden.Root>
                    <DialogHeader>
                        <DialogTitle>Personal Details</DialogTitle>
                        <DialogDescription>
                            Edit your personal information
                        </DialogDescription>
                    </DialogHeader>
                </VisuallyHidden.Root>
                <div className="space-y-5 ">
                    <div className="flex gap-2">
                        <div className="bg-primary/10 text-primary size-10 inline-flex items-center justify-center rounded-lg">
                            <Lock />
                        </div>
                        <div>
                            <h3 className="font-semibold">Change password</h3>
                            <p className="text-muted-foreground text-xs">
                                Keep you account secure
                            </p>
                        </div>
                    </div>
                    <ChangePasswordForm user={user} onClose={onClose}/>
                </div>
            </DialogContent>
        </Dialog>
    );
}
