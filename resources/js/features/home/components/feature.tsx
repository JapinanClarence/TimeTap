"use client";

import { useEffect, useRef, useState } from "react";
import { ScanQrCode, MapPinned, TrendingUp, LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Feature {
    title: string;
    description: string;
    icon: LucideIcon;
    image: string;
}

const features: Feature[] = [
    {
        title: "QR-Based Attendance",
        description:
            "Generate unique QR codes for each event and let attendees check in instantly.",
        icon: ScanQrCode,
        image: "/images/qr-preview.png",
    },
    {
        title: "Geofence Verification",
        description:
            "Ensure presence with location-based check-ins using virtual boundaries.",
        icon: MapPinned,
        image: "/images/geofence-preview.png",
    },
    {
        title: "Advanced Insights",
        description:
            "Access detailed attendance records and track participation trends.",
        icon: TrendingUp,
        image: "/images/step-track.png",
    },
];

export default function StickyFeaturesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const SCROLL_PER_SLIDE = window.innerHeight * 0.9;

        const handleScroll = () => {
            const section = sectionRef.current;
            if (!section) return;

            const scrolledIntoSection = -section.getBoundingClientRect().top;

            if (scrolledIntoSection < 0) {
                setActiveIndex(0);
                return;
            }

            const index = Math.min(
                Math.floor(scrolledIntoSection / SCROLL_PER_SLIDE),
                features.length - 1,
            );
            setActiveIndex(Math.max(0, index));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* ── Intro ── */}
            {/* <div className="relative min-h-[90vh] bg-white flex justify-center items-center px-6 py-24">
                <div className="max-w-lg text-center">
                    <p className="text-xs font-medium tracking-widest uppercase text-neutral-400 mb-5">
                        Attendance, reimagined
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 mb-6">
                        <span className="relative inline-block">
                            One platform
                            <span className="absolute bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-primary" />
                        </span>{" "}
                        &amp; zero attendance headaches
                    </h2>
                    <p className="text-base text-neutral-500 leading-relaxed max-w-sm mx-auto">
                        From QR check-ins to geofenced verification — we handle
                        the complexity so you can focus on running great events.
                    </p>
                </div>
            </div> */}

            {/* ── Sticky section ── */}
            <section
                ref={sectionRef}
                id="feature"
                className="relative bg-primary rounded-3xl -mt-8 z-10"
                style={{ height: `${features.length * 90}vh` }}
            >
                <div className="sticky top-[5vh] h-[90vh] flex flex-col gap-5 items-stretch container mx-auto py-16 px-8 lg:px-10 xl:px-30">
                    <div className="flex flex-col items-start gap-3 shrink-0">
                        <Badge className="w-fit bg-white border border-primary/20 font-semibold text-primary">
                            Features
                        </Badge>
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-2xl font-bold tracking-tight leading-tight">
                            Everything you need to manage attendance
                        </h1>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-[0.60fr_1fr] gap-5 h-full">
                        {/* ── Left panel ── */}
                        <div className=" bg-white border aspect-square md:aspect-auto rounded-2xl p-7 place-content-center flex flex-col justify-between ">
                            {/* Feature content */}
                            <div className="relative flex-1">
                                {features.map((feature, i) => {
                                    const Icon = feature.icon;
                                    const isActive = activeIndex === i;
                                    return (
                                        <div
                                            key={feature.title}
                                            className={`absolute inset-0 flex flex-col space-y-5 aspect-square transition-all duration-500 ${
                                                isActive
                                                    ? "opacity-100 translate-y-0 pointer-events-auto"
                                                    : "opacity-0 translate-y-3 pointer-events-none"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 mb-5">
                                                <span className="w-9 h-9 rounded-xl bg-white border   flex items-center justify-center shrink-0">
                                                    <Icon
                                                        size={18}
                                                        strokeWidth={1.8}
                                                    />
                                                </span>
                                                <span className="text-xs font-semibold tracking-widest ">
                                                    0{i + 1}
                                                </span>
                                            </div>

                                          <Separator/>

                                            <h3 className="text-2xl md:text-[1.75rem] font-bold  leading-tight tracking-tight mb-4">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            <Separator/>
                            {/* Bottom row */}
                            <div className="flex items-center justify-between pt-5">
                                {/* Step dots */}
                                <div className="flex items-center gap-1.5">
                                    {features.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                activeIndex === i
                                                    ? "w-5 bg-black"
                                                    : "w-1.5 bg-neutral-200"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ── Right panel ── */}
                        <div className="relative  rounded-2xl overflow-hidden hidden md:block">
                            {features.map((feature, i) => {
                                const Icon = feature.icon;
                                const isActive = activeIndex === i;
                                return (
                                    <div
                                        key={feature.title}
                                        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                                            isActive
                                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                                : "opacity-0 translate-y-4 pointer-events-none"
                                        }`}
                                    >
                                        <img
                                            className="h-full w-full border object-cover rounded-2xl "
                                            src={feature.image}
                                            alt={`Preview of ${feature.title}`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
