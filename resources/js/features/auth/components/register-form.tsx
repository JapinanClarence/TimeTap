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
import { Link, useForm } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import PasswordStrength from "../../../components/ui/password-strength";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

const passwordType = {
    password: "pass",
    confirmPass: "confirmPass",
};

export default function RegisterForm() {
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPasswords, setShowPasswords] = React.useState({
        old_password: false,
        password: false,
        password_confirmation: false,
    });
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!isPasswordValid) return;
        post("/auth/register", {
            showProgress: false,
        });
    };

    const handleToggleVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
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
                            className={
                                errors.first_name ? "border-destructive" : ""
                            }
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
                            className={
                                errors.last_name ? "border-destructive" : ""
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
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                        <FieldError className="text-xs">
                            {errors.email}
                        </FieldError>
                    )}
                </Field>
                <Field>
                    <Field className="grid md:grid-cols-2 gap-4">
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <InputGroup className="bg-white">
                                <InputGroupInput
                                    type={
                                        showPasswords.password
                                            ? "text"
                                            : "password"
                                    }
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
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
                                    {errors.password_confirmation}
                                </FieldError>
                            )}
                        </Field>
                    </Field>
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
                    <Button type="submit" disabled={!isPasswordValid}>
                        {processing && <Spinner />}
                        Register
                    </Button>
                    <FieldSeparator className="">Or</FieldSeparator>
                    <Button variant="outline" type="button">
                        Register with Google
                    </Button>

                    <FieldDescription className="text-center">
                        Already have an account?{" "}
                        <Link href="/login">Sign in</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    );
}
