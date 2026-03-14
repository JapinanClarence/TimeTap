import Container from "@/components/ui/container";
import AppLayout from "@/layouts/app/app-layout";
import { UserType } from "@/types/user";
import { Head, usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QRGenerator } from "@/features/app/QR/qr-generator";
import { BubbleBgDecoration } from "@/components/ui/bubble-bg-decoration";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useCallback, useRef } from "react";
import { toPng } from "html-to-image";

interface UserIdProps {
    user: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
        created_at: string;
        member_since: string;
        total_organizations: number;
    };
    [key: string]: unknown;
}

export default function UserId() {
    const { user } = usePage<UserIdProps>().props;
  const downloadRef = useRef<HTMLDivElement>(null);
    const {
        id,
        first_name,
        last_name,
        email,
        created_at,
        member_since,
        total_organizations,
    } = user;


    const handleDownload = useCallback(() => {
            if (downloadRef.current === null) {
                return;
            }
           
            toPng(downloadRef.current, {
                cacheBust: true,
                filter: (node) => !node.classList?.contains("download-button-hide"),
            })
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.download = `${first_name}_${last_name}_ID.png`;
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.log(err);
                });
        }, [downloadRef]);

    return (
        <AppLayout secondaryHeader={true} title="My ID">
            <Container className="xl:px-8 mt-5 space-y-5">
                <Head title="My ID" />
                <div ref={downloadRef} id="qr-download-area" className=" rounded-2xl overflow-clip animate-fade-up bg-white shadow-sm border-slate-200 hover-card">
                    {/* Header Section */}
                    <div className="relative p-5 bg-linear-to-tr from-[#4F6EF7] to-[#6366f1] overflow-hidden">
                        <Badge className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md font-medium text-[10px] uppercase tracking-wider">
                            User ID
                        </Badge>

                        <BubbleBgDecoration />

                        <Avatar className="size-24 border-4 border-white/20 rounded-full mx-auto shadow-lg relative z-10">
                            <AvatarImage src={""} alt={first_name} />
                            <AvatarFallback className="bg-white/20 text-white font-bold text-xl backdrop-blur-sm">
                                {first_name[0]}
                                {last_name[0]}
                            </AvatarFallback>
                        </Avatar>

                        <div className="mt-4 text-center text-white relative z-10">
                            <h2 className="text-lg font-bold tracking-tight">
                                {first_name} {last_name}
                            </h2>
                            <p className="text-white/80 text-sm font-medium">
                                {email}
                            </p>
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
                                    {created_at}
                                </p>
                            </div>
                            <div className="flex-1 bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
                                <p className="text-slate-500 font-semibold text-[9px] uppercase tracking-wide">
                                    Membership
                                </p>
                                <p className="text-xs font-bold text-slate-800">
                                    {total_organizations} organizations
                                </p>
                            </div>
                        </div>

                        {/* QR Code Section */}
                        <div className="w-full flex flex-col items-center bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                                SCAN TO VERIFY
                            </p>
                            <div className="p-2 bg-white rounded-xl">
                                <QRGenerator data={user} />
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
                        <div className="text-slate-400">
                            Member since {member_since}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button  onClick={handleDownload} className="shadow-sm flex-1" variant={"outline"}>
                        <Download /> Download ID
                    </Button>
                     <Button className="shadow-sm flex-1" variant={"outline"}>
                        <Share2 /> Share ID
                    </Button>
                </div>
            </Container>
        </AppLayout>
    );
}
