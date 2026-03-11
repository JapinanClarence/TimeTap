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
import { usePage } from "@inertiajs/react";
import { OrganizationType } from "@/types/organization";
import { NoContent } from "@/features/app/home/no-content";
import JoinOrgSheet from "@/components/app/join-org-sheet";
import SwitchOrgSheet from "@/features/app/home/switch-org-sheet";

interface OrganizationProps {
    [key: string]: unknown;
    organizations: OrganizationType[];
    currentOrg: OrganizationType | null;
    myOrganizations: OrganizationType[];
}

export default function organizations() {
    const { props } = usePage<OrganizationProps>();
    const organizations = props.organizations;
    const [showJoinSheet, setShowJoinSheet] = useState(false);
    const [showSwitchDrawer, setShowSwitchDrawer] = useState(false);
    const currentOrg = props.currentOrg;

    const handleJoinOrg = (e: any) => {
        (e.currentTarget as HTMLButtonElement).blur();
        setShowJoinSheet(true);
    };
    return (
        <AppLayout secondaryHeader={true} title={"Organizations"}>
            <Container className="xl:px-8 mt-5 space-y-5 ">
                {currentOrg && (
                    <div className="md:hidden flex justify-between items-center bg-primary/5 rounded-xl border border-primary/50 px-3 py-1.5">
                        <div>
                            <p className="font-semibold text-muted-foreground">
                                Current Organization
                            </p>
                            <p className="font-semibold text-primary">
                                {currentOrg.name}
                            </p>
                        </div>

                        <Button
                            className="text-muted-foreground px-0"
                            variant={"link"}
                            onClick={(e) => {
                                (e.currentTarget as HTMLButtonElement).blur();
                                setShowSwitchDrawer(true);
                            }}
                        >
                            Tap to switch
                        </Button>
                    </div>
                )}
                <h3 className="font-bold text-muted-foreground">
                    Your Organizations
                </h3>
                <div>
                    {organizations.length > 0 ? (
                        organizations.map((organization) => (
                            <OrganizationCard
                                key={organization.id}
                                name={organization.name}
                            />
                        ))
                    ) : (
                        <NoContent
                            title="No organizations"
                            description="No organizations found"
                        />
                    )}
                </div>
                <div className="absolute bottom-20 w-full flex items-center left-0 right-0 px-6">
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
                organizations={props.myOrganizations}
            />
            <JoinOrgSheet
                open={showJoinSheet}
                onClose={() => setShowJoinSheet(false)}
            />
        </AppLayout>
    );
}
