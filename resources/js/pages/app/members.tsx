import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { NoContent } from "@/features/app/home/no-content";
import MembersCard from "@/features/app/organizations/members-card";
import MembersCardSkeleton from "@/features/app/organizations/members-card-skeleton";
import AppLayout from "@/layouts/app/app-layout";
import { MemberType } from "@/types/member";
import { UserType } from "@/types/user";
import { Deferred, Head, usePage } from "@inertiajs/react";
import { ChevronLeft, Search } from "lucide-react";
import React from "react";

interface MemberPageProps {
    [key: string]: unknown;
    members: MemberType[];
    auth: { user: { data: UserType } };
}

export default function Members() {
    const { members, auth } = usePage<MemberPageProps>().props;
    const user = auth.user.data;
    return (
        <AppLayout secondaryHeader={true} showNav={false} title={"Members"}>
            <Head title="Members" />
            <Button
                onClick={() => {
                    window.history.back();
                }}
                className="ml-8 mb-5 hidden md:flex"
                variant={"outline"}
            >
                <ChevronLeft />
                Back
            </Button>

            <div className="">
                <h3 className="px-8 py-2 text-xs text-muted-foreground font-semibold">
                    You
                </h3>
                <div className="md:mx-8 md:w-min">
                    <MembersCard
                        first_name={user.first_name}
                        last_name={user.last_name}
                        email={user.email}
                    />
                </div>
            </div>
            <h3 className="px-8 py-2 text-xs text-muted-foreground font-semibold">
                Members
            </h3>
            <Deferred data="members" fallback={<MembersCardSkeleton />}>
                {members?.length > 0 ? (
                    <div className="md:mx-8 grid md:grid-cols-2 lg:grid-cols-4 gap-2">
                        {members.map((member) => (
                            <MembersCard key={member.id} {...member} />
                        ))}
                    </div>
                ) : (
                    <div className="px-8">
                        <NoContent showIcon={false} title="" description="" />
                    </div>
                )}
            </Deferred>
        </AppLayout>
    );
}
