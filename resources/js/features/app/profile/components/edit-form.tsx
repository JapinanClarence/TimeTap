import React, { useState } from "react";
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
import { Link, router, useForm } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { profileSchema } from "../schema/profile.schema";
import { toast } from "sonner";
import { UserType } from "@/types/user";

interface EditFormProps extends UserType {
 onClose : () => void;   
}

export default function EditForm({
    id,
    first_name,
    last_name,
    email,
    gender,
    onClose
}: EditFormProps) {
    const { data, setData, post, processing, errors, setError, clearErrors } =
        useForm({
            first_name: first_name || "",
            last_name: last_name || "",
            email: email || "",
            gender: gender || "",
        });
    const [loading, setLoading] = useState(false);


    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        clearErrors();

        // 1. Local Validation
        const result = profileSchema.safeParse(data);

        if (!result.success) {
            // 2. Map Zod errors to Inertia errors
            result.error.issues.forEach((error) => {
                setError(error.path[0] as any, error.message);
            });
            return;
        }

        // 3. Submit if successful
        router.put(
            `/app/profile/edit/${id}`,
            {
                ...data,
            },
            {
                showProgress: false,
                preserveScroll: true,
                onBefore: () => setLoading(true),
                onFinish: () => setLoading(false),
                onSuccess: () => {
                    toast.success("Profile updated successfully");
                },
            },
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup>
                <Field className={"grid md:grid-cols-2 gap-4"}>
                    <Field>
                        <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                        <Input
                            id="first_name"
                            type="text"
                            placeholder=""
                            value={data.first_name}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            className={`bg-gray-100/50
                                ${errors.first_name ? "border-destructive" : ""}
                            `}
                        />
                        {errors.first_name && (
                            <FieldError className="text-xs">
                                {errors.first_name}
                            </FieldError>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                        <Input
                            id="last_name"
                            type="text"
                            placeholder=""
                            value={data.last_name}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            className={`bg-gray-100/50
                                ${errors.last_name ? "border-destructive" : ""}
                            `}
                        />
                        {errors.last_name && (
                            <FieldError className="text-xs">
                                {errors.last_name}
                            </FieldError>
                        )}
                    </Field>
                </Field>

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className={`bg-gray-100/50
                                ${errors.email ? "border-destructive" : ""}
                            `}
                    />
                    {errors.email && (
                        <FieldError className="text-xs">
                            {errors.email}
                        </FieldError>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="gender">Gender</FieldLabel>
                    <Select
                        value={data.gender}
                        onValueChange={(value) => setData("gender", value)}
                    >
                        <SelectTrigger size="lg" className="w-full bg-gray-100/50">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectGroup>
                                <SelectLabel>Gender</SelectLabel>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.gender && (
                        <FieldError className="text-xs">
                            {errors.gender}
                        </FieldError>
                    )}
                </Field>
                <Field className="md:justify-end " orientation="responsive">
                    <Button className="w-full md:w-min" type="submit">
                        {loading && <Spinner />}
                        Save
                    </Button>
                    <Button
                        onClick={onClose}
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
