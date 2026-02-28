import { Check, Clock2Icon, ClockPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState, useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import { EventType } from "@/types/event";
import { AnimatePresence, motion } from "framer-motion";
import { GeofenceMap } from "./geofence-map";
import EventForm from "./event-form";
import { eventSchema } from "../schema/event.schema";
import { Summary } from "./summary";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface EventFormProps {
    method?: "add" | "edit";
    event_data?: EventType;
}

const STEPS = {
    first_step: 1,
    second_step: 2,
    third_step: 3,
};

export default function Form({ method = "add", event_data }: EventFormProps) {
    const [step, setStep] = useState(1);

    // when editing, pull defaults from the passed-in `event_data`; note the
    // coords live under `area.coordinates`.  fall back to empty/blank values
    // for the add case (or missing properties).
    const initialData: EventType = useMemo(() => {
        if (method === "edit" && event_data) {
            return {
                title: event_data.title || "",
                description: event_data.description || "",
                location: event_data.location || "",
                start_date: event_data.start_date || "",
                end_date: event_data.end_date || "",
                start_time: event_data.start_time || "",
                end_time: event_data.end_time || "",
                status: event_data.status ?? "active",
                coordinates: event_data.coordinates || [],
            } as EventType;
        }
        return {
            title: "",
            description: "",
            location: "",
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            status: "active",
            coordinates: [],
        } as EventType;
    }, [method, event_data]);

    const { data, setData, post, processing, errors, setError, clearErrors } =
        useForm<EventType>(initialData);

    // if props change while editing (unlikely but possible), overwrite form state
    // with the new values.  useForm only applies initialData on the first render,
    // so we need this effect for later updates.
    useEffect(() => {
        if (method === "edit" && event_data) {
            setData(initialData);
        }
    }, [method, event_data, initialData, setData]);

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

    const submit = (e: React.SubmitEvent) => {
        e.preventDefault();

        const url =
            method === "edit" && event_data?.id
                ? `/admin/events/edit/${event_data.id}`
                : "/admin/events/add";
        if (method === "edit") {
            return router.put(url, data, {
                showProgress: false,
                onSuccess: () => toast.success("Event updated successfully!"),
                onError: (errors) => toast.error("Failed up update event!"),
            });
        }
        post(url, {
            showProgress: false,
            // Triggered if the request is successful (Status 200-300)
            onSuccess: () => {
                toast.success("Event created successfully!");
            },
            // Triggered if there are validation errors (Status 422)
            onError: (errors) => {
                // Check if there are specific errors or just show a general message
                const errorCount = Object.keys(errors).length;
                toast.error(
                    `Failed to upload: ${errorCount} fields require attention.`,
                );
            },
            // Optional: Triggered on any finish (success or error)
            onFinish: () => {
                // Useful for stopping a loading spinner if you have one
            },
        });
    };
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
                <form className="relative" onSubmit={submit}>
                    <AnimatePresence mode="wait">
                        {step === STEPS.first_step && (
                            <motion.div>
                                <EventForm
                                    method={method}
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            </motion.div>
                        )}
                        {step === STEPS.second_step && (
                            <motion.div>
                                <GeofenceMap
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            </motion.div>
                        )}
                        {step === STEPS.third_step && (
                            <motion.div>
                                <Summary data={data} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="mt-5 flex items-center justify-between md:justify-end gap-2">
                        <Button
                            type="button"
                            variant={"outline"}
                            disabled={step === STEPS.first_step}
                            onClick={prevStep}
                        >
                            Back
                        </Button>
                        {step === STEPS.third_step ? (
                            <Button
                                key="submit-btn"
                                type="submit"
                                variant="default"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Spinner /> Submitting...
                                    </>
                                ) : (
                                    <>Submit</>
                                )}
                            </Button>
                        ) : (
                            <Button
                                key="next-btn"
                                type="button"
                                variant="outline"
                                onClick={nextStep}
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}
