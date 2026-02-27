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
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { Spinner } from "@/components/ui/spinner";
import { ArrowUpRight, Building, Eye, EyeClosed } from "lucide-react";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        post("/auth/login", {
            showProgress: false
        });
    };

    const handleShowPassword = () => {
        if (showPassword) {
            return setShowPassword(false);
        }
        return setShowPassword(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="text"
                            placeholder="m@example.com"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                            <FieldError className="text-sm">
                                {errors.email}
                            </FieldError>
                        )}
                    </Field>
                    <Field>
                        <div className="flex items-center">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <a
                                href="#"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </a>
                        </div>
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
                                                handleShowPassword()
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
                                                handleShowPassword()
                                            }
                                        >
                                            <EyeClosed className="" />
                                        </Button>
                                    )}
                                </div>
                        {errors.password && (
                            <FieldError className="text-sm">
                                {errors.password}
                            </FieldError>
                        )}
                    </Field>
                    <Field>
                        <Button type="submit" disabled={processing}>
                            {processing && <Spinner />}
                            Login
                        </Button>
                        <FieldSeparator>Or</FieldSeparator>
                        <Button variant="outline" type="button">
                            Login with Google
                        </Button>
                        <div className="w-full inline-flex  border rounded-md  p-2 text-sm font-medium mb-2">
                            <Building
                                className="inline-block mr-2 text-slate-700"
                                width={40}
                                height={40}
                                strokeWidth={1.5}
                            />
                            <div className="">
                                Creating an account for a team?
                                <br />
                                <Link className="text-primary hover:underline" href={"/register/organization"}>
                                    Create an organization account{" "}
                                    <ArrowUpRight className="inline-block w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                        <FieldDescription className="text-center">
                            Don&apos;t have an account?{" "}
                            <Link href="/register">Sign up</Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
}
