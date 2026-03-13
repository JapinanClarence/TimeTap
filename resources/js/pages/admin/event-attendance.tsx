import AdminLayout from "@/layouts/dashboard/AdminLayout";
import { Deferred, Link, usePage } from "@inertiajs/react";
import AttendanceCard from "@/features/admin/attendance/components/attendance-card";
import { ArrowLeft, Camera, Clock, MapPin, QrCode, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";

interface Paginated<T> {
    data: T[];
    links: any[];
    meta: any;
}

interface EventAttendanceProps {
    [key: string]: unknown;
    attendees: Paginated<AttendanceType>;
}

export default function EventAttendance() {
    const { props } = usePage<EventAttendanceProps>();
    console.log(props);
    return (
        <AdminLayout>
            <div className="bg-white min-h-screen flex-1 rounded-xl p-5 flex flex-col md:min-h-min">
                <div className="mb-5">
                    <Link href={"/admin/events"}>
                        <Button variant={"outline"}>
                            <ArrowLeft /> Back
                        </Button>
                    </Link>
                </div>

                {/* Event Info Card */}
                <div className="p-4 bg-white border rounded-xl mb-6 shadow-xs animate-fade-up">
                    <h3 className="font-bold text-lg">Sample Event</h3>
                    <div className="flex flex-wrap text-sm gap-x-4 gap-y-1 mt-1 text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-primary" />
                            <span>Monday-Thursday &bull; 10:00-12:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-primary" />
                            <span>Gymnasium</span>
                        </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Badge variant="outline" className="font-medium">
                            3 checked in
                        </Badge>
                        <Badge variant="outline" className="font-medium">
                            1 absent
                        </Badge>
                        <Badge className="bg-emerald-100 text-emerald-700 border-none hover:bg-emerald-100">
                            60% present
                        </Badge>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row md:border rounded-xl overflow-hidden bg-white shadow-xs animate-fade-up-1 gap-2 md:gap-0">
                    {/* Left Section: QR Scanner */}
                    <div className="lg:w-1/3 xl:w-1/4 lg:border-r bg-background p-8 flex flex-col items-center justify-center text-center gap-4">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-2">
                            <QrCode className="size-8 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-slate-900">
                                QR Scanner
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Point camera at a member's QR code to check them
                                in instantly
                            </p>
                        </div>
                        <Button
                            variant="default"
                            className="w-full mt-2 shadow-sm"
                        >
                            <Camera className="mr-2 size-4" /> Turn on Scanner
                        </Button>
                    </div>

                    {/* Right Section: Attendance List */}
                    <div className="flex-1 md:p-5 flex flex-col min-w-0">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                Attendees
                                <span className="bg-slate-100 px-2 py-0.5 rounded-full font-normal text-xs text-muted-foreground">
                                    4
                                </span>
                            </h4>
                        </div>

                        <div className="space-y-4">
                            <div className="flex flex-row md:flex-col gap-3">
                                <InputGroup className="flex-1">
                                    <InputGroupAddon>
                                        <Search />
                                    </InputGroupAddon>
                                    <InputGroupInput placeholder="Search attendees..." />
                                </InputGroup>
                                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg self-start">
                                    {["All", "Check In", "Check Out"].map(
                                        (tab) => (
                                            <Button
                                                key={tab}
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 text-xs font-medium px-3 hover:bg-white hover:shadow-sm"
                                            >
                                                {tab}
                                            </Button>
                                        ),
                                    )}
                                </div>
                            </div>

                            <Separator />

                            {/* List with auto-height or scroll if parent is constrained */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 h-52 overflow-y-auto pr-1">
                                <AttendanceCard />
                                <AttendanceCard />
                                <AttendanceCard />
                                <AttendanceCard />
                                <AttendanceCard />
                                <AttendanceCard />
                                <AttendanceCard />
                                <AttendanceCard />
                                <AttendanceCard />
                                <AttendanceCard />
                                <AttendanceCard />
                                <AttendanceCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
