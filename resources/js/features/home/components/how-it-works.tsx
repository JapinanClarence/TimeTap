"use client";

import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import { Activity, Calendar, Check, Home, ScanQrCode } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
    {
        title: "Create your organization",
        desc: "Set up a workspace for your team, club, or company in seconds.",
        icon: Home,
        image: "/images/step-register.png",
    },
    {
        title: "Schedule events",
        desc: "Add events with dates, times, and locations. Members get notified automatically.",
        icon: Calendar,
        image: "/images/step-schedule.png",
    },
    {
        title: "Members scan in",
        desc: "Each member gets a unique QR code ID. Admins scan it at the door to check them in.",
        icon: ScanQrCode,
        image: "/images/step-scan.png",
    },
    {
        title: "Track attendance live",
        desc: "Watch check-ins happen in real time. Export reports and review history anytime.",
        icon: Activity,
        image: "/images/step-track.png",
    },
];

const STEP_DURATION = 5000;

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % STEPS.length);
        }, STEP_DURATION);
        return () => clearInterval(timer);
    }, [activeStep]);

    return (
        <div id="hiw" className="sticky top-0 place-content-center h-screen  bg-white overflow-hidden">
            <Container className="py-20 md:py-40 h-screen space-y-20">
                <div className="flex flex-col items-center space-y-4 mb-12">
                    <Badge className=" w-fit bg-primary/5 border border-primary/20 font-semibold text-primary">
                        <Check/> Simple by design
                    </Badge>
                    <h1 className="text-center md:text-start text-4xl md:text-6xl font-bold tracking-tight">
                        How <span className="text-primary">TimeTap</span> Works?
                    </h1>
                </div>

                <div className=" flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left: Dynamic Image Section */}
                    <div
                        className="hidden md:flex flex-1 w-full aspect-video overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeStep}
                                src={STEPS[activeStep].image}
                                alt={STEPS[activeStep].title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full border  rounded-xl object-contain"
                            />
                        </AnimatePresence>
                    </div>

                    {/* Right: Vertical Progress Steps */}
                    <div className="relative">
                        <div className=" relative z-10">
                            {STEPS.map((step, index) => {
                                const isActive = activeStep === index;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setActiveStep(index)}
                                        className="group cursor-pointer relative pb-2 last:pb-0"
                                    >
                                        <div className="flex gap-5">
                                            {/* Vertical Bar + Icon Container */}
                                            <div className="relative flex gap-5 items-center flex-none">
                                                {/* Vertical Progress Bar Overlay */}
                                                <div className="h-full w-[3.5px] bg-border rounded overflow-hidden">
                                                    {isActive && (
                                                        <motion.div
                                                            className="w-full h-full bg-primary rounded-full origin-top"
                                                            initial={{
                                                                scaleY: 0,
                                                            }}
                                                            animate={{
                                                                scaleY: 1,
                                                            }}
                                                            transition={{
                                                                duration:
                                                                    STEP_DURATION /
                                                                    1000,
                                                                ease: "linear",
                                                            }}
                                                        />
                                                    )}
                                                    {!isActive && (
                                                        <div className="w-full h-full bg-foreground opacity-[0.18]" />
                                                    )}
                                                </div>

                                                <div
                                                    className={`relative flex-none size-14 inline-flex items-center justify-center rounded-xl transition-colors duration-300 ${
                                                        isActive
                                                            ? "bg-primary text-white"
                                                            : "bg-slate-100 text-slate-500"
                                                    }`}
                                                >
                                                    {(() => {
                                                        const Icon = step.icon;
                                                        return (
                                                            <Icon size={20} />
                                                        );
                                                    })()}
                                                </div>
                                            </div>

                                            {/* Text Content */}
                                            <div
                                                className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-1" : "opacity-60"}`}
                                            >
                                                <p
                                                    className={`md:text-xl font-semibold  ${isActive ? "text-slate-900" : "text-slate-500"}`}
                                                >
                                                    {step.title}
                                                </p>
                                                <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
