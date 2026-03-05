import { NotificationType } from "@/types/notification";
import React, { useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Check, X } from "lucide-react";
import SecondaryLayout from "@/layouts/app/secondary-layout";
import Container from "@/components/ui/container";
import { toast } from "sonner";

interface Paginated<T> {
    data: T[];
    links: any[];
    meta: any;
}
interface NotificationPageProps {
    [key: string]: unknown;
    notifications: Paginated<NotificationType>;
    flash: {
        success: string | null;
        error: string | null;
    };
}

export default function Notifications() {
    const { props } = usePage<NotificationPageProps>();
    const handleInvitation = (
        invitationId: string,
        action: "accept" | "decline",
    ) => {
        router.post(
            `/app/organizations/handle-invitation/${invitationId}`,
            {
                action: action,
            },
            {
                showProgress: false,
                // Keeps the user on the same scroll position after the table updates
                preserveScroll: true,
                onError: (errors) => toast.error("Failed accept invitation!"),
            },
        );
    };

    const handleMarkAllRead = () => {
        router.post(
            "/app/notifications/mark-all-read",
            {},
            {
                showProgress: false,
                // Keeps the user on the same scroll position after the table updates
                preserveScroll: true,
                onSuccess: () =>
                    toast.success("All notifications marked as read!"),
                onError: (errors) => toast.error("Failed mark as read!"),
            },
        );
    };

    useEffect(() => {
        // Check if flash exists AND if success has a value
        if (props.flash?.success) {
            toast.success(props.flash.success);
        }

        if (props.flash?.error) {
            toast.error(props.flash.error);
        }
    }, [props.flash]);

    const notifications = props?.notifications;

    return (
        <SecondaryLayout>
            <Container>
                <Head title="Notifications" />
                <div className="flex justify-between items-center py-6">
                    <h1 className="text-2xl font-bold">Notifications</h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkAllRead}
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
                                            <div className="mt-4 flex items-center justify-end gap-2">
                                                <Button
                                                    variant={"link"}
                                                    size="sm"
                                                    className="h-8 px-4"
                                                    onClick={() =>
                                                        handleInvitation(
                                                            notification.subject_id,
                                                            "accept",
                                                        )
                                                    }
                                                >
                                                    <Check className="w-3.5 h-3.5 mr-1.5" />
                                                    Accept
                                                </Button>
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    className="h-8 px-4 text-destructive"
                                                    onClick={() =>
                                                        handleInvitation(
                                                            notification.subject_id,
                                                            "decline",
                                                        )
                                                    }
                                                >
                                                    <X className="w-3.5 h-3.5 mr-1.5" />
                                                    Decline
                                                </Button>
                                            </div>
                                        )}

                                    <p className="text-[10px] text-end text-muted-foreground mt-2 uppercase font-semibold">
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
