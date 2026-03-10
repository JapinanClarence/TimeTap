import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import AppLayout from "@/layouts/app/app-layout";
import { Plus, Search, X } from "lucide-react";
import React from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import OrganizationCard from "@/features/app/organizations/organization-card";
import { usePage } from "@inertiajs/react";
import { OrganizationType } from "@/types/organization";
import { NoContent } from "@/features/app/home/no-content";

interface OrganizationProps {
    [key: string]: unknown;
    organizations: OrganizationType[];
}

export default function organizations() {
    const { props } = usePage<OrganizationProps>();
    const organizations = props.organizations;

    return (
        <AppLayout showHeader={false}>
            <Container className="xl:px-8 mt-5 space-y-5 ">
                {/* <div>
                    <InputGroup className="">
                        <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                            <Button variant={"ghost"}>
                                <X/>
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </div> */}
                <div>
                    {organizations.length > 0 ? (
                        organizations.map((organization) => <OrganizationCard key={organization.id} name={organization.name}/>)
                    ) : (
                        <NoContent
                            title="No organizations"
                            description="No organizations found"
                        />
                    )}
                </div>
                <div className="absolute bottom-20 w-full flex items-center left-0 right-0 px-6">
                    <Button className="rounded-full w-full " size={"lg"}>
                        <Plus strokeWidth={4} />
                        Join Org
                    </Button>
                </div>
            </Container>
        </AppLayout>
    );
}
