import React, { useEffect, useState } from "react";
import Container from "../../components/ui/container";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Settings, Timer } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserDataProp } from "@/types/user";
import { dateOnly, formatSimpleDate } from "@/util/dateUtil";
import { Button } from "../../components/ui/button";
import Sheet from "../../components/app/Sheet";

interface PageProps {
    auth: { user: UserDataProp };
    [key: string]: unknown;
}

export default function MobileHeader() {
    const page = usePage<PageProps>();
    const { auth } = page.props;
    const [openSheet, setOpenSheet] = useState(false);
    const { post } = useForm();
    const handleLogout = () => {
        console.log("pressed");
        post("/logout");
    };

    return (
        <header className="fixed top-0 z-50 w-full border-b bg-background ">
            <Container className="mx-auto flex items-center justify-between py-3 ">
                {/* <Link href={"/"}>
                    <div className="flex items-end rounded-full h-10 w-10">
                        <h2 className="text-2xl font-extrabold text-transparent inline-block bg-linear-to-r from-primary to-timetap-accent  bg-clip-text">
                            TimeTap
                        </h2>
                    </div>
                </Link> */}
                <div className="flex gap-3">
                    <Avatar className="size-12">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                            // className="grayscale"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="">
                        <p className="text-muted-foreground text-sm">
                            Good Morning,
                        </p>
                        <h2 className="font-semibold text-xl">
                            {auth?.user.first_name} {auth?.user.last_name}
                        </h2>
                    </div>
                </div>
                <div>
                    <Button
                        variant={"ghost"}
                        size={"icon-lg"}
                        onClick={(e) => {
                            (e.currentTarget as HTMLButtonElement).blur(); // Manually remove focus
                            setOpenSheet(true);
                        }}
                    >
                        <Settings />
                    </Button>
                </div>
            </Container>
            <Sheet
                open={openSheet}
                onClose={() => setOpenSheet(false)}
                onLogout={handleLogout}
            />
        </header>
    );
}
