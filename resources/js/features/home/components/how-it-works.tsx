import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import React from "react";

export default function HowItWorks() {
    return (
        <div id="feature" className="bg-white relative">
            <Container className="py-20 z-20 relative">
                <h1 className=" text-5xl md:text-6xl lg:text-6xl max-w-2xl font-bold ">
                    <Badge className="block bg-primary/5 border border-primary/20 font-semibold text-primary">
                        How It Works?
                    </Badge>
                    How{" "}
                    <span className=" text-primary">
                        TimeTap
                    </span>{" "}
                    Works?
                </h1>

                <div className="grid md:grid-cols-3 mt-15 gap-6">
                    {/* {features.map((feature, id) => (
                        <FeatureCard
                            key={id}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                        />
                    ))} */}
                </div>
            </Container>
        </div>
    );
}
