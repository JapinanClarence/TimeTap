import React from "react";
import { Badge } from "@/components/ui/badge";
import {
    Building2,
    Database,
    Key,
    KeyRound,
    LockKeyhole,
    ScanQrCode,
    TabletSmartphone,
    TrendingUp,
} from "lucide-react";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "QR-Based Attendance",
        description:
            "Generate unique QR codes for each event and let attendees check in instantly. Attendance is recorded in real time with accurate timestamps—no paper, no delays.",
        icon: ScanQrCode,
    },
    {
        title: "Organization Management",
        description:
            "Create organizations, invite members, and assign roles with ease. Manage events and attendance securely across teams, all from one platform.",
        icon: Building2,
    },
    {
        title: "Attendance Reports & Insights",
        description:
            "Access detailed attendance records, track participation trends, and export reports anytime. Turn attendance data into clear, actionable insights.",
        icon: TrendingUp,
    },
    {
        title: "Secure & Scalable by Design",
        description:
            "Optimized for large-scale events and multiple organizations. QR codes are secured with expiration and session validation.",
        icon: LockKeyhole,
    },
    {
        title: "Responsive",
        description:
            "Access TimeTap seamlessly across desktops, tablets, and mobile devices. The interface adapts automatically, ensuring a smooth experience wherever attendance is managed or recorded.",
        icon: TabletSmartphone,
    },
    {
        title: "Centralized Database",
        description:
            "All attendance records, events, and organization data are stored in a single, secure database. This ensures consistency, easy access, and reliable reporting across all devices and teams.",
        icon: Database,
    },
];

// feature card component
function FeatureCard({
    title,
    description,
    icon: Icon,
}: {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}) {
    return (
        <div className="group py-6 transition-all duration-200 ease-in-out hover:ml-2">
            <div className="">
                <Icon className="mb-2 " />
            </div>

            <div className="relative ">
                {/* <div className="absolute left-0 w-1 h-6.25 bg-black/20 backdrop-blur-md rounded-md transition-all duration-200 ease-in-out group-hover:h-8" /> */}
                <h2 className="mb-2 font-semibold leading-none ">{title}</h2>
            </div>
            <p className=" text-sm text-muted-foreground text-pretty  ">
                {description}
            </p>
        </div>
    );
}

export default function Feature() {
    return (
        <div id="feature" className="bg-white relative">
            {/* <div
                className={cn(
                    "absolute inset-0 ",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div> */}
            <Container className="py-20 z-20 relative">
                <h1 className=" text-5xl md:text-6xl lg:text-6xl max-w-2xl font-bold ">
                    <Badge className="block mb-2 border border-primary bg-primary/10 text-primary font-semibold">
                        Features
                    </Badge>
                    Everything you need to manage attendance
                </h1>

                <div className="grid md:grid-cols-3 mt-15 gap-6">
                    {features.map((feature, id) => (
                        <FeatureCard
                            key={id}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
}
