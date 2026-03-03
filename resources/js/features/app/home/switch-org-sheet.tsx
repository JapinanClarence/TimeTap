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
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
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

    const handleSwitch = () => {
        if (!selectedOrgId) return;
        // Use Inertia to post the join request to your controller
        router.patch(
            "/app/organizations/switch",
            {
                organization_id: selectedOrgId,
            },
            {
                showProgress:false,
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false), // Stop loading
                onSuccess: () =>
                    toast.success("Organization switched successfully!"),
                onError: (errors) =>
                    toast.error("Failed to switch organization!"),
            },
        );
    };

    return (
        <Drawer
            open={open}
            onOpenChange={(val) => !val && onClose()}
            // snapPoints={snapPoints}
            // activeSnapPoint={snap}
            // setActiveSnapPoint={setSnap}
        >
            <DrawerContent className="bg-white max-h-[96%]">
                <DrawerHeader>
                    <DrawerTitle>Organizations</DrawerTitle>
                    <DrawerDescription>
                        {/* Select organization to display. */}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="px-4 flex-1 overflow-y-auto">
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
                                                setSelectedOrgId(org.id || "");
                                                // Drop back to middle snap point on selection
                                                setSnap(snapPoints[1]);
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
                                <CommandEmpty>
                                    No organization found.
                                </CommandEmpty>
                            )}
                        </CommandList>
                    </Command>
                </div>

                <DrawerFooter className="pt-4">
                    <Button
                        onClick={handleSwitch}
                        disabled={!selectedOrgId || loading}
                        className="w-full"
                    >
                        {loading ? (
                            <>
                                <Spinner />
                                Submitting...
                            </>
                        ) : (
                            <>Save Changes</>
                        )}
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
