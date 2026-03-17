import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "@/features/app/profile/change-password-form";
import AppLayout from "@/layouts/app/app-layout";
import { UserType } from "@/types/user";
import { Head, usePage } from "@inertiajs/react";
import { Lock } from "lucide-react";
import React from "react";

interface ProfilePageProps {
    auth: { user: { data: UserType } };
    [key: string]: unknown;
}
export default function ChangePassword() {
    const { auth } = usePage<ProfilePageProps>().props;

    return (
        <AppLayout
            secondaryHeader={true}
            showNav={false}
            title="Change Password"
        >
            <Head title="Change Password" />
            <Container className="space-y-5 mt-5">
                <div className="flex gap-2">
                    <div className="bg-primary/10 text-primary size-10 inline-flex items-center justify-center rounded-lg">
                        <Lock />
                    </div>
                    <div>
                        <h3 className="font-semibold">Change password</h3>
                        <p className="text-muted-foreground text-xs">
                            Keep you account secure
                        </p>
                    </div>
                </div>
                <Separator/>
                <ChangePasswordForm user={auth.user.data} />
            </Container>
        </AppLayout>
    );
}
