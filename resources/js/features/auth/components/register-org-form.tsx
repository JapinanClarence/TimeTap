"use client";

import { useState, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../../../components/ui/field";
import PasswordStrength from "../../../components/ui/password-strength";
import { Check, Eye, EyeClosed } from "lucide-react";

const passwordType = {
    password: "pass",
    confirmPass: "confirmPass",
};

export default function RegisterOrgForm() {
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<Boolean>(false);
    const [step, setStep] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        organization_name: "",
        description: "",
        org_profile: "",
    });

    // ✅ STEP 1 VALIDATION
    const isStep1Valid = useMemo(() => {
        return (
            data.first_name.trim() !== "" &&
            data.last_name.trim() !== "" &&
            data.email.trim() !== "" &&
            data.password.length >= 8 &&
            data.password === data.password_confirmation
        );
    }, [data]);

    const nextStep = () => {
        if (isStep1Valid) setStep(2);
    };

    const prevStep = () => setStep(1);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/register/organization");
    };

    const handleShowPassword = (type: any) => {
        if (type === passwordType.password) {
            if (showPassword) {
                return setShowPassword(false);
            }
            return setShowPassword(true);
        }
        if (showConfirmPassword) {
            return setShowConfirmPassword(false);
        }
        setShowConfirmPassword(true);
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-xl shadow-none border-none bg-transparent md:border md:bg-card md:shadow-xl md:rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl font-semibold text-center">
                        Create Organization Account
                    </CardTitle>

                    {/* 🔥 Step Indicator */}
                    <div className="mt-8 px-1">
                        <div className="relative w-full">
                            {/* Progress Track (Gray Background) */}
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                {/* Animated Active Fill */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        // Step 1: 50% (indicates progress within first half)
                                        // or 0% if you prefer it to only fill once Step 1 is done.
                                        width: step === 1 ? "50%" : "100%",
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "circOut",
                                    }}
                                    className="h-full bg-primary"
                                />
                            </div>

                            {/* Labels Container */}
                            <div className="flex  mt-3">
                                <div
                                    className={`${step == 1 ? "flex" : "hidden"} flex-col items-start`}
                                >
                                    <span
                                        className={`text-xs md:text-sm font-bold transition-colors duration-300 ${
                                            step >= 1
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        Personal Details
                                    </span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                        Step 1
                                    </span>
                                </div>

                                <div
                                    className={`${step < 2 ? "hidden" : "flex"} flex-col items-start text-right`}
                                >
                                    <span
                                        className={`text-xs md:text-sm font-bold transition-colors duration-300 ${
                                            step >= 2
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        Organization
                                    </span>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                        Step 2
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={submit}
                        className="space-y-6 overflow-hidden relative"
                    >
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    // initial={{ x: 50, opacity: 0 }}
                                    // animate={{ x: 0, opacity: 1 }}
                                    // exit={{ x: -50, opacity: 0 }}
                                    // transition={{ duration: 0.3 }}
                                >
                                    <FieldGroup className="gap-5">
                                        <Field
                                            className={
                                                "grid md:grid-cols-2 gap-4"
                                            }
                                        >
                                            <Field>
                                                <FieldLabel htmlFor="first_name">
                                                    First Name
                                                </FieldLabel>
                                                <Input
                                                    id="first_name"
                                                    type="text"
                                                    value={data.first_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "first_name",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={
                                                        errors.first_name
                                                            ? "border-destructive"
                                                            : ""
                                                    }
                                                />
                                                {errors.first_name && (
                                                    <FieldError className="text-xs">
                                                        {errors.first_name}
                                                    </FieldError>
                                                )}
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="last_name">
                                                    Last Name
                                                </FieldLabel>
                                                <Input
                                                    id="last_name"
                                                    type="text"
                                                    value={data.last_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "last_name",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={
                                                        errors.last_name
                                                            ? "border-destructive"
                                                            : ""
                                                    }
                                                />
                                                {errors.last_name && (
                                                    <FieldError className="text-xs">
                                                        {errors.last_name}
                                                    </FieldError>
                                                )}
                                            </Field>
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="email">
                                                Email
                                            </FieldLabel>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                                className={
                                                    errors.email
                                                        ? "border-destructive"
                                                        : ""
                                                }
                                            />
                                            {errors.email && (
                                                <FieldError className="text-xs">
                                                    {errors.email}
                                                </FieldError>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="password">
                                                Password
                                            </FieldLabel>
                                            <div className="relative w-full">
                                                <Input
                                                    id="password"
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    value={data.password}
                                                    onChange={(e) =>
                                                        setData(
                                                            "password",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={
                                                        errors.password
                                                            ? "border-destructive"
                                                            : ""
                                                    }
                                                />

                                                {showPassword ? (
                                                    <Button
                                                        className="z-10 absolute top-0 right-0 h-full"
                                                        size={"icon-sm"}
                                                        variant={"ghost"}
                                                        type="button"
                                                        onClick={() =>
                                                            handleShowPassword(
                                                                "pass",
                                                            )
                                                        }
                                                    >
                                                        <Eye className="" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className="z-10 absolute top-0 right-0 h-full"
                                                        size={"icon-sm"}
                                                        variant={"ghost"}
                                                        type="button"
                                                        onClick={() =>
                                                            handleShowPassword(
                                                                "pass",
                                                            )
                                                        }
                                                    >
                                                        <EyeClosed className="" />
                                                    </Button>
                                                )}
                                            </div>
                                            {errors.password && (
                                                <FieldError className="text-xs">
                                                    {errors.password}
                                                </FieldError>
                                            )}
                                            {data.password ? (
                                                <PasswordStrength
                                                    password={
                                                        data.password || ""
                                                    }
                                                    onValidityChange={
                                                        setIsPasswordValid
                                                    }
                                                />
                                            ) : (
                                                <FieldDescription className="text-xs">
                                                    Must be at least 8
                                                    characters long.
                                                </FieldDescription>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="password_confirmation">
                                                Confirm Password
                                            </FieldLabel>
                                            <div className="relative w-full">
                                                <Input
                                                    id="password_confirmation"
                                                    type={
                                                        showConfirmPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "password_confirmation",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {showConfirmPassword ? (
                                                    <Button
                                                        className="z-10 absolute top-0 right-0 h-full"
                                                        size={"icon-sm"}
                                                        variant={"ghost"}
                                                        type="button"
                                                        onClick={() =>
                                                            handleShowPassword(
                                                                "confirmPassword",
                                                            )
                                                        }
                                                    >
                                                        <Eye className="" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className="z-10 absolute top-0 right-0 h-full"
                                                        size={"icon-sm"}
                                                        variant={"ghost"}
                                                        type="button"
                                                        onClick={() =>
                                                            handleShowPassword(
                                                                "confirmPassword",
                                                            )
                                                        }
                                                    >
                                                        <EyeClosed className="" />
                                                    </Button>
                                                )}
                                            </div>
                                        </Field>

                                        <Button
                                            type="button"
                                            className="w-full"
                                            onClick={nextStep}
                                            disabled={!isStep1Valid}
                                        >
                                            Next
                                        </Button>
                                    </FieldGroup>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    // initial={{ x: 50, opacity: 0 }}
                                    // animate={{ x: 0, opacity: 1 }}
                                    // exit={{ x: -50, opacity: 0 }}
                                    // transition={{ duration: 0.3 }}
                                >
                                    <FieldGroup className="gap-5">
                                        <Field>
                                            <FieldLabel htmlFor="organization_name">
                                                Organization Name
                                            </FieldLabel>
                                            <Input
                                                id="organization_name"
                                                type="text"
                                                value={data.organization_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "organization_name",
                                                        e.target.value,
                                                    )
                                                }
                                                className={
                                                    errors.organization_name
                                                        ? "border-destructive"
                                                        : ""
                                                }
                                            />
                                            {errors.organization_name && (
                                                <FieldError className="text-xs">
                                                    {errors.organization_name}
                                                </FieldError>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="description">
                                                Description
                                            </FieldLabel>
                                            <Textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value,
                                                    )
                                                }
                                                className={
                                                    errors.description
                                                        ? "border-destructive"
                                                        : ""
                                                }
                                            />
                                            {errors.description && (
                                                <FieldError className="text-xs">
                                                    {errors.description}
                                                </FieldError>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="org_profile">
                                                Upload Image
                                            </FieldLabel>
                                            <Input
                                                id="org_profile"
                                                type="file"
                                                disabled
                                                value={data.org_profile}
                                                onChange={(e) =>
                                                    setData(
                                                        "org_profile",
                                                        e.target.value,
                                                    )
                                                }
                                                className={
                                                    errors.org_profile
                                                        ? "border-destructive"
                                                        : ""
                                                }
                                            />
                                            {errors.org_profile && (
                                                <FieldError className="text-xs">
                                                    {errors.org_profile}
                                                </FieldError>
                                            )}
                                        </Field>

                                        <div className="flex gap-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="flex-1"
                                                onClick={prevStep}
                                            >
                                                Back
                                            </Button>

                                            <Button
                                                type="submit"
                                                className="flex-1"
                                                disabled={processing}
                                            >
                                                {processing
                                                    ? "Creating..."
                                                    : "Create Organization"}
                                            </Button>
                                        </div>
                                    </FieldGroup>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
