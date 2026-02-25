import React from "react";
import { Timer } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { AuthLayoutProps } from "@/types/ui";

export default function AuthLayout({ children }: AuthLayoutProps) {
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

                    <div className="flex flex-row  items-center space-x-2">
                        <Button className="px-5 py-1 ">
                            <Link href={"/login"}>Log in</Link>
                        </Button>
                        <Button variant="outline" className="px-5 py-1">
                            <Link href={"/register"}>Register</Link>
                        </Button>
                    </div>
                </Container>
            </header>
            <main>{children}</main>
        </>
    );
}
