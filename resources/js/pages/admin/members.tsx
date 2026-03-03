import { Header } from "@/components/ui/header";
import AdminLayout from "@/layouts/dashboard/AdminLayout";
import React, { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvitationCodeType, MemberType } from "@/types/member";
import { DataTable } from "@/features/admin/members/components/data-table";
import { columns } from "@/features/admin/members/components/columns";
import { Deferred, usePage } from "@inertiajs/react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { fa } from "zod/v4/locales";
import InvitationModal from "@/features/admin/members/components/invitation-modal";

interface Paginated<T> {
    data: T[];
    links: any[];
    meta: any;
}

interface MemberPageProps {
    [key: string]: unknown;
    members: Paginated<MemberType>;
    invitation: InvitationCodeType;
}

function MemberTableContent({
    members,
    handleInvite,
}: {
    members: Paginated<MemberType>;
    handleInvite: ()=>void;
}) {
    return (
        <DataTable
            columns={columns}
            data={members.data}
            handleInvite={handleInvite}
            // onStatusChange={onStatusChange}
            // processingId={processingId}
        />
    );
}

export default function Members() {
    const { props } = usePage<MemberPageProps>();

    const [showInvitationModal, setShowInvitationModal] = useState(false);
    const [currentTab, setCurrentTab] = useState<"all" | "male" | "female">(
        "all",
    );

    // Filter logic
    // const categorizedMembers = useMemo(() => {
    //     const members = props.members;
    //     if(!members) return;
    //     return {
    //         all: members,
    //         male: members.filter(m => m.gender?.toLowerCase() === 'male'),
    //         female: members.filter(m => m.gender?.toLowerCase() === 'female'),
    //     };
    // }, [members]);
    // const displayList = categorizedMembers[currentTab];
    return (
        <AdminLayout>
            <div className="bg-white min-h-screen flex-1 rounded-xl md:min-h-min flex flex-col p-5">
                <Header>Members</Header>
                <div className="p-5 border rounded-lg">
                    <Tabs defaultValue="all" className="">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="male">Male</TabsTrigger>
                            <TabsTrigger value="female">Female</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <Deferred
                                data="members"
                                fallback={
                                    <TableSkeleton
                                        columns={columns}
                                        data={[]}
                                    />
                                }
                            >
                                <MemberTableContent members={props.members} handleInvite={()=>setShowInvitationModal(true)}/>
                            </Deferred>
                        </TabsContent>
                        <TabsContent value="male">
                            <div className="border border-dashed rounded-lg h-[500px]"></div>
                        </TabsContent>
                        <TabsContent value="female">
                            <div className="border border-dashed rounded-lg h-[500px]"></div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <InvitationModal open={showInvitationModal} onOpenChange={()=>setShowInvitationModal(false)} invitation={props.invitation}/>
        </AdminLayout>
    );
}
