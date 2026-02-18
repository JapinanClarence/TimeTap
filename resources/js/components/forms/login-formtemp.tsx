import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
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
import { ArrowUpRight, Building, } from "lucide-react";

export default function LoginForm() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        console.log(data);
        post("/login");
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to you account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="m@example.com"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className={
                                        errors.email ? "border-destructive" : ""
                                    }
                                />
                                {errors.email && (
                                    <FieldError className="text-sm">
                                        {errors.email}
                                    </FieldError>
                                )}
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
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
                                {errors.password && (
                                    <FieldError className="text-sm">
                                        {errors.password}
                                    </FieldError>
                                )}
                            </Field>
                            <Field>
                                <Button type="submit" disabled={processing}>
                                    {" "}
                                    {processing && <Spinner />}
                                    Log in
                                </Button>
                                <FieldSeparator>Or</FieldSeparator>
                                <Button variant="outline" type="button">
                                    Login with Google
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/register">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
