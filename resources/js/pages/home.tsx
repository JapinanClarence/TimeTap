import React, { useEffect, useMemo, useState } from "react";
import Hero from "@/components/home/hero";
import Feature from "@/components/home/feature";
import Layout from "@/layouts/Layout";
import CTA from "@/components/home/cta";

export default function Home() {
    // const [time, setTime] = useState(new Date());

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTime(new Date());
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, []);

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
