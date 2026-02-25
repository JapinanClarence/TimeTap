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
import { Eye, EyeClosed } from "lucide-react";
import PasswordStrength from "../../../components/ui/password-strength";

const passwordType = {
    password: "pass",
    confirmPass: "confirmPass",
};

export default function RegisterForm() {
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<Boolean>(false);
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
        post("/auth/register");
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
        <div className="">
            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <Field className={"grid md:grid-cols-2 gap-4"}>
                        <Field>
                            <FieldLabel htmlFor="first_name">
                                First Name
                            </FieldLabel>
                            <Input
                                id="first_name"
                                type="text"
                                placeholder="Firstname..."
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
                            <FieldLabel htmlFor="last_name">
                                Last Name
                            </FieldLabel>
                            <Input
                                id="last_name"
                                type="text"
                                placeholder="Lastname..."
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
                                <FieldLabel htmlFor="password">
                                    Password
                                </FieldLabel>
                                <div className="relative w-full">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
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

                                    {showPassword ? (
                                        <Button
                                            className="z-10 absolute top-0 right-0 h-full"
                                            size={"icon-sm"}
                                            variant={"ghost"}
                                            type="button"
                                            onClick={() =>
                                                handleShowPassword("pass")
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
                                                handleShowPassword("pass")
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
                        <FieldSeparator>Or</FieldSeparator>
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
        </div>
    );
}
