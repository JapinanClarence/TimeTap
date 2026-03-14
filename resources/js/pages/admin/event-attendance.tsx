import AdminLayout from "@/layouts/dashboard/AdminLayout";
import { Deferred, Link, usePage } from "@inertiajs/react";
import AttendanceCard from "@/features/admin/attendance/components/attendance-card";
import {
    ArrowLeft,
    Calendar,
    Camera,
    Clock,
    MapPin,
    QrCode,
    Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { EventType } from "@/types/event";
import {
    formatMonthDayOnly,
    formatSimpleDate,
    formatTime12h,
    formatWeekDayOnly,
} from "@/util/dateUtil";
import { NoContent } from "@/features/app/home/no-content";

interface EventAttendanceProps {
    [key: string]: unknown;
    attendees: AttendanceType[];
    event: EventType;
    stats: {
        total: number;
        present: number;
        absent: number;
        percentage: number;
    };
}

export default function EventAttendance() {
    const { props } = usePage<EventAttendanceProps>();
    console.log(props);
    const stats = props.stats;
    const attendees = props.attendees;

    const event = props.event;

    const start = new Date(event.start_date);
    const end = new Date(event.end_date);
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
                    <h3 className="font-bold text-lg">{props.event.title}</h3>
                    <div className="flex flex-col md:flex-row md:flex-wrap text-sm gap-x-4 gap-y-1 mt-1 text-muted-foreground">
                        <div className="flex md:hidden items-center gap-1.5">
                            <Calendar className="size-3.5 text-primary" />
                            <span>
                                {formatMonthDayOnly(start)} -{" "}
                                {formatSimpleDate(end)}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-primary" />
                            <span className="hidden md:flex">
                                {formatMonthDayOnly(start)} -{" "}
                                {formatSimpleDate(end)} &bull;{" "}
                                {formatTime12h(event.start_time).slice(0, 5)} -{" "}
                                {formatTime12h(event.end_time)}
                            </span>
                            <span>
                                {formatTime12h(event.start_time).slice(0, 5)} -{" "}
                                {formatTime12h(event.end_time)}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-primary" />
                            <span>{event.location}</span>
                        </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {stats.total != null && (
                            <Badge variant="outline" className="font-medium">
                                {stats.total} members
                            </Badge>
                        )}
                        {stats.present != null && (
                            <Badge variant="outline" className="font-medium">
                                {stats.present} checked in
                            </Badge>
                        )}

                        {stats.absent != null && (
                            <Badge variant="outline" className="font-medium">
                                {stats.absent} absent
                            </Badge>
                        )}
                        {stats.percentage != null && (
                            <Badge className="bg-emerald-100 text-emerald-700 border-none hover:bg-emerald-100">
                                {stats.percentage}% present
                            </Badge>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col lg:flex-row md:border rounded-xl overflow-hidden bg-white shadow-xs animate-fade-up-1 gap-2 md:gap-0">
                    {/* Left Section: QR Scanner */}
                    <div className="lg:w-1/2 xl:w-1/4 lg:border-r bg-background p-8 flex flex-col items-center justify-center text-center gap-4">
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
                        <Button className="w-full mt-2 shadow-sm">
                            <Camera className="mr-2 size-4" /> Turn on Scanner
                        </Button>
                    </div>

                    {/* Right Section: Attendance List */}
                    <div className="flex-1 md:p-5 flex flex-col min-w-0">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                Attendees
                                {stats.present != null && (
                                    <span className="bg-slate-100 px-2 py-0.5 rounded-full font-normal text-xs text-muted-foreground">
                                        {stats.present}
                                    </span>
                                )}
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 max-h-92 overflow-y-auto pr-1">
                                {attendees.length > 0 ? (
                                    attendees.map((attendance) => (
                                        <AttendanceCard
                                            key={attendance.id}
                                            data={attendance}
                                        />
                                    ))
                                ) : (
                                    <NoContent className="col-span-2" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
