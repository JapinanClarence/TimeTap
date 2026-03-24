import { TypewriterEffect } from "../../../components/ui/typewriter-effect";
import Container from "@/components/ui/container";
import GradientBg from "@/components/ui/gradient-bg";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import IdCard from "./id-card";
import { CometCard } from "@/components/ui/comet-card";

export default function Hero() {
    const words = [
        { text: "Scan." },
        { text: "Tap." },
        { text: "Attend." },
    ];

    return (
        <GradientBg>
            <Container className="flex flex-col lg:flex-row gap-5 py-16 lg:py-0 min-h-screen items-center justify-center overflow-hidden">

                {/* ── Text ── */}
                <div className="flex-1 flex justify-center md:justify-start mt-10 md:mt-0">
                    <div className="max-w-lg space-y-4 text-center  md:text-start">
                        <Badge className="bg-primary/5 border border-primary/20 font-semibold text-primary">
                            <Check /> QR-powered attendance tracking
                        </Badge>
                        <h1 className="inline-block bg-linear-to-r from-timetap-primary via-timetap-accent to-timetap-secondary bg-clip-text text-4xl sm:text-5xl md:text-6xl lg:text-[5em] leading-tight md:leading-tight lg:leading-20 font-extrabold text-transparent">
                            Welcome to TimeTap
                        </h1>
                        <TypewriterEffect
                            cursorClassName="w-[3px] lg:h-6"
                            className="text-center md:text-start lg:text-2xl"
                            words={words}
                        />
                        <p className="text-gray-700 text-sm sm:text-base">
                            Create events, scan QR codes, and track attendance
                            in real time — all in one scalable platform.
                        </p>
                    </div>
                </div>

                {/* ── Card ── */}
                <div className="shrink-0 items-center justify-center py-4 lg:py-12">
                    <CometCard rotateDepth={12} translateDepth={1}>
                        <button
                            type="button"
                            className="flex w-full md:w-72 lg:w-80 cursor-pointer flex-col items-stretch rounded-xl border-0 bg-white"
                            aria-label="Id card"
                            style={{
                                transformStyle: "preserve-3d",
                                transform: "none",
                                opacity: 1,
                            }}
                        >
                            <IdCard />
                        </button>
                    </CometCard>
                </div>

            </Container>
        </GradientBg>
    );
}