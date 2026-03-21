import React, { useEffect, useState } from "react";
import Container from "../../components/ui/container";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Bell, Settings, Timer } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/types/user";
import { Button } from "@/components/ui/button";
import Sheet from "@/features/app/settings/Sheet";

interface Paginated<T> {
    data: T;
    links: any[];
    meta: any;
}

interface PageProps {
    auth: { user: Paginated<UserType> };
    [key: string]: unknown;
}

export default function MobileHeader() {
    const page = usePage<PageProps>();
    const { auth } = page.props;
    const [openSheet, setOpenSheet] = useState(false);
    const { post } = useForm();
    const handleLogout = () => {
        post("/logout");
    };

    const user = auth.user.data;

    return (
        <header className="fixed top-0 z-50 w-full border-b bg-background ">
            <Container className="mx-auto flex items-center justify-between h-16">
                <div className="flex gap-3">
                    <Avatar className="size-12">
                        <AvatarImage src={user.profile} alt={user.first_name} />
                        <AvatarFallback className="rounded-lg">
                            {user.first_name.charAt(0).toUpperCase()}
                            {user.last_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="">
                        <p className="text-muted-foreground text-sm">
                            Good Morning,
                        </p>
                        <h2 className="font-semibold text-xl">
                            {user.first_name} {user.last_name}
                        </h2>
                    </div>
                </div>
                <div>
                    <Link href={"/app/notifications"}>
                        <Button
                            variant={"ghost"}
                            size={"icon-lg"}
                        >
                            <Bell />
                        </Button>
                    </Link>
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
