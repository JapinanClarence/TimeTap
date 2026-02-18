import React from "react";
import GradientBg from "@/components/ui/gradient-bg";
import { Link } from "@inertiajs/react";
import {  Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import RegisterForm from "@/components/forms/register-form";

export default function Register() {
    return (
        <div className="flex w-full h-screen ">
            <div className="flex-1/2 py-8 px-8 lg:px-10 xl:px-30 bg-white">
                <div>
                    <Link href={"/"}>
                        <div className="flex items-end">
                            <Timer className="h-8 text-primary" />
                            <h2 className="text-2xl font-extrabold text-transparent inline-block bg-linear-to-r from-primary to-timetap-accent  bg-clip-text">
                                TimeTap
                            </h2>
                        </div>
                    </Link>
                </div>
                <div className="h-full flex flex-col justify-center ">
                    <h2 className="text-3xl mb-2">Create your Account</h2>
                    <p className="text-muted-foreground">
                        Fill in the form below to create your account
                    </p>
                    <div className="mt-5">
                        <RegisterForm />
                    </div>
                </div>
            </div>
            <GradientBg
                className={
                    "flex-1/2 flex flex-col justify-between py-8 px-8 lg:px-10 xl:px-30"
                }
            >
                <div className="inline-flex justify-end">
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
                                <Link href="/#feature">Feature</Link>
                            </Button>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="border-b-2 border-b-slate-700 text-slate-700 text-5xl text-pretty md:text-6xl lg:text-[4em]  md:leading-20 font-bold ">
                        Your attendance management hub.
                    </h1>
                    <p className="text-gray-700"></p>
                </div>

                <div className=" py-5 flex text-start justify-end gap-3 leading-5">
                    <Tooltip>
                        <TooltipTrigger>
                            <Avatar size="lg">
                                <AvatarImage
                                    src="/images/japinan-profile.jpg"
                                    alt="Avatar"
                                />
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="p-3 flex items-center gap-3">
                                <Avatar size="lg">
                                    <AvatarImage
                                        src="/images/japinan-profile.jpg"
                                        alt="Avatar"
                                    />
                                </Avatar>
                                <div className="text-start text-sm ">
                                    <a
                                        href="https://github.com/JapinanClarence"
                                        target="_blank"
                                        className="block font-semibold text-sm"
                                    >
                                        @japinanclarence
                                    </a>
                                    <a
                                        href="https://japinanc.vercel.app"
                                        target="_blank"
                                        className="text-sm font-medium text-slate-500 underline underline-offset-2"
                                    >
                                        {/* <Globe height={10} width={10} className="inline p-0 mr-1" /> */}
                                        Portfolio
                                    </a>
                                </div>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                    <div>
                        <h3 className="font-semibold ">Developed by:</h3>
                        <p className="text-sm font-medium text-slate-500">
                            japinanc
                        </p>
                    </div>
                </div>
            </GradientBg>
        </div>
    );
}
