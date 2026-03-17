import { NotificationType } from "@/types/notification";
import React, { useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Check, X } from "lucide-react";
import Container from "@/components/ui/container";
import { toast } from "sonner";
import AppLayout from "@/layouts/app/app-layout";
import NotificationCard from "@/features/app/notifications/notification-card";

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
        <AppLayout secondaryHeader={true} title="Notifications" showNav={false}>
            <Container className="xl:px-8 lg:px-8 py-8 md:py-0 space-y-5">
                <Head title="Notifications" />
                <div className="flex justify-between items-center animate-fade-up">
                    <h1 className="text-2xl font-bold"></h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkAllRead}
                    >
                        Mark all as read
                    </Button>
                </div>

                <div className="space-y-3 animate-fade-up-1">
                    {notifications.data.length > 0 ? (
                        notifications.data.map((notification) => (
                            <NotificationCard
                                key={notification.id}
                                notification={notification}
                                onInvite={handleInvitation}
                            />
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
        </AppLayout>
    );
}
