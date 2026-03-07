import React, { useEffect, useState } from "react";
import Container from "../../components/ui/container";
import { Link, useForm, usePage } from "@inertiajs/react";
import { ArrowLeft, Bell, Settings, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecondaryHeader() {
    const handleBack = () => {
        // Standard browser back behavior
        window.history.back();
    };
    return (
        <header className="fixed top-0 z-50 w-full border-b bg-background ">
            <Container className="mx-auto flex items-center justify-between h-16 ">
                <div className="flex gap-3">
                    <Button variant={"ghost"} onClick={handleBack}>
                        <ArrowLeft />
                        Back
                    </Button>
                </div>
            </Container>
        </header>
    );
}
