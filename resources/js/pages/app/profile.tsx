import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BubbleBgDecoration } from "@/components/ui/bubble-bg-decoration";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/layouts/app/app-layout";
import { UserType } from "@/types/user";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Building2, ChevronRight, LockIcon, LogOut, User2 } from "lucide-react";
import React from "react";

interface ProfilePageProps {
    auth: { user: { data: UserType } };
    [key: string]: unknown;
}

export default function Profile() {
    const { auth } = usePage<ProfilePageProps>().props;

    const { first_name, last_name, email, created_at } = auth.user.data;
    const { post } = useForm();
    const handleLogout = () => {
        post("/logout");
    };
    return (
        <AppLayout secondaryHeader={true} title="My Profile">
            <Head title="Profile" />
            <Container>
                <div className="space-y-5 mt-5">
                    <div className="flex items-center gap-5 px-6 py-5 bg-linear-to-tr from-[#4F6EF7]  to-[#6366f1] rounded-xl relative animate-fade-up">
                        {/* Background decoration */}
                        <BubbleBgDecoration />
                        <Avatar className="size-20 border-4 border-white/20 rounded-full shadow-sm relative ">
                            <AvatarImage src={""} alt={first_name} />
                            <AvatarFallback className="bg-white/20 text-white rounded-full font-bold text-xl backdrop-blur-sm">
                                {first_name[0]}
                                {last_name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h1 className="font-bold text-2xl text-white">
                                {first_name} {last_name}
                            </h1>
                            <p className="font-semibold text-sm text-gray-300">
                                {email}
                            </p>
                            <Badge className="bg-white/10 font-semibold">
                                Created at {created_at}
                            </Badge>
                        </div>
                    </div>
                    <div className="space-y-5 animate-fade-up-1">
                        <h2 className="font-bold text-muted-foreground">
                            Account
                        </h2>
                        <Link
                            href={"/app/profile/edit"}
                            className="flex justify-between items-center w-full bg-white border p-3.5 rounded-xl"
                        >
                            <div className="flex items-center gap-5 font-semibold">
                                <div className="bg-primary/10 text-primary rounded-lg size-9 inline-flex items-center justify-center">
                                    <User2 className="size-5" />
                                </div>
                                Profile
                            </div>

                            <ChevronRight className="text-muted-foreground" />
                        </Link>
                        <button
                            className="flex justify-between items-center w-full bg-white border p-3.5 rounded-xl"
                            // onClick={handleLogout}
                        >
                            <div className="flex items-center gap-5  font-semibold">
                                <div className="bg-primary/10 text-primary rounded-lg size-9 inline-flex items-center justify-center">
                                    <LockIcon className="size-5" />
                                </div>
                                Change Password
                            </div>
                            <ChevronRight className="text-muted-foreground" />
                        </button>
                        <Separator />
                        <button
                            className="flex justify-between items-center w-full bg-white border p-3.5 rounded-xl"
                            onClick={handleLogout}
                        >
                            <div className="flex items-center gap-5 text-destructive  font-semibold">
                                <div className="bg-destructive/10 text-destructive rounded-lg size-9 inline-flex items-center justify-center">
                                    <LogOut className="size-5" />
                                </div>
                                Log out
                            </div>
                        </button>
                    </div>
                </div>
            </Container>
        </AppLayout>
    );
}
