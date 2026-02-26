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
import { Clock2Icon, ClockPlus } from "lucide-react";
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
                <form>
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
                                <GeofenceMap />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
            <div className="mt-5 flex items-center justify-between md:justify-end gap-5">
                <Button
                    variant={"outline"}
                    disabled={step === STEPS.first_step}
                    onClick={prevStep}
                >
                    Back
                </Button>
                <Button variant={"outline"} onClick={nextStep}>
                    {step === STEPS.third_step ? "Submit" : "Next"}
                </Button>
            </div>
        </>
    );
}
