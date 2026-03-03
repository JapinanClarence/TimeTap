import { NotificationType } from "@/types/notification";
import React from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Check, X } from "lucide-react";
import SecondaryLayout from "@/layouts/app/secondary-layout";
import Container from "@/components/ui/container";

interface Paginated<T> {
    data: T[];
    links: any[];
    meta: any;
}
interface NotificationPageProps {
    [key: string]: unknown;
    notifications: Paginated<NotificationType>;
}

export default function Notifications() {
    const { props } = usePage<NotificationPageProps>();
    const handleAccept = (invitationId: string) => {
        // router.post(route('invitations.accept', invitationId));
    };

    const notifications = props?.notifications;

    return (
        <SecondaryLayout>
            <Container>
                <Head title="Notifications" />
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            console.log("Clicked");
                            // router.post(route("notifications.mark-all-read"));
                        }}
                    >
                        Mark all as read
                    </Button>
                </div>

                <div className="space-y-3">
                    {notifications.data.length > 0 ? (
                        notifications.data.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 rounded-xl border transition-all flex gap-4 ${
                                    notification.read_at
                                        ? "bg-background opacity-75"
                                        : "bg-muted/40 border-primary/20 shadow-sm"
                                }`}
                            >
                                {/* Icon Logic */}
                                <div className="p-2 rounded-full bg-background border h-fit">
                                    {notification.type === "invitation" ? (
                                        <Mail className="w-4 h-4 text-blue-500" />
                                    ) : (
                                        <Calendar className="w-4 h-4 text-green-500" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-medium leading-relaxed">
                                            {notification.message}
                                        </p>
                                        {!notification.read_at && (
                                            <div className="h-2 w-2 rounded-full bg-primary mt-1" />
                                        )}
                                    </div>

                                    {/* Invitation Actions */}
                                    {notification.type === "invitation" &&
                                        notification.subject?.status ===
                                            "pending" && (
                                            <div className="mt-4 flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    className="h-8 px-4"
                                                    onClick={() =>
                                                        handleAccept(
                                                            notification.subject_id,
                                                        )
                                                    }
                                                >
                                                    <Check className="w-3.5 h-3.5 mr-1.5" />
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 px-4"
                                                >
                                                    <X className="w-3.5 h-3.5 mr-1.5" />
                                                    Decline
                                                </Button>
                                            </div>
                                        )}

                                    <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider font-semibold">
                                        {new Date(
                                            notification.created_at,
                                        ).toLocaleDateString()}{" "}
                                        at{" "}
                                        {new Date(
                                            notification.created_at,
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
                            <p className="text-muted-foreground">
                                You're all caught up!
                            </p>
                        </div>
                    )}
                </div>

                {/* Simple Pagination Footer */}
                {/* {notifications.meta.last_page > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                </div>
            )} */}
            </Container>
        </SecondaryLayout>
    );
}
