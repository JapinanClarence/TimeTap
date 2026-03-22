"use client";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "../../../components/ui/field";
import PasswordStrength from "../../../components/ui/password-strength";
import {
    Check,
    Eye,
    EyeClosed,
    ImagePlus,
    Loader2,
    User,
    Building2,
    ClipboardCheck,
    EyeOff,
} from "lucide-react";
import { FilePicker } from "@/components/ui/file-picker";
import { uploadToCloudinary } from "@/util/cloudinary";
import { toast } from "sonner";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { BubbleBgDecoration } from "@/components/ui/bubble-bg-decoration";

const STEPS = {
    first_step: 1,
    second_step: 2,
    third_step: 3,
};

export default function OrgForm() {
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        password: false,
        password_confirmation: false,
    });
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        organization_name: "",
        description: "",
        image: "",
    });
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (croppedFile: File) => {
        setIsUploading(true);
        try {
            const result = await uploadToCloudinary(
                croppedFile,
                "timetap/organizations",
            );
            setData("image", result.secure_url);
            setIsPickerOpen(false);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsUploading(false);
        }
    };
    console.log(data);

    const isStep1Valid = useMemo(() => {
        return (
            data.first_name.trim() !== "" &&
            data.last_name.trim() !== "" &&
            data.email.trim() !== "" &&
            data.password.length >= 8 &&
            data.password === data.password_confirmation
        );
    }, [data]);

    const isStep2Valid = useMemo(() => {
        return (
            data.organization_name.trim() !== "" &&
            data.description.trim() !== ""
        );
    }, [data]);

    const nextStep = () => {
        if (step === 1 && isStep1Valid) setStep(2);
        else if (step === 2 && isStep2Valid) setStep(3);
    };

    const prevStep = () => setStep((s) => s - 1);

    const submit = (e: React.SubmitEvent) => {
        e.preventDefault();
        post("/register/organization", { showProgress: false });
    };

    const handleToggleVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    // Sidebar Step Item Component for cleaner code
    const StepItem = ({
        number,
        title,
        desc,
        active,
    }: {
        number: number;
        title: string;
        desc: string;
        active: boolean;
    }) => (
        <div
            className={`relative flex gap-4 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-50"}`}
        >
            <div
                className={`z-10 rounded-full font-bold flex text-lg items-center justify-center size-10 shrink-0 ${active ? "bg-white text-primary shadow-lg" : "bg-white/20 text-white"}`}
            >
                {step > number ? <Check className="size-5" /> : number}
            </div>
            <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="text-xs text-white/70">{desc}</p>
            </div>
        </div>
    );

    return (
        <div className="">
            <div className="h-screen flex pt-15 overflow-hidden ">
                {/* --- LEFT SIDEBAR (1/3) --- */}
                <div className="relative hidden w-2/5 flex-col bg-primary p-10 text-white md:flex">
                    <BubbleBgDecoration />
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold tracking-tight">
                            Create your organization account
                        </h2>
                        <p className="text-sm text-primary-foreground/80">
                            Set up your organization in minutes.
                        </p>
                    </div>

                    <div className="relative space-y-12">
                        {/* Static Background Line (Visible/Transparent Track) */}
                        <div className="absolute left-[15px] top-2 h-[85%] w-0.5 bg-white/20" />

                        {/* Animated Progress Line */}
                        <motion.div
                            className="absolute left-[15px] top-2 w-0.5 bg-white"
                            initial={{ height: 0 }}
                            animate={{
                                // Adjusting height based on the step
                                height:
                                    step === 1
                                        ? "0%"
                                        : step === 2
                                          ? "45%"
                                          : "85%",
                            }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />

                        {/* Step 1 */}
                        <div className="relative flex gap-4 items-center">
                            <div
                                className={`z-10 rounded-full font-bold flex text-lg items-center justify-center size-8 shrink-0 transition-colors duration-300 ${
                                    step >= 1
                                        ? "bg-white text-primary"
                                        : "bg-primary border border-white/50 text-white"
                                }`}
                            >
                                {step > 1 ? <Check className="size-4" /> : "1"}
                            </div>
                            <div
                                className={
                                    step >= 1 ? "opacity-100" : "opacity-50"
                                }
                            >
                                <p className="font-semibold text-white leading-tight">
                                    Personal details
                                </p>
                                <p className="text-xs text-white/70">
                                    Your name & credentials
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex gap-4 items-center">
                            <div
                                className={`z-10 rounded-full font-bold flex text-lg items-center justify-center size-8 shrink-0 transition-colors duration-300 ${
                                    step >= 2
                                        ? "bg-white text-primary"
                                        : "bg-primary border border-white/50 text-white"
                                }`}
                            >
                                {step > 2 ? <Check className="size-4" /> : "2"}
                            </div>
                            <div
                                className={
                                    step >= 2 ? "opacity-100" : "opacity-50"
                                }
                            >
                                <p className="font-semibold text-white leading-tight">
                                    Organization info
                                </p>
                                <p className="text-xs text-white/70">
                                    Name, description & picture
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex gap-4 items-center">
                            <div
                                className={`z-10 rounded-full font-bold flex text-lg items-center justify-center size-8 shrink-0 transition-colors duration-300 ${
                                    step >= 3
                                        ? "bg-white text-primary"
                                        : "bg-primary border border-white/50 text-white"
                                }`}
                            >
                                3
                            </div>
                            <div
                                className={
                                    step >= 3 ? "opacity-100" : "opacity-50"
                                }
                            >
                                <p className="font-semibold text-white leading-tight">
                                    Confirmation
                                </p>
                                <p className="text-xs text-white/70">
                                    Review & submit
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex  gap-3 mt-auto pt-10 text-xs text-white">
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar size="lg">
                                    <AvatarImage
                                        src="/images/japinan-profile.jpg"
                                        alt="Avatar"
                                    />
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <div className="p-3 flex items-center gap-3">
                                    <Avatar size="lg">
                                        <AvatarImage
                                            src="/images/japinan-profile.jpg"
                                            alt="Avatar"
                                        />
                                    </Avatar>
                                    <div className="text-start text-sm ">
                                        <a
                                            href="https://github.com/JapinanClarence"
                                            target="_blank"
                                            className="block font-semibold text-sm"
                                        >
                                            @japinanclarence
                                        </a>
                                        <a
                                            href="https://japinanc.vercel.app"
                                            target="_blank"
                                            className="text-sm font-medium text-slate-500 underline underline-offset-2"
                                        >
                                            {/* <Globe height={10} width={10} className="inline p-0 mr-1" /> */}
                                            Portfolio
                                        </a>
                                    </div>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                        <div>
                            <h3 className="font-semibold ">Developed by:</h3>
                            <p className="text-sm font-medium text-white/70">
                                japinanc
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT FORM AREA (2/3) --- */}
                <Card className="flex-1 border-none shadow-none">
                    <CardContent className="p-8 md:p-12 md:mx-auto md:min-w-lg">
                        <form onSubmit={submit} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {/* STEP 1: PERSONAL DETAILS */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="space-y-5"
                                    >
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-bold">
                                                Personal Details
                                            </h3>
                                            <p className="text-muted-foreground">
                                                Tell us who is managing this
                                                account.
                                            </p>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <Field>
                                                <FieldLabel>
                                                    First Name
                                                </FieldLabel>
                                                <Input
                                                    value={data.first_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "first_name",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.first_name && (
                                                    <FieldError>
                                                        {errors.first_name}
                                                    </FieldError>
                                                )}
                                            </Field>
                                            <Field>
                                                <FieldLabel>
                                                    Last Name
                                                </FieldLabel>
                                                <Input
                                                    value={data.last_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "last_name",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </Field>
                                        </div>
                                        <Field>
                                            <FieldLabel>Email</FieldLabel>
                                            <Input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            {errors.email && (
                                                <FieldError>
                                                    {errors.email}
                                                </FieldError>
                                            )}
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="password">
                                                Password
                                            </FieldLabel>
                                            <InputGroup className="bg-white">
                                                <InputGroupInput
                                                    type={
                                                        showPasswords.password
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
                                                <InputGroupAddon align="inline-end">
                                                    <Button
                                                        variant="ghost"
                                                        type="button"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleToggleVisibility(
                                                                "password",
                                                            )
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
                                            <InputGroup className="bg-white">
                                                <InputGroupInput
                                                    type={"password"}
                                                    value={
                                                        data.password_confirmation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "password_confirmation",
                                                            e.target.value,
                                                        )
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
                                                    {
                                                        errors.password_confirmation
                                                    }
                                                </FieldError>
                                            )}
                                        </Field>

                                        <Button
                                            type="button"
                                            className="w-full"
                                            onClick={nextStep}
                                            disabled={!isStep1Valid}
                                        >
                                            Continue
                                        </Button>
                                    </motion.div>
                                )}

                                {/* STEP 2: ORGANIZATION INFO */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="space-y-5"
                                    >
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-bold">
                                                Organization Info
                                            </h3>
                                            <p className="text-muted-foreground">
                                                Brand your workspace.
                                            </p>
                                        </div>
                                        <Field>
                                            <FieldLabel>
                                                Organization Name
                                            </FieldLabel>
                                            <Input
                                                value={data.organization_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "organization_name",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Description</FieldLabel>
                                            <Textarea
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Logo</FieldLabel>
                                            <div
                                                onClick={() =>
                                                    !isUploading &&
                                                    setIsPickerOpen(true)
                                                }
                                                className="relative h-32 w-full cursor-pointer rounded-xl border-2 border-dashed flex items-center justify-center hover:bg-muted/50 transition-colors"
                                            >
                                                {data.image ? (
                                                    <img
                                                        src={data.image}
                                                        className="h-full object-contain p-2"
                                                    />
                                                ) : (
                                                    <ImagePlus className="text-muted-foreground" />
                                                )}
                                            </div>
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
                                                type="button"
                                                className="flex-1"
                                                onClick={nextStep}
                                                disabled={!isStep2Valid}
                                            >
                                                Review Details
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* STEP 3: REVIEW & CONFIRMATION */}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className="space-y-6"
                                    >
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-bold">
                                                Review & Confirm
                                            </h3>
                                            <p className="text-muted-foreground">
                                                Make sure everything looks
                                                correct.
                                            </p>
                                        </div>

                                        <div className="rounded-lg border bg-muted/30 p-4 space-y-4">
                                            <div className="flex items-start gap-3">
                                                <User className="size-5 text-primary mt-1" />
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {data.first_name}{" "}
                                                        {data.last_name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {data.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Building2 className="size-5 text-primary mt-1" />
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {data.organization_name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                                        {data.description}
                                                    </p>
                                                </div>
                                            </div>
                                            {data.image && (
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded border bg-white overflow-hidden">
                                                        <img
                                                            src={data.image}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Logo uploaded
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="flex-1"
                                                onClick={prevStep}
                                                disabled={processing}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="flex-1"
                                                disabled={processing}
                                            >
                                                {processing ? (
                                                    <Loader2 className="mr-2 animate-spin" />
                                                ) : (
                                                    <ClipboardCheck className="mr-2" />
                                                )}
                                                Complete Registration
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </CardContent>
                </Card>
            </div>

            <FilePicker
                open={isPickerOpen}
                onClose={() => setIsPickerOpen(false)}
                onFileSelect={handleImageUpload}
                currentImage={data.image}
                isLoading={isUploading}
            />
        </div>
    );
}
