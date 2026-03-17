import Container from "@/components/ui/container";
import ChangePasswordForm from "@/features/app/profile/change-password-form";
import AppLayout from "@/layouts/app/app-layout";
import { UserType } from "@/types/user";
import { Head, usePage } from "@inertiajs/react";
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
                <div>
                    <ChangePasswordForm user={auth.user.data}/>
                </div>
            </Container>
        </AppLayout>
    );
}
