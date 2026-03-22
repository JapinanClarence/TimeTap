import OrgForm from "@/features/auth/components/org-form";
import RegisterOrgForm from "@/features/auth/components/register-org-form";
import AuthLayout from "@/layouts/auth/AuthLayout";
import React from "react";

export default function RegisterOrg() {
    return (
        <AuthLayout>
            {/* <RegisterOrgForm/> */}

            <OrgForm />
        </AuthLayout>
    );
}
