import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Clock2Icon, ClockPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import { useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import { EventType } from "@/types/event";
import { description } from "../../dashboard/components/chat-area-interactive";
import { AnimatePresence, motion } from "framer-motion";
import { GeofenceMap } from "./geofence-map";
import EventForm from "./event-form";
import { eventSchema } from "../schema/event.schema";
import { Summary } from "./summary";
import { cn } from "@/lib/utils";

interface EventFormProps {
    title?: string;
}

const STEPS = {
    first_step: 1,
    second_step: 2,
    third_step: 3,
};

export default function Form({ title }: EventFormProps) {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors, setError, clearErrors } =
        useForm<EventType>({
            title: "",
            description: "",
            location: "",
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            coordinates: [],
        });

    const validate = () => {
        const result = eventSchema.safeParse(data);

        if (!result.success) {
            clearErrors();

            result.error.issues.forEach((issue) => {
                const field = issue.path[0];

                if (typeof field === "string") {
                    setError(field as keyof EventType, issue.message);
                }
            });
            return false;
        }
        clearErrors();

        return true;
    };
    // handle stepper state
    const nextStep = () => {
        if (!validate()) return;

        if (step === STEPS.third_step) return;
        setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => prev - 1);
    return (
        <>
            <div>
                <div className="px-4">
                    {/* Container with padding equal to circle radius */}
                    <div className="mx-auto md:w-[80%] relative flex items-center justify-between">
                        {/* Background Gray Line (Total track) */}
                        <div className="absolute top-4 left-0 w-full h-1 bg-muted rounded-full" />

                        {/* Animated Primary Line */}
                        <motion.div
                            initial={false}
                            animate={{
                                width:
                                    step === STEPS.first_step
                                        ? "0%"
                                        : step === STEPS.second_step
                                          ? "50%"
                                          : "100%",
                            }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                            className="absolute top-4 left-0 h-1 bg-primary rounded-full"
                        />

                        {/* Step 1 */}
                        <div className="relative flex flex-col items-center z-10 w-fit">
                            <motion.div
                                animate={{
                                    scale: step === STEPS.first_step ? 1.1 : 1,
                                    backgroundColor:
                                        step >= STEPS.first_step
                                            ? "var(--primary)"
                                            : "#e5e7eb",
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium"
                            >
                                {step > STEPS.first_step ? (
                                    <Check className="size-4" />
                                ) : (
                                    "1"
                                )}
                            </motion.div>
                            <div className="absolute top-10 whitespace-nowrap text-center">
                                <span className="text-[10px] md:text-xs font-semibold text-muted-foreground">
                                    Event Details
                                </span>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex flex-col items-center z-10 w-fit">
                            <motion.div
                                animate={{
                                    scale: step === STEPS.second_step ? 1.1 : 1,
                                    backgroundColor:
                                        step >= STEPS.second_step
                                            ? "var(--primary)"
                                            : "#e5e7eb",
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium"
                            >
                                {step > STEPS.second_step ? (
                                    <Check className="size-4" />
                                ) : (
                                    "2"
                                )}
                            </motion.div>
                            <div className="absolute top-10 whitespace-nowrap text-center">
                                <span className="text-[10px] md:text-xs font-semibold text-muted-foreground">
                                    Geofence
                                </span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex flex-col items-center z-10 w-fit">
                            <motion.div
                                animate={{
                                    scale: step === STEPS.third_step ? 1.1 : 1,
                                    backgroundColor:
                                        step >= STEPS.third_step
                                            ? "var(--primary)"
                                            : "#e5e7eb",
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-medium"
                            >
                                {step > STEPS.third_step ? (
                                    <Check className="size-4" />
                                ) : (
                                    "3"
                                )}
                            </motion.div>
                            <div className="absolute top-10 whitespace-nowrap text-center">
                                <span className="text-[10px] md:text-xs font-semibold text-muted-foreground">
                                    Summary
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Extra spacing for the absolute positioned labels */}
                    <div className="h-10" />
                </div>
                <form className="relative">
                    <AnimatePresence mode="wait">
                        {step === STEPS.first_step && (
                            <motion.div
                            // key={"step1"}
                            // initial={{ x: 50 }}
                            // animate={{ x: 0 }}
                            // exit={{ x: -50 }}
                            // transition={{
                            //     duration: 0.3,
                            //     ease: "easeInOut",
                            // }}
                            >
                                <EventForm
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            </motion.div>
                        )}
                        {step === STEPS.second_step && (
                            <motion.div
                            // key={"step2"}
                            // initial={{ x: 50 }}
                            // animate={{ x: 0 }}
                            // exit={{ x: -50 }}
                            // transition={{
                            //     duration: 0.3,
                            //     ease: "easeInOut",
                            // }}
                            >
                                <GeofenceMap
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            </motion.div>
                        )}
                        {step === STEPS.third_step && (
                            <motion.div
                            // key={"step2"}
                            // initial={{ x: 50 }}
                            // animate={{ x: 0 }}
                            // exit={{ x: -50 }}
                            // transition={{
                            //     duration: 0.3,
                            //     ease: "easeInOut",
                            // }}
                            >
                                <Summary data={data} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
            <div className="mt-5 flex items-center justify-between md:justify-end gap-2">
                <Button
                    variant={"outline"}
                    disabled={step === STEPS.first_step}
                    onClick={prevStep}
                >
                    Back
                </Button>
                <Button
                    variant={step === STEPS.third_step ? "default" : "outline"}
                    onClick={nextStep}
                >
                    {step === STEPS.third_step ? "Submit" : "Next"}
                </Button>
            </div>
        </>
    );
}
