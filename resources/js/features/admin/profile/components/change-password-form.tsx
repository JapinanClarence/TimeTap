import React, { useEffect, useState } from "react";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { router, useForm, usePage } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import PasswordStrength from "@/components/ui/password-strength";
import { changePasswordSchema } from "../schema/profile.schema";
import { UserType } from "@/types/user";
import { toast } from "sonner";

interface FlashProps {
    [key: string]: unknown;
    flash: {
        warning: string;
        error: string;
        success: string;
    };
}

export default function ChangePasswordForm({ user }: { user: UserType }) {
    const { flash } = usePage<FlashProps>().props;
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPasswords, setShowPasswords] = React.useState({
        old_password: false,
        password: false,
        password_confirmation: false,
    });
    const [loading, setLoading] = useState(false);
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        setError,
        clearErrors,
    } = useForm({
        old_password: "",
        password: "",
        password_confirmation: "",
    });

    const handleToggleVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        clearErrors();
        if (!isPasswordValid) return;
        // 1. Local Validation
        const result = changePasswordSchema.safeParse(data);

        if (!result.success) {
            // 2. Map Zod errors to Inertia errors
            result.error.issues.forEach((error) => {
                setError(error.path[0] as any, error.message);
            });
            return;
        }

        // 3. Submit if successful
        router.patch(
            `/auth/change-password/${user.id}`,
            {
                ...data,
            },
            {
                showProgress: false,
                preserveScroll: true,
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false),
                onSuccess: () => reset(),
                onError: (error) => toast.error(error.old_password),
            },
        );
    };

    useEffect(() => {
        // Check if flash exists AND if success has a value
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }

        if (flash?.warning) {
            toast.warning(flash.warning);
        }
    }, [flash]);
    return (
        <form className="" onSubmit={handleSubmit}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="old_password">Old Password</FieldLabel>
                    <InputGroup className="bg-white">
                        <InputGroupInput
                            type={
                                showPasswords.old_password ? "text" : "password"
                            }
                            value={data.old_password}
                            onChange={(e) =>
                                setData("old_password", e.target.value)
                            }
                            className={
                                errors.old_password ? "border-destructive" : ""
                            }
                        />
                        <InputGroupAddon align="inline-end">
                            <Button
                                variant="ghost"
                                type="button"
                                size="icon"
                                onClick={() =>
                                    handleToggleVisibility("old_password")
                                }
                            >
                                {showPasswords.old_password ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    {errors.old_password && (
                        <FieldError className="text-xs">
                            {errors.old_password}
                        </FieldError>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">New Password</FieldLabel>
                    <InputGroup className="bg-white">
                        <InputGroupInput
                            type={showPasswords.password ? "text" : "password"}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className={
                                errors.password ? "border-destructive" : ""
                            }
                        />
                        <InputGroupAddon align="inline-end">
                            <Button
                                variant="ghost"
                                type="button"
                                size="icon"
                                onClick={() =>
                                    handleToggleVisibility("password")
                                }
                            >
                                {showPasswords.password ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                    {errors.password && (
                        <FieldError className="text-xs">
                            {errors.password}
                        </FieldError>
                    )}
                    {data.password ? (
                        <PasswordStrength
                            password={data.password || ""}
                            onValidityChange={setIsPasswordValid}
                        />
                    ) : (
                        <FieldDescription className="text-xs">
                            Must be at least 8 characters long.
                        </FieldDescription>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="password_confirmation">
                        Confirm Password
                    </FieldLabel>
                    <InputGroup className="bg-white">
                        <InputGroupInput
                            type={"password"}
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className={
                                errors.password_confirmation
                                    ? "border-destructive"
                                    : ""
                            }
                        />
                    </InputGroup>
                    {errors.password_confirmation && (
                        <FieldError className="text-xs">
                            {errors.password_confirmation}
                        </FieldError>
                    )}
                </Field>
                <Field className="md:justify-end" orientation="responsive">
                    <Button
                        disabled={!isPasswordValid}
                        className="w-full md:w-min"
                        type="submit"
                    >
                      {loading && <Spinner />}
                      Save
                    </Button>
                    <Button
                        onClick={() => window.history.back()}
                        variant="outline"
                        type="button"
                        className="w-full md:w-min"
                    >
                        Cancel
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    );
}
