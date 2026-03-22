import React from "react";
import { BubbleBgDecoration } from "@/components/ui/bubble-bg-decoration";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function IdCard() {
    return (
        <div className=" rounded-2xl overflow-clip animate-fade-up bg-white shadow-sm border-slate-200">
            {/* Header Section */}
            <div className="relative p-5 flex gap-2 items-center bg-linear-to-tr from-[#4F6EF7] to-[#6366f1] overflow-hidden">
                <Badge className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md font-medium text-[10px] uppercase tracking-wider">
                    User ID
                </Badge>

                <BubbleBgDecoration />

                <Avatar className="size-14 border-4 border-white/20 rounded-full shadow-lg relative z-10">
                    <AvatarImage src={""} alt={"John"} />
                    <AvatarFallback className="bg-white/20 text-white font-semibold  backdrop-blur-sm">
                        JM
                    </AvatarFallback>
                </Avatar>

                <div className="text-start text-white z-10">
                    <h2 className="text-lg font-semibold tracking-tight">
                        John Doe
                    </h2>
                    <p className="text-white/80 text-sm ">johnD@xyz.com</p>
                </div>
            </div>

            {/* Middle Info Section */}
            <div className="p-6 bg-slate-50/50">
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
                        <p className="text-slate-500 font-semibold text-[9px] uppercase tracking-wide">
                            Account Created
                        </p>
                        <p className="text-xs font-bold text-slate-800">
                            Jan 20, 2026
                        </p>
                    </div>
                    <div className="flex-1 bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
                        <p className="text-slate-500 font-semibold text-[9px] uppercase tracking-wide">
                            Membership
                        </p>
                        <p className="text-xs font-bold text-slate-800">
                            6 organizations
                        </p>
                    </div>
                </div>

                {/* QR Code Section */}
                <div className="w-full flex flex-col items-center bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                        SCAN TO VERIFY
                    </p>
                    <div className="p-2 bg-white rounded-xl">
                        <svg
                            className="size-27.5"
                            viewBox="0 0 110 110"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width="110" height="110" fill="white" />
                            <rect
                                x="8"
                                y="8"
                                width="28"
                                height="28"
                                rx="3"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="12"
                                y="12"
                                width="20"
                                height="20"
                                rx="1.5"
                                fill="white"
                            />
                            <rect
                                x="15"
                                y="15"
                                width="14"
                                height="14"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="74"
                                y="8"
                                width="28"
                                height="28"
                                rx="3"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="78"
                                y="12"
                                width="20"
                                height="20"
                                rx="1.5"
                                fill="white"
                            />
                            <rect
                                x="81"
                                y="15"
                                width="14"
                                height="14"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="8"
                                y="74"
                                width="28"
                                height="28"
                                rx="3"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="12"
                                y="78"
                                width="20"
                                height="20"
                                rx="1.5"
                                fill="white"
                            />
                            <rect
                                x="15"
                                y="81"
                                width="14"
                                height="14"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="42"
                                y="8"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="50"
                                y="8"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="58"
                                y="8"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="42"
                                y="16"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="58"
                                y="16"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="50"
                                y="24"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="8"
                                y="42"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="16"
                                y="42"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="24"
                                y="42"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="8"
                                y="50"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="24"
                                y="50"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="16"
                                y="58"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="42"
                                y="42"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="50"
                                y="42"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="58"
                                y="42"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="66"
                                y="42"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="42"
                                y="50"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="66"
                                y="50"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="50"
                                y="58"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="58"
                                y="58"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="74"
                                y="42"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="82"
                                y="42"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="98"
                                y="42"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="74"
                                y="50"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="90"
                                y="50"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="82"
                                y="58"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="98"
                                y="58"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="42"
                                y="74"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="58"
                                y="74"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="42"
                                y="82"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="50"
                                y="82"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="66"
                                y="74"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="50"
                                y="90"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="66"
                                y="90"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="74"
                                y="74"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="90"
                                y="74"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="98"
                                y="74"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="82"
                                y="82"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="74"
                                y="90"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                            <rect
                                x="90"
                                y="90"
                                width="5"
                                height="5"
                                rx="1"
                                fill="#1e1e2e"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className="px-6 py-4 bg-white border-t border-slate-100 flex text-[11px] font-medium text-slate-500 justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Active
                </div>
                <div className="text-slate-400">Member since 2026</div>
            </div>
        </div>
    );
}
