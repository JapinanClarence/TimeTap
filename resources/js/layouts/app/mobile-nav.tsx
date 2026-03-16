import { ScanQrCode } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Container from "../../components/ui/container";
import {
    HomeIcon,
    CalendarIcon,
    BellIcon,
    UserIcon,
    BuildingOffice2Icon as BuildingIcon,
} from "@heroicons/react/24/solid";
import {
    HomeIcon as HomeOutline,
    CalendarIcon as CalendarOutline,
    UserIcon as UserOutline,
    BuildingOffice2Icon as BuildingOutline,
} from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";

const navItems = [
    {
        label: "Home",
        href: "/app",
        activeIcon: HomeIcon,
        inactiveIcon: HomeOutline,
    },
    {
        label: "Schedule",
        href: "/app/schedule",
        activeIcon: CalendarIcon,
        inactiveIcon: CalendarOutline,
    },
    {
        label: "Teams",
        href: "/app/organizations",
        activeIcon: BuildingIcon,
        inactiveIcon: BuildingOutline,
    },
    {
        label: "Profile",
        href: "/app/profile",
        activeIcon: UserIcon,
        inactiveIcon: UserOutline,
    },
];

export default function MobileNav() {
    const { url } = usePage();
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
    // * If you want a non transparent bg use bg-tertiary

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
                {navItems.map((item) => {
                    // Check if the current URL starts with the href
                    const isActive =
                        item.href === "/app"
                            ? url === item.href
                            : url.startsWith(item.href);

                    const Icon = isActive ? item.activeIcon : item.inactiveIcon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center transition-colors ${
                                isActive
                                    ? "text-primary"
                                    : "text-primary/80"
                            }`}
                        >
                            <Icon className="size-6" />
                            <span className="text-xs font-medium">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </Container>
        </nav>
    );
}

//center icon for qr
{
    /* <div className="flex relative items-center justify-center flex-col text-primary">
                    <div className="absolute  -top-10 rounded-full bg-linear-to-r from-timetap-primary via-timetap-accent to-timetap-secondary p-1 shadow-lg">
                        <div className="rounded-full bg-white p-3 flex items-center justify-center">
                            <Link href="/app/qr">
                                <ScanQrCode className="text-primary" />
                            </Link>
                        </div>
                    </div>

                    <span className="text-xs absolute bottom-0">QR</span>
                </div> */
}
