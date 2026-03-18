import React, { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app/app-layout";
import OrganizationStats from "@/features/app/organizations/organization-stats";
import OrganziationHeader from "@/features/app/organizations/organization-header";
import { OrganizationType } from "@/types/organization";
import { NoContent } from "@/features/app/home/no-content";
import LeaveOrgSheet from "@/features/app/organizations/leave-org-sheet";
import Container from "@/components/ui/container";
import { toast } from "sonner";

interface OrganizationDetailProps {
    [key: string]: unknown;
    organization: OrganizationType;
    joined_at: string;
    stats: {
        total_events: number;
        present: number;
        absent: number;
        rate: number;
    };
}

export default function OrganizationDetail() {
    const { organization, joined_at, stats } =
        usePage<OrganizationDetailProps>().props;
    const [showSheet, setShowSheet] = useState(false);

    const handleLeave = () =>{
          router.delete(`/app/organizations/${organization.id}`, {
            onSuccess: ()=> setShowSheet(false)
          })
    }
    return (
        <AppLayout
            secondaryHeader={true}
            showNav={false}
            title={organization.name}
        >
            <Head title={organization.name} />

            <OrganziationHeader
                id={organization.id}
                name={organization.name}
                image={organization.image}
                members_count={organization.members_count}
                joined_at={joined_at}
                onShowSheet={() => setShowSheet(true)}
            />
            <Container className="xl:px-8 lg:px-8 py-8 md:py-0 space-y-5 ">
                <OrganizationStats {...stats} />
                <div className="border p-5 rounded-xl bg-white shadow-xs animate-fade-up-1">
                    <h4 className="font-semibold ">About</h4>

                    <p className="text-muted-foreground text-pretty">
                        {organization.description}
                    </p>
                </div>
                <LeaveOrgSheet
                    open={showSheet}
                    onClose={() => setShowSheet(false)}
                    onLeave={handleLeave}
                />
            </Container>
        </AppLayout>
    );
}
