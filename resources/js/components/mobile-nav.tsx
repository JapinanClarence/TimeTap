import { ScanQrCode } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Container from "./ui/container";
import {
    HomeIcon,
    CalendarIcon,
    BellIcon,
    UserIcon,
} from "@heroicons/react/24/solid";
import {
    HomeIcon as HomeOutline,
    CalendarIcon as CalendarOutline,
    BellIcon as BellOutline,
    UserIcon as UserOutline,
    BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
export default function MobileNav() {
    const [visible, setVisible] = useState(true);

    const lastScrollY = useRef(0);
    const ticking = useRef(false);
    //* prevent flicker near top
    //*default 80
    const SCROLL_THRESHOLD = 20;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    if (currentScrollY < SCROLL_THRESHOLD) {
                        setVisible(true);
                    } else if (currentScrollY > lastScrollY.current) {
                        // scrolling down → show nav
                        setVisible(false);
                    } else {
                        // scrolling up → hide nav
                        setVisible(true);
                    }

                    lastScrollY.current = currentScrollY;
                    ticking.current = false;
                });

                ticking.current = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    // * If you want a non transparent bg use bg-[#b6cbfb]

    return (
        <nav
            className={`fixed bottom-0 left-0 right-0 px-4 py-4 
            rounded-tr-3xl
            rounded-tl-3xl
            
            bg-primary/20 backdrop-blur-sm 
            shadow-2xl
            transition-all duration-300 ease-in-out
            ${
                visible
                    ? "translate-y-px opacity-100"
                    : "translate-y-20 opacity-0"
            }`}
        >
            <Container className="flex flex-row justify-between">
                <div className="flex items-center justify-center flex-col text-primary">
                    <HomeIcon className="size-6 text-primary" />
                    <Link href={"/app"} className="text-xs">
                        Home
                    </Link>
                </div>
                <div className="flex items-center justify-center flex-col text-primary">
                    <CalendarOutline className="size-6 text-primary" />
                    <span className="text-xs">Schedule</span>
                </div>
                <div className="flex relative items-center justify-center flex-col text-primary">
                    {/* Gradient Border Wrapper */}
                    <div className="absolute  -top-10 rounded-full bg-linear-to-r from-timetap-primary via-timetap-accent to-timetap-secondary p-1 shadow-lg">
                        {/* Inner White Container */}
                        <div className="rounded-full bg-white p-3 flex items-center justify-center">
                            <Link href="/app/qr">
                                <ScanQrCode className="text-primary" />
                            </Link>
                        </div>
                    </div>

                    <span className="text-xs absolute bottom-0">QR</span>
                </div>
                <div className="flex items-center justify-center flex-col text-primary">
                    <BuildingOffice2Icon className="size-6 text-primary" />
                    <span className="text-xs">Teams</span>
                </div>
                <div className="flex items-center justify-center flex-col text-primary">
                    <UserOutline className="size-6 text-primary" />
                    <span className="text-xs">Profile</span>
                </div>
            </Container>
        </nav>
    );
}
