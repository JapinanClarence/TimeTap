import React, { useState } from "react";
import { Timer } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Home, User, Mail } from "lucide-react";

export default function NavMain() {  

    const navItems = [
        {
            name: "Home",
            link: "/",
            icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
            name: "Feature",
            link: "#feature",
            icon: <User className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
    ];

    return (
        <>
            <header className="fixed top-0 z-50 w-full  backdrop-blur-md">
                <Container className="mx-auto flex items-center justify-between py-3 ">
                    <Link href={"/"}>
                        <div className="flex items-end">
                            <Timer className="h-8 text-primary" />
                            <h2 className="text-2xl font-extrabold text-transparent inline-block bg-linear-to-r from-primary to-timetap-accent  bg-clip-text">
                                TimeTap
                            </h2>
                        </div>
                    </Link>

                    <div className="hidden md:flex flex-row  items-center space-x-2">
                        <div>
                            <ul className="flex flex-row ">
                                <li>
                                    <Button
                                        variant="link"
                                        size="lg"
                                        className="hover:no-underline px-2 text-sm text-dark "
                                    >
                                        <Link href="/">Home</Link>
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        variant="link"
                                        size="lg"
                                        className="hover:no-underline px-2 text-sm text-dark "
                                    >
                                        <Link href="#feature">Feature</Link>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                        <Button className="px-5 py-1 ">
                            <Link href={"/login"}>Log in</Link>
                        </Button>
                        <Button variant="outline" className="px-5 py-1">
                            <Link href={"/register"}>Register</Link>
                        </Button>
                    </div>
                </Container>
            </header>
        </>
    );
}
