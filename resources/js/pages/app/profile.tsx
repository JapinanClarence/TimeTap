import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import AppLayout from "@/layouts/app/AppLayout";
import { UserType } from "@/types/user";
import { useForm, usePage } from "@inertiajs/react";
import { ChevronRight, LogOut } from "lucide-react";
import React from "react";

interface Paginated<T> {
    data: T;
    links: any[];
    meta: any;
}

interface PageProps {
    auth: { user: Paginated<UserType> };
    [key: string]: unknown;
}

export default function Profile() {
    const page = usePage<PageProps>();
    const { auth } = page.props;
    const { post } = useForm();
    const handleLogout = () => {
        post("/logout");
    };
    return (
        <AppLayout showHeader={false}>
            <main>
                <Container>
                    <div className="space-y-5">
                        <div className="flex justify-center items-center border-b p-4 ">
                            <Avatar className="size-30 border-4 border-primary shadow-sm">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                    // className="grayscale"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                    <Button
                                        onClick={handleLogout}
                                        className="bg-primary/30 text-primary rounded-full size-8"
                                        variant={"secondary"}
                                    >
                                        <LogOut />
                                    </Button>
                                    Log out
                                </div>

                                <Button
                                    onClick={handleLogout}
                                    className="size-8"
                                    size={"icon-lg"}
                                    variant={"ghost"}
                                >
                                    <ChevronRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </main>
        </AppLayout>
    );
}
