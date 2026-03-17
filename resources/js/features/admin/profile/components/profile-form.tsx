import React, { useState } from "react";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, router, useForm } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { UserType } from "@/types/user";
import { Textarea } from "@/components/ui/textarea";
import { OrganizationType } from "@/types/organization";
import { profileSchema } from "../schema/profile.schema";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfileFormProps {
    id: string;
    name: string;
    description: string;
    first_name: string;
    last_name: string;
    email: string;
}

export default function ProfileForm({
    id,
    first_name,
    last_name,
    email,
    name,
    description,
}: ProfileFormProps) {
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
        first_name: first_name || "",
        last_name: last_name || "",
        email: email || "",
        name: name || "",
        description: description || "",
    });
    const [loading, setLoading] = useState(false);
    const isMobile = useIsMobile();

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
            `/admin/profile/edit/${id}`,
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
                onError: (error) => {
                    reset();
                    toast.error(error.message);
                },
            },
        );
    };
    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup>
                <div className="grid lg:grid-cols-2 gap-5">
                    <div className="md:border rounded-xl md:shadow-xs md:p-5">
                        <FieldSet>
                            <FieldLegend>Organization Details</FieldLegend>
                            <FieldDescription>
                                Edit organization details
                            </FieldDescription>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="name">
                                        Organization Name
                                    </FieldLabel>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className={`bg-white
                                            ${errors.name ? "border-destructive" : ""}
                                        `}
                                    />
                                    {errors.name && (
                                        <FieldError className="text-xs">
                                            {errors.name}
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
                                        className={`bg-white
                                            ${errors.description ? "border-destructive" : ""}
                                        `}
                                    />
                                    {errors.description && (
                                        <FieldError className="text-xs">
                                            {errors.description}
                                        </FieldError>
                                    )}
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </div>
                    {isMobile && (<FieldSeparator/>)}
                    <div className="md:border rounded-xl md:shadow-xs md:p-5">
                        <FieldSet>
                            <FieldLegend>Account Details</FieldLegend>
                            <FieldDescription>
                                Update personal info
                            </FieldDescription>
                            <FieldGroup>
                                <Field className={"grid md:grid-cols-2 gap-4"}>
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
                                            className={`bg-white
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
                                            className={`bg-white
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
                                    <FieldLabel htmlFor="organzation_name">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        id="organization_name"
                                        type="text"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className={`bg-white
                                            ${errors.email ? "border-destructive" : ""}
                                        `}
                                    />
                                    {errors.email && (
                                        <FieldError className="text-xs">
                                            {errors.email}
                                        </FieldError>
                                    )}
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                    </div>
                </div>
                <Field className="md:justify-end" orientation="responsive">
                    <Button className="w-full md:w-min" type="submit">
                        {loading ? <Spinner /> : "Submit"}
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
