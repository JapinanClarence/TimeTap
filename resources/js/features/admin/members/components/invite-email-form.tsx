import React, { useState, KeyboardEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component
import { X } from "lucide-react";
import { FieldLabel } from "@/components/ui/field";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function InviteEmailForm() {
    const [emails, setEmails] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, reset, errors } = useForm({
        emails: [] as string[],
    });
    // Focus the input whenever the main container is clicked
    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (["Enter", ","].includes(e.key)) {
            e.preventDefault();
            const email = inputValue.trim();

            // Validate email format and check for duplicates
            if (
                email &&
                /^\S+@\S+\.\S+$/.test(email) &&
                !data.emails.includes(email)
            ) {
                setData("emails", [...data.emails, email]);
                setInputValue("");
            }
        } else if (
            e.key === "Backspace" &&
            !inputValue &&
            data.emails.length > 0
        ) {
            removeEmail(data.emails[data.emails.length - 1]);
        }
    };

    const removeEmail = (emailToRemove: string) => {
        setData(
            "emails",
            data.emails.filter((email) => email !== emailToRemove),
        );
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        post("/admin/members/invite-members", {
            preserveState: true,
            preserveScroll: true,
            showProgress: false,
            onSuccess: () => {
                setInputValue("");
                reset();
                toast.success("User invited successfully!");
            },
            onError: () =>
                toast.error("Invitation failed, user may not exists!"),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Invite via Email</label>

                <div
                    onClick={handleContainerClick}
                    className={`flex flex-wrap content-start gap-2 p-3 border rounded-md focus-within:ring-2 focus-within:ring-ring h-[200px] overflow-y-auto cursor-text bg-background transition-all ${
                        errors.emails ? "border-destructive" : "border-input"
                    }`}
                >
                    {data.emails.map((email) => (
                        <Badge
                            key={email}
                            variant="default"
                            className="pl-2 pr-1 py-1 gap-1 h-min"
                        >
                            {email}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeEmail(email);
                                }}
                                className="hover:bg-muted hover:text-black rounded-full p-0.5"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}

                    <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={processing}
                        placeholder={
                            data.emails.length === 0
                                ? "example@email.com..."
                                : ""
                        }
                        className="flex-1 bg-transparent border-none outline-none text-sm min-w-[150px] h-fit py-1 disabled:cursor-not-allowed"
                    />
                </div>

                {/* Validation Errors from Laravel */}
                {errors.emails && (
                    <p className="text-xs text-destructive">{errors.emails}</p>
                )}

                <p className="text-[0.8rem] text-muted-foreground">
                    Press Enter or Comma to add multiple emails.
                </p>
            </div>

            <DialogFooter>
                <DialogClose asChild>
                    <Button
                        variant="outline"
                        type="button"
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                </DialogClose>
                <Button
                    type="submit"
                    disabled={data.emails.length === 0 || processing}
                >
                    {processing ? (
                        <>
                            <Spinner />
                            Sending...
                        </>
                    ) : (
                        "Send Invitations"
                    )}
                </Button>
            </DialogFooter>
        </form>
    );
}
