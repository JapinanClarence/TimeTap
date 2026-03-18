import React, { useState, useMemo, useEffect } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { router, useForm, usePage } from "@inertiajs/react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
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
import { joinOrgSchema } from "@/features/app/schema/join-organization.schema";

interface JoinOrgSheetProps {
    open: boolean;
    onClose: () => void;
}

export default function JoinOrgSheet({ open, onClose }: JoinOrgSheetProps) {
   
    const { post, data, setData, processing, errors, reset, clearErrors, setError } =
        useForm({
            invitation_code: "",
        });

    const validate = () => {
        const result = joinOrgSchema.safeParse(data);
        if (!result.success) {
            clearErrors();

            result.error.issues.forEach((issue) => {
                const field = issue.path[0];

                if (typeof field === "string") {
                    setError(field as keyof typeof data, issue.message);
                }
            });
            return false;
        }
        clearErrors();

        return true;
    };

    const submit = (e: React.SubmitEvent) => {
        if (!validate()) return;
        e.preventDefault();

        // Use Inertia to post the join request to your controller
        post("/app/organizations/join", {
            showProgress: false,
            onSuccess: () =>{
                setData({invitation_code:""});
                onClose();
                reset();
            },
            onError: ()=> toast.error("Failed to join organization")
        });
    };

    return (
        <Drawer
            open={open}
            onOpenChange={(val) => !val && onClose()}
        >
            <DrawerContent className="bg-white max-h-[96%]">
                <form onSubmit={submit}>
                    <DrawerHeader>
                        <DrawerTitle>Join Organization</DrawerTitle>
                        <DrawerDescription>
                            Enter invitation code to join organization.
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-4 py-1 flex-1 overflow-y-auto">
                        <Field>
                            <FieldLabel htmlFor="invitation-code">
                                Code
                            </FieldLabel>
                            <Input
                                id="invitation-code"
                                type="text"
                                placeholder="Enter invitation code"
                                value={data.invitation_code}
                                onChange={(e) =>
                                    setData("invitation_code", e.target.value)
                                }
                                className={
                                    errors.invitation_code
                                        ? "border-destructive"
                                        : ""
                                }
                            />
                            {errors.invitation_code && (
                                <FieldError className="text-xs">
                                    {errors.invitation_code}
                                </FieldError>
                            )}
                        </Field>
                    </div>

                    <DrawerFooter className="pt-4">
                        <Button disabled={processing} className="w-full">
                            {processing ? (
                                <>
                                    <Spinner />
                                    Submitting...
                                </>
                            ) : (
                                <> Join</>
                            )}
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </form>
            </DrawerContent>
            <AlertDialog>
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
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Drawer>
    );
}
