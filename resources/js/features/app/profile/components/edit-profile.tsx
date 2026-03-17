import { UserType } from "@/types/user";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditProfileProps extends UserType {
    open: boolean;
    onClose: () => void;
}

export default function EditProfile({
    id,
    first_name,
    last_name,
    email,
    gender,
    open,
    onClose,
}: EditProfileProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={(val) => !val && onClose()}>
                <DrawerContent className="bg-white">
                    <VisuallyHidden.Root>
                        <DrawerTitle />
                        <DrawerDescription />
                    </VisuallyHidden.Root>
                    <div className="p-5 bg-white">
              
                        <EditForm
                            id={id}
                            first_name={first_name}
                            last_name={last_name}
                            email={email}
                            gender={gender}
                            onClose={onClose}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Personal Details</DialogTitle>
                    <DialogDescription>
                        Edit your personal information
                    </DialogDescription>
                </DialogHeader>

                <EditForm
                    id={id}
                    first_name={first_name}
                    last_name={last_name}
                    email={email}
                    gender={gender}
                    onClose={onClose}
                />
            </DialogContent>
        </Dialog>
    );
}
