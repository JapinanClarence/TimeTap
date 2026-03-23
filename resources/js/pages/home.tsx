"use client";

import Hero from "@/features/home/components/hero";
import Feature from "@/features/home/components/feature";
import Layout from "@/layouts/Layout";
import CTA from "@/features/home/components/cta";
import HowItWorks from "@/features/home/components/how-it-works";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Home() {
    /**
     * A single scroll container spanning [HowItWorks + Feature].
     *
     * scrollYProgress 0 → 1 covers the full height of this container.
     * The first ~25% of that is the "Feature sliding in" window —
     * we use it to push HIW up, scale it down, and fade it out.
     */
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const hiwY       = useTransform(scrollYProgress, [0, 0.25], ["0%", "-8%"]);
    const hiwScale   = useTransform(scrollYProgress, [0, 0.25], [1, 0.94]);
    const hiwOpacity = useTransform(scrollYProgress, [0, 0.2],  [1, 0]);

    return (
        <Layout>
            <div id="home" className="relative bg-white">
                <Hero />

                {/*
                    Shared container: gives HIW and Feature a common scroll
                    timeline so they animate relative to each other.
                */}
                <div ref={containerRef} className="relative">

                    {/* HIW — sticky, shrinks + fades as Feature arrives */}
                    <div className="sticky top-0 z-10 h-screen overflow-hidden">
                        <motion.div
                            style={{ y: hiwY, scale: hiwScale, opacity: hiwOpacity }}
                            className="h-full w-full"
                        >
                            <HowItWorks />
                        </motion.div>
                    </div>

                    {/* Feature — slides up over HIW */}
                    <div className="relative z-20">
                        <Feature />
                    </div>
                </div>

                <CTA />
            </div>
        </Layout>
    );
}