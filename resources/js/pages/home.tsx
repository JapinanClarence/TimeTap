import React, { useEffect, useMemo, useState } from "react";
import Hero from "@/features/home/components/hero";
import Feature from "@/features/home/components/feature";
import Layout from "@/layouts/Layout";
import CTA from "@/features/home/components/cta";

export default function Home() {
    return (
        <Layout>
            <div id="home">
                <Hero />
                <Feature />
                <CTA/>
            </div>
        </Layout>
    );
}
