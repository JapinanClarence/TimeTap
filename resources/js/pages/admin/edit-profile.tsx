import Container from "@/components/ui/container";
import { ProfileCard } from "@/features/admin/profile/components/profile-card";
import ProfileForm from "@/features/admin/profile/components/profile-form";
import AdminLayout from "@/layouts/dashboard/admin-layout";
import { OrganizationType } from "@/types/organization";
import { UserType } from "@/types/user";
import { usePage } from "@inertiajs/react";
interface ProfilePageProps {
    auth: { user: { data: UserType } };
    organization: OrganizationType;
    [key: string]: unknown;
}

export default function EditProfile() {
    const { auth, organization } = usePage<ProfilePageProps>().props;
    const { data } = auth.user;
    return (
        <AdminLayout>
            <Container className=" min-h-screen flex-1 rounded-xl md:min-h-min md:mt-0 p-5">
                <div className="space-y-5 animate-fade-up ">
                    {organization.id && data.created_at && (
                        <ProfileCard
                            name={organization.name}
                            email={data.email}
                            id={organization.id}
                            created_at={data.created_at}
                        />
                    )}

                    {organization.id && organization.description && (
                        <ProfileForm
                            id={organization.id}
                            first_name={data.first_name}
                            last_name={data.last_name}
                            email={data.email}
                            name={organization.name}
                            description={organization.description}
                        />
                    )}
                </div>
            </Container>
        </AdminLayout>
    );
}
