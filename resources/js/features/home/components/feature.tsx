import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { ScanQrCode, MapPinned, TrendingUp } from "lucide-react";
import Container from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

const features = [
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

export default function Feature() {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const { scrollYProgress: entranceProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "start start"],
    });

    const y = useTransform(entranceProgress, [0, 1], ["8%", "0%"]);

    return (
        <div
            ref={targetRef}
            id="feature"
            className="relative h-[300vh] rounded-[2rem] md:rounded-[5rem] bg-primary shadow-[0_-24px_60px_rgba(0,0,0,0.18)]"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <motion.div
                    style={{ y }}
                    className="h-full w-full flex flex-col justify-center"
                >
                    <Container className="flex flex-col h-full justify-center gap-6 py-16 md:py-20">

                        {/* Section header */}
                        <div className="flex flex-col items-start gap-3 shrink-0">
                            <Badge className="w-fit bg-white border border-primary/20 font-semibold text-primary">
                                Features
                            </Badge>
                            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-2xl font-bold tracking-tight leading-tight">
                                Everything you need to manage attendance
                            </h1>
                        </div>

                        {/* Content row: text left, image right */}
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center min-h-0 flex-1">

                            {/*
                                Left: cycling text panel
                                - Mobile/tablet: fixed height so absolutely-positioned children
                                  have a bounding box to animate within
                                - lg+: self-stretches to fill the flex row, w-1/3
                            */}
                            <div className="relative w-full h-40 sm:h-48 lg:w-1/3 lg:h-auto lg:self-stretch shrink-0">
                                {features.map((feature, i) => {
                                    const step = 1 / features.length;
                                    const start = i * step;
                                    const end = (i + 1) * step;

                                    const opacity = useTransform(
                                        scrollYProgress,
                                        [start, start + step / 2, end],
                                        [0, 1, 0],
                                    );
                                    const itemY = useTransform(
                                        scrollYProgress,
                                        [start, start + step / 2, end],
                                        [20, 0, -20],
                                    );

                                    return (
                                        <motion.div
                                            key={i}
                                            style={{ opacity, y: itemY }}
                                            className="absolute inset-0 flex flex-col justify-center pointer-events-none"
                                        >
                                            <div className="bg-white w-fit p-2.5 md:p-3 rounded-2xl mb-3 md:mb-4">
                                                <feature.icon className="size-6 md:size-8 text-primary" />
                                            </div>
                                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 text-white">
                                                {feature.title}
                                            </h2>
                                            <p className="text-sm sm:text-base lg:text-lg text-gray-100 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/*
                                Right: cycling image panel
                                - Shorter on mobile so it fits alongside the header
                                - Grows taller on larger screens
                            */}
                            <div className="relative w-full flex-1 h-min md:h-[36vh] lg:h-[58vh] overflow-hidden">
                                {features.map((feature, i) => {
                                    const step = 1 / features.length;
                                    const opacity = useTransform(
                                        scrollYProgress,
                                        [
                                            i * step,
                                            i * step + 0.1,
                                            (i + 1) * step - 0.1,
                                            (i + 1) * step,
                                        ],
                                        [0, 1, 1, 0],
                                    );
                                    const scale = useTransform(
                                        scrollYProgress,
                                        [i * step, (i + 1) * step],
                                        [1.05, 1],
                                    );

                                    return (
                                        <motion.div
                                            key={i}
                                            style={{ opacity, scale }}
                                            className="absolute md:inset-0 flex items-center justify-center p-3 md:p-6 lg:p-8"
                                        >
                                            <img
                                                className="mx-auto max-h-full max-w-full object-contain border border-white/30 rounded-xl"
                                                src={feature.image}
                                                alt={`Preview of ${feature.title}`}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </Container>
                </motion.div>
            </div>
        </div>
    );
}