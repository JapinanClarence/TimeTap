import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { InvitationCodeType } from "@/types/member";
import { router } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
interface GenerateCodeProps {
    invitation: InvitationCodeType;
}

export default function GenerateCodeForm({ invitation }: GenerateCodeProps) {
    const [loading, setLoading] = useState(false);
    const handleGenerate = () => {
        router.post(
            "/admin/members/generate-code",
            {},
            {
                preserveState: true,
                preserveScroll: true,
                showProgress: false,
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false), // Stop loading
                onSuccess: () => toast.success("Invitation code generated"),
                onError: ()=> toast.error("Failed to generate invitation code")
            },
        );
    };
    return (
        <>
            <div className="h-20 border-[1.5px] border-dashed rounded-lg mb-2 flex items-center justify-center">
                {loading ? (
                    <Spinner />
                ) : invitation?.code ? (
                    <span className="text-3xl font-semibold tracking-widest text-muted-foreground">
                        {invitation.code}
                    </span>
                ) : (
                    <>
                        <span className="text-sm text-muted-foreground ">
                            No active code. Click generate.
                        </span>
                    </>
                )}
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                    type="button"
                    onClick={handleGenerate}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Spinner />
                            Generating...
                        </>
                    ) : (
                       "Generate"
                    )}
                </Button>
            </DialogFooter>
        </>
    );
}
