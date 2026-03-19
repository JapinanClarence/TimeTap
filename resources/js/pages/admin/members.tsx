import { Header } from "@/components/ui/header";
import AdminLayout from "@/layouts/dashboard/admin-layout";
import React, { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvitationCodeType, MemberType } from "@/types/member";
import { DataTable } from "@/features/admin/members/components/data-table";
import { columns } from "@/features/admin/members/components/columns";
import { Deferred, router, usePage } from "@inertiajs/react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import InvitationModal from "@/features/admin/members/components/invitation-modal";
import { toast } from "sonner";

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
    onRemove,
}: {
    members: Paginated<MemberType>;
    handleInvite: () => void;
    onRemove: (id:string)=>void;
}) {
    return (
        <DataTable
            columns={columns}
            data={members.data}
            handleInvite={handleInvite}
            onRemove={onRemove}
        />
    );
}

export default function Members() {
    const [showInvitationModal, setShowInvitationModal] = useState(false);
    const { props } = usePage<MemberPageProps>();

    const [currentTab, setCurrentTab] = useState("all");

    // Filter the members array based on the selected tab
    const filteredMembers = useMemo(() => {
        if (!props.members?.data) {
            return {
                data: [],
                links: [],
                meta: {},
            } as unknown as Paginated<MemberType>;
        }

        if (currentTab === "all") return props.members;

        // We create a new object that mimics the paginated structure
        // but with filtered data
        return {
            ...props.members,
            data: props.members.data.filter(
                (member: any) => member.gender?.toLowerCase() === currentTab,
            ),
        };
    }, [props.members, currentTab]);

    const handleRemove = (id: string)=>{
       
        router.delete(`/admin/members/${id}`, {
            showProgress: false,
            onSuccess: ()=>toast.success("Member removed successfully"),
            onError : ()=>toast.error("Something went wrong")
        })
    }
    return (
        <AdminLayout>
            <div className="bg-white min-h-screen flex-1 rounded-xl md:min-h-min flex flex-col p-5">
                <Header>Members</Header>
                <div className="p-5 border rounded-lg">
                    <Tabs defaultValue="all" onValueChange={setCurrentTab}>
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="male">Male</TabsTrigger>
                            <TabsTrigger value="female">Female</TabsTrigger>
                        </TabsList>
                        <TabsContent value={currentTab}>
                            <Deferred
                                data="members"
                                fallback={
                                    <TableSkeleton
                                        columns={columns}
                                        data={[]}
                                    />
                                }
                            >
                                <MemberTableContent
                                    members={filteredMembers}
                                    handleInvite={() =>
                                        setShowInvitationModal(true)
                                    }
                                    onRemove={handleRemove}
                                />
                            </Deferred>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <InvitationModal
                open={showInvitationModal}
                onOpenChange={() => setShowInvitationModal(false)}
                invitation={props.invitation}
            />
        </AdminLayout>
    );
}
