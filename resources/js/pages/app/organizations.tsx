import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import AppLayout from "@/layouts/app/app-layout";
import { ArrowRightLeft, Building2, Plus, Search, X } from "lucide-react";
import React, { useState } from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import OrganizationCard from "@/features/app/organizations/organization-card";
import { Head, usePage } from "@inertiajs/react";
import { OrganizationType } from "@/types/organization";
import { NoContent } from "@/features/app/home/no-content";
import JoinOrgSheet from "@/components/app/join-org-sheet";
import SwitchOrgSheet from "@/features/app/home/switch-org-sheet";
import CurrentOrgCard from "@/features/app/organizations/current-org-card";
import { Badge } from "@/components/ui/badge";

interface OrganizationProps {
    [key: string]: unknown;
    organizations: OrganizationType[];
    currentOrg: OrganizationType | null;
    myOrganizations: OrganizationType[];
}

export default function organizations() {
    const { organizations, myOrganizations, currentOrg } =
        usePage<OrganizationProps>().props;
    const [showJoinSheet, setShowJoinSheet] = useState(false);
    const [showSwitchDrawer, setShowSwitchDrawer] = useState(false);
    const handleJoinOrg = (e: any) => {
        (e.currentTarget as HTMLButtonElement).blur();
        setShowJoinSheet(true);
    };

    return (
        <AppLayout showHeader={false}>
            <Head title="Organizations" />
            <Container className="xl:px-8 lg:px-8 py-8 md:py-0 space-y-5 ">
                {currentOrg && (
                    <CurrentOrgCard
                        organization={currentOrg}
                        onSwitch={() => setShowSwitchDrawer(true)}
                    />
                )}
                {/* search */}
        
                {/* section header */}
                <div className="flex items-center justify-between mb-4 animate-fade-up-1">
                    <h2 className="font-display font-bold text-base text-ink">
                        Your Organizations
                        <Badge className="ml-2 font-medium bg-muted text-muted-foreground">
                            {myOrganizations.length} orgs
                        </Badge>
                    </h2>
                    <Button
                        className="rounded-lg"
                        size={"sm"}
                        onClick={handleJoinOrg}
                    >
                        <Plus strokeWidth={3} />
                        Join Org
                    </Button>
                </div>
                <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] animate-fade-up-2">
                    {organizations.length > 0 ? (
                        organizations.map((organization) => {
                            const isCurrent =
                                currentOrg?.name === organization.name;
                            if (!organization.id) return;
                            return (
                                <OrganizationCard
                                    key={organization.id}
                                    id={organization.id}
                                    name={organization.name}
                                    members_count={organization.members_count}
                                    isCurrent={isCurrent}
                                />
                            );
                        })
                    ) : (
                        <NoContent
                            title="No organizations"
                            description="No organizations found"
                        />
                    )}
                </div>
                <div className="absolute bottom-20 w-full flex md:hidden items-center left-0 right-0 px-6">
                    <Button
                        className="rounded-xl w-full "
                        size={"lg"}
                        onClick={handleJoinOrg}
                    >
                        <Plus strokeWidth={4} />
                        Join Org
                    </Button>
                </div>
            </Container>
            <SwitchOrgSheet
                open={showSwitchDrawer}
                onClose={() => setShowSwitchDrawer(false)}
                organizations={myOrganizations}
            />
            <JoinOrgSheet
                open={showJoinSheet}
                onClose={() => setShowJoinSheet(false)}
            />
        </AppLayout>
    );
}
