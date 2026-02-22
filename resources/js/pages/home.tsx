import React, { useEffect, useMemo, useState } from "react";
import Hero from "@/components/home/hero";
import Feature from "@/components/home/feature";
import Layout from "@/layouts/Layout";
import CTA from "@/components/home/cta";

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
