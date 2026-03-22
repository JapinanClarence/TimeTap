import React, { useEffect, useMemo, useState } from "react";
import Hero from "@/features/home/components/hero";
import Feature from "@/features/home/components/feature";
import Layout from "@/layouts/Layout";
import CTA from "@/features/home/components/cta";
import HowItWorks from "@/features/home/components/how-it-works";

export default function Home() {
    return (
        <Layout>
            <div id="home">
                <Hero />
                <HowItWorks/>
                <Feature />
                <CTA/>
            </div>
        </Layout>
    );
}
