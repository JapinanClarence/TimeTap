import React from "react";
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventType } from "@/types/event";
import { type DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Clock2Icon } from "lucide-react";
import { DatePicker } from "./date-picker";

interface EventFormProps {
    data: EventType;
    setData: (key: keyof EventType, value: string) => void;
    errors: any;
    method:string;
}

export default function EventForm({ data, setData, errors, method }: EventFormProps) {
    const [date, setDate] = React.useState<Date | undefined>(
        new Date(new Date().getFullYear(), new Date().getMonth(), 12),
    );
    return (
        <div>
            <div className="mb-2">
                <div>
                    <h1 className="font-semibold">{`${method === "edit" && "Edit"} Basic Information`}</h1>
                    <p className="text-sm text-muted-foreground">
                        Complete the required fields below to configure your event's primary details.
                    </p>
                </div>
            </div>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                        id="title"
                        type="text"
                        placeholder="Enter event title..."
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                        <FieldError className="text-xs">
                            {errors.title}
                        </FieldError>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                        id="description"
                        placeholder="Event description..."
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className={
                            errors.description ? "border-destructive" : ""
                        }
                    />
                    {errors.description && (
                        <FieldError className="text-xs">
                            {errors.description}
                        </FieldError>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="location">Location</FieldLabel>
                    <Input
                        id="location"
                        type="text"
                        placeholder=""
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                        className={errors.location ? "border-destructive" : ""}
                    />
                    {errors.location && (
                        <FieldError className="text-xs">
                            {errors.location}
                        </FieldError>
                    )}
                </Field>
                {/* Should be a modal */}
                <Field className="grid md:grid-cols-2">
                    <DatePicker
                        label="Start Date"
                        value={data.start_date}
                        error={errors.start_date}
                        onChange={(date) =>
                            setData(
                                "start_date",
                                date ? date.toISOString() : "",
                            )
                        }
                    />
                    <DatePicker
                        label="End Date"
                        value={data.end_date}
                        error={errors.end_date}
                        onChange={(date) =>
                            setData("end_date", date ? date.toISOString() : "")
                        }
                    />
                </Field>
                <Field className="grid grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
                        <InputGroup
                            className={
                                errors.start_time ? "border-destructive" : ""
                            }
                        >
                            <InputGroupInput
                                id="time-from"
                                type="time"
                                step="1"
                                value={data.start_time}
                                onChange={(e) =>
                                    setData("start_time", e.target.value)
                                }
                                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                            <InputGroupAddon>
                                <Clock2Icon className="text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.start_time && (
                            <FieldError className="text-xs">
                                {errors.start_time}
                            </FieldError>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="time-to">End Time</FieldLabel>
                        <InputGroup
                            className={
                                errors.end_time ? "border-destructive" : ""
                            }
                        >
                            <InputGroupInput
                                id="time-to"
                                type="time"
                                step="1"
                                value={data.end_time}
                                onChange={(e) =>
                                    setData("end_time", e.target.value)
                                }
                                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                            <InputGroupAddon>
                                <Clock2Icon className="text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.end_time && (
                            <FieldError className="text-xs">
                                {errors.end_time}
                            </FieldError>
                        )}
                    </Field>
                </Field>
            </FieldGroup>
        </div>
    );
}
