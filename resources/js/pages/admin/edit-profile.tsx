import Container from "@/components/ui/container";
import { FilePicker } from "@/components/ui/file-picker";
import { ProfileCard } from "@/components/ui/profile-card";
import ProfileForm from "@/features/admin/profile/components/profile-form";
import AdminLayout from "@/layouts/dashboard/admin-layout";
import { OrganizationType } from "@/types/organization";
import { UserType } from "@/types/user";
import { uploadToCloudinary } from "@/util/cloudinary";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
interface ProfilePageProps {
    auth: { user: { data: UserType } };
    organization: OrganizationType;
    [key: string]: unknown;
}

export default function EditProfile() {
    const { auth, organization } = usePage<ProfilePageProps>().props;
    const { data } = auth.user;
    const [loading, setLoading] = useState(false);
    const [showFilePicker, setShowFilePicker] = useState(false);

    const handleUploadPhoto = async (file: File) => {
        setLoading(true);
        try {
            const { url } = await uploadToCloudinary(
                file,
                "timetap/organizations",
            );
            router.patch(
                `/admin/org-profile/upload/${organization.id}`,
                { image: url },
                {
                    showProgress: false,
                    onBefore: () => setLoading(true),
                    onFinish: () => setLoading(false),
                    onSuccess: () => {
                        toast.success("Profile updated successfully");
                    },
                },
            );
        } catch (err) {
            toast.error("Upload failed");
        }
    };
    return (
        <AdminLayout>
            <Container className="max-w-6xl min-h-screen flex-1 rounded-xl md:min-h-min md:mt-0 p-5">
                <div className="space-y-5 animate-fade-up ">
                    {organization.id && data.created_at && (
                        <ProfileCard
                            name={organization.name}
                            fallback={organization.name.slice(0,2)}
                            email={data.email}
                            id={organization.id}
                            created_at={data.created_at}
                            image={organization.image}
                            setShowFilePicker={() => setShowFilePicker(true)}
                        />
                    )}

                    {organization.id && (
                        <ProfileForm
                            id={organization.id}
                            first_name={data.first_name}
                            last_name={data.last_name}
                            email={data.email}
                            name={organization.name}
                            description={organization.description}
                        />
                    )}
                </div>{" "}
                <FilePicker
                    open={showFilePicker}
                    onClose={() => setShowFilePicker(false)}
                    onFileSelect={handleUploadPhoto}
                    isLoading={loading}
                />
            </Container>
        </AdminLayout>
    );
}
