"use client";

import Hero from "@/features/home/components/hero";
import Layout from "@/layouts/Layout";
import CTA from "@/features/home/components/cta";
import HowItWorks from "@/features/home/components/how-it-works";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import StickyFeaturesSection from "@/features/home/components/feature";

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

    const hiwY = useTransform(scrollYProgress, [0.15, 0.35], ["0%", "-8%"]);
    const hiwScale = useTransform(scrollYProgress, [0.15, 0.35], [1, 0.94]);
    const hiwOpacity = useTransform(scrollYProgress, [0.15, 0.3], [1, 0]);

    return (
        <Layout>
            <div id="home" className="relative bg-white">
                <Hero />
                <HowItWorks/>
                <StickyFeaturesSection />
                <CTA />
            </div>
        </Layout>
    );
}
