import { TypewriterEffect } from "../../../components/ui/typewriter-effect";
import Container from "@/components/ui/container";
import GradientBg from "@/components/ui/gradient-bg";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import IdCard from "./id-card";
import { CometCard } from "@/components/ui/comet-card";

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
            <Container className="flex flex-wrap pt-12 md:pt-0 h-screen  md:h-full items-center">
                <div className="flex-1 mt-10 md:mt-0">
                    <div className="max-w-lg">
                        <Badge className=" bg-primary/5 border border-primary/20 font-semibold text-primary">
                            <Check /> QR-powered attendance tracking
                        </Badge>
                        <h1 className="inline-block bg-linear-to-r from-timetap-primary via-timetap-accent to-timetap-secondary bg-clip-text text-5xl md:text-6xl lg:text-[5em]  md:leading-20 font-extrabold text-transparent">
                            Welcome to TimeTap
                        </h1>
                        {/* <p className="text-2xl md:text-3xl font-bold">Scan. Tap. Attend.</p> */}
                        <TypewriterEffect
                            cursorClassName={"w-[3px] lg:h-6"}
                            className={"text-start lg:text-2xl"}
                            words={words}
                        />
                        <p className="text-gray-700 ">
                            Create events, scan QR codes, and track attendance
                            in real time all in one scalable platform.
                        </p>
                    </div>
                </div>

                <div className="flex-1 flex items-center  justify-center md:flex-none md:shrink">
                    <CometCard rotateDepth={12} translateDepth={1}>
                        <button
                            type="button"
                            className=" my-10 flex w-70 md:w-80 cursor-pointer flex-col items-stretch rounded-xl border-0 bg-[#1F2121]saturate-0 md:my-20"
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
