import React, { useState } from "react";
import { OrganizationType } from "@/types/organization";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
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
import { Spinner } from "@/components/ui/spinner";
interface SwitchOrgSheetProps {
    open: boolean;
    onClose: () => void;
    organizations: OrganizationType[]; // Pass your orgs from Laravel
}

const snapPoints = ["148px", "355px", 1];

export default function SwitchOrgSheet({
    open,
    onClose,
    organizations,
}: SwitchOrgSheetProps) {
    const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
    const [selectedOrgId, setSelectedOrgId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSwitch = (selectedOrgId: string | any) => {
        if (!selectedOrgId) return;
        // Use Inertia to post the join request to your controller
        router.patch(
            "/app/organizations/switch",
            {
                organization_id: selectedOrgId,
            },
            {
                showProgress: false,
                onBefore: () =>setLoading(true),
                onFinish: () => setLoading(false), // Stop loading
                onSuccess:()=>onClose()
            },
        );
    };

    return (
        <CommandDialog
            className="sm:max-w-sm"
            open={open}
            onOpenChange={onClose}
        >
            <div className="flex-1 overflow-y-auto">
                <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="Search organizations..." />
                    <CommandList>
                        {organizations.length > 0 ? (
                            <CommandGroup heading="Organizations">
                                {organizations.map((org) => (
                                    <CommandItem
                                        key={org.id}
                                        value={org.name}
                                        onSelect={() => {
                                            handleSwitch(org.id);
                                            setSelectedOrgId(org.id || "");
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedOrgId === org.id
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                            )}
                                        />
                                        {org.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ) : (
                            <CommandEmpty>No organization found.</CommandEmpty>
                        )}
                    </CommandList>
                </Command>
            </div>
            <AlertDialog  open={loading} onOpenChange={setLoading}>
                <AlertDialogContent className="max-w-xs">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Loading...</AlertDialogTitle>
                        <AlertDialogDescription>
                            <Spinner className="size-7"/>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </CommandDialog>
    );
}
