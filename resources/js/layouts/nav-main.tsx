import React, { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Home, User } from "lucide-react";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Feature", href: "#feature" },
];

/**
 * Sections that should flip the navbar to "light" mode (white text).
 * Add any other dark-background section IDs here.
 */
const DARK_SECTIONS = new Set(["feature"]);

export default function NavMain() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        /**
         * Watch every tracked section. When a dark section is ≥50% visible,
         * flip to white text. Falls back to dark text when none are visible.
         */
        const observers: IntersectionObserver[] = [];

        // Track how many dark sections are currently intersecting
        const visibleDarkSections = new Set<string>();

        DARK_SECTIONS.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        visibleDarkSections.add(id);
                    } else {
                        visibleDarkSections.delete(id);
                    }
                    setIsDark(visibleDarkSections.size > 0);
                },
                {
                    // Trigger when the section covers the top 10% of the viewport
                    // (where the navbar lives)
                    rootMargin: "-0px 0px -90% 0px",
                    threshold: 0,
                }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const textClass = isDark
        ? "text-white"
        : "text-dark";

    const logoAccentClass = isDark
        ? "from-white to-white"
        : "from-primary to-timetap-accent";

    const logoIconClass = isDark
        ? "text-white"
        : "text-primary";

    return (
        <header className="fixed top-0 z-50 w-full backdrop-blur-md transition-colors duration-300">
            <Container className="mx-auto flex items-center justify-between py-3">

                {/* Logo */}
                <Link href="/">
                    <div className="flex items-end">
                        <Timer className={`h-8 transition-colors duration-300 ${logoIconClass}`} />
                        <h2
                            className={`text-2xl font-extrabold text-transparent inline-block bg-linear-to-r bg-clip-text transition-all duration-300 ${logoAccentClass}`}
                        >
                            TimeTap
                        </h2>
                    </div>
                </Link>

                {/* Nav + CTA */}
                <div className="flex flex-row items-center space-x-2">

                    {/* Nav links */}
                    <ul className="hidden md:flex flex-row">
                        <li>
                            <Button
                                variant="link"
                                size="lg"
                                className={`hover:no-underline px-2 text-sm transition-colors duration-300 ${textClass}`}
                                asChild
                            >
                                <Link href="/">Home</Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="link"
                                size="lg"
                                className={`hover:no-underline px-2 text-sm transition-colors duration-300 ${textClass}`}
                                asChild
                            >
                                <a href="#feature">Feature</a>
                            </Button>
                        </li>
                    </ul>

                    {/* CTA buttons */}
                    <Button
                        className={`px-5 py-1 transition-colors duration-300 ${
                            isDark
                                ? "bg-white text-primary hover:bg-white/90"
                                : ""
                        }`}
                        asChild
                    >
                        <Link href="/login">Log in</Link>
                    </Button>

                    <Button
                        variant="outline"
                        className={`hidden md:flex px-5 py-1 transition-colors duration-300 
                            ${
                            isDark
                                ? "border-white text-white bg-white/10 hover:bg-white/20 hover:text-white"
                                : ""
                            }
                            `}
                        asChild
                    >
                        <Link href="/register">Register</Link>
                    </Button>
                </div>
            </Container>
        </header>
    );
}