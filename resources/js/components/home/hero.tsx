import React from "react";
import {
    TypewriterEffectSmooth,
    TypewriterEffect,
} from "../ui/typewriter-effect";
import Container from "@/components/ui/container";
import GradientBg from "@/components/ui/gradient-bg";

export default function Hero() {
    const words = [
        {
            text: "Scan.",
        },
        {
            text: "Tap.",
        },
        {
            text: "Attend.",
        },
    ];
    return (
       <GradientBg>
            <Container className="flex flex-col py-20 md:mt-0  md:flex-row md:h-full items-center justify-between">
                <div className="lg:w-1/2">
                    <h1 className="inline-block bg-linear-to-r from-timetap-primary via-timetap-accent to-timetap-secondary bg-clip-text text-5xl md:text-6xl lg:text-[5em]  md:leading-20 font-extrabold text-transparent">
                        Welcome to TimeTap
                    </h1>
                    {/* <p className="text-2xl md:text-3xl font-bold">Scan. Tap. Attend.</p> */}
                    <TypewriterEffect
                        cursorClassName={"w-[3px] lg:h-6"}
                        className={"text-start lg:text-2xl"}
                        words={words}
                    />
                    <p className="text-gray-700">
                        Create events, scan QR codes, and track attendance in
                        real time all in one scalable platform.
                    </p>
                </div>

                <div>
                    <div className="w-75 rounded-lg border border-timetap-border bg-timetap-background p-5 shadow-md">
                        <div className="w-full rounded-lg bg-white">
                            <img src="/images/qr-code.png" alt="" />
                        </div>
                        <h1 className="mt-1 text-sm font-bold text-slate-500">
                            TimeTap:
                        </h1>
                        <p className="mt-1 text-xs font-medium text-slate-500">
                            {" "}
                            January 20, 2025 10am-12pm
                        </p>
                        <div className="mt-2 space-y-2">
                            <div className="h-4 w-full rounded-full bg-slate-200"></div>

                            <div className="h-4 w-8/12 rounded-full bg-slate-200"></div>
                            <div className="h-4 w-5/6 rounded-full bg-slate-200"></div>
                        </div>
                    </div>
                </div>
            </Container>
        </GradientBg>
    );
}
