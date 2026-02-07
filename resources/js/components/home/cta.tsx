import React from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CTA() {
    return (
        <div className="bg-white relative">
            <div
                className={cn(
                    "absolute inset-0 ",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
            <Container
                className={
                    "relative py-30 flex flex-col  gap-10 items-center justify-center"
                }
            >
                <div className="max-w-3xl">
                    <h2 className="text-4xl text-center font-bold tracking-tight md:text-5xl">
                        Create your organization, set up events, and start
                        tracking attendance in real time with <span className="text-primary">TimeTap</span>.
                    </h2>
                </div>
                <Button size="lg">Get Started</Button>
            </Container>
        </div>
    );
}
