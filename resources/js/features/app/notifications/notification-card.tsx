import { Button } from "@/components/ui/button";
import { NotificationType } from "@/types/notification";
import { Calendar, Check, Mail, X } from "lucide-react";
import React from "react";

interface NotificationCardProps {
    notification: NotificationType;
    onInvite: (invitationId: string, action: "accept" | "decline") => void;
}

export default function NotificationCard({
    notification,
    onInvite
}: NotificationCardProps) {
    return (
        <div
            key={notification.id}
            className={`p-4 rounded-xl border transition-all hover-card flex gap-4 ${
                notification.read_at
                    ? "bg-white opacity-75"
                    : "bg-muted/40 border-primary/20 shadow-sm "
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
                    notification.subject?.status === "pending" && (
                        <div className="mt-4 flex items-center justify-end gap-2">
                            <Button
                                variant={"link"}
                                size="sm"
                                className="h-8 px-4"
                                onClick={() =>
                                    onInvite(
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
                                    onInvite(
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
                    {new Date(notification.created_at).toLocaleDateString()} at{" "}
                    {new Date(notification.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </p>
            </div>
        </div>
    );
}
