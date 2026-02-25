import React from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerPortal,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../../../components/ui/button";

interface SheetProps {
    open: boolean;
    onClose: ()=>void;
    onLogout: ()=>void;
}

export default function Sheet({ open, onClose, onLogout }: SheetProps) {
    return (
        <Drawer
            open={open}
            onOpenChange={onClose}
            direction="right"
            modal={false}
        >
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline" onClick={onLogout}>
                            Logout
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
