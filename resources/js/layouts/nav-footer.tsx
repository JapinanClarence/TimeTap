import React from "react";
import Container from "@/components/ui/container";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function NavFooter() {
    return (
        <div className=" relative ">
            <Container className="relative py-30 flex flex-col items-end">
                <div>
                    <div className="flex text-start gap-3 leading-5">
                        <Tooltip >
                            <TooltipTrigger>
                                <Avatar size="lg">
                                    <AvatarImage
                                        src="/images/japinan-profile.jpg"
                                        alt="Avatar"
                                    />
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent >
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
                </div>
            </Container>
        </div>
    );
}
