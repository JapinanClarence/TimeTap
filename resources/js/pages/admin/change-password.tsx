import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "@/features/admin/profile/components/change-password-form";
import AdminLayout from "@/layouts/dashboard/admin-layout";
import { UserType } from "@/types/user";
import { usePage } from "@inertiajs/react";
import { Lock } from "lucide-react";
import React from "react";

interface ProfilePageProps {
    auth: { user: { data: UserType } };
    [key: string]: unknown;
}
export default function ChangePassword() {
    const { auth } = usePage<ProfilePageProps>().props;
    return (
        <AdminLayout>
            <Container className=" min-h-screen flex-1 rounded-xl space-y-5 md:min-h-min md:mt-0 p-5">
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
        </AdminLayout>
    );
}
