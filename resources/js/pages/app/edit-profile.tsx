import Container from "@/components/ui/container";
import EditForm from "@/features/app/profile/edit-form";
import AppLayout from "@/layouts/app/app-layout";
import { Head, usePage } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/types/user";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfilePageProps {
    auth: { user: { data: UserType } };
    [key: string]: unknown;
}

export default function EditProfile() {
    const { auth } = usePage<ProfilePageProps>().props;

    const { first_name, last_name } = auth.user.data;
    return (
        <AppLayout secondaryHeader={true} showNav={false} title="Edit Profile">
            <Head title="Edit Profile" />
            <Container className="xl:px-8 lg:px-8 py-8 md:py-0 space-y-5">
                <div className="relative">
                    <Avatar className="size-24 mx-auto border-4 border-primary/20 rounded-full shadow-sm relative ">
                        <AvatarImage src={""} alt={first_name} />
                        <AvatarFallback className="bg-primary/10 text-primary/50 rounded-full font-bold text-xl backdrop-blur-sm">
                            {first_name[0]}
                            {last_name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <Button
                        variant={"ghost"}
                        size="icon-xs"
                        className="absolute bg-primary rounded-full right-34 shadow-xs text-white bottom-2"
                    >
                        <Edit />
                    </Button>
                </div>

                <EditForm {...auth.user.data} />
            </Container>
        </AppLayout>
    );
}
