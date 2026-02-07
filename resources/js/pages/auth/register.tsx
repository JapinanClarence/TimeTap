import React from "react";
import RegisterForm from "@/components/forms/register-form";
import Container from "@/components/ui/container";
import GradientBg from "@/components/ui/gradient-bg";
import AuthLayout from "@/layouts/AuthLayout";

export default function Login() {
    return (
        <AuthLayout>
            <GradientBg>
                <Container className="flex w-full items-center justify-center h-full">
                    <div className="w-full max-w-sm">
                        <RegisterForm />
                    </div>
                </Container>
            </GradientBg>
        </AuthLayout>
    );
}
