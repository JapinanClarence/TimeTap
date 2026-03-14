import { Link, usePage } from "@inertiajs/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

function buildBreadcrumbs(pathname: string) {
    // 1. Strip query strings
    const urlWithoutQuery = pathname.split("?")[0];

    // 2. Filter segments to remove empty strings
    const segments = urlWithoutQuery.split("/").filter(Boolean);

    const crumbs: { label: string; href: string | null }[] = [];
    let cumulativePath = "";

    // This regex catches ULIDs, UUIDs, and numeric IDs
    const idRegex = /^[0-9A-HJKMNP-TV-Z]{26}$|^[0-9a-f-]{8,36}$|^\d+$/i;

    segments.forEach((segment) => {
        cumulativePath += `/${segment}`;

        // Only add to breadcrumbs if it's NOT an ID
        if (!idRegex.test(segment)) {
            crumbs.push({
                label: segment
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase()),
                href: cumulativePath,
            });
        }
    });

    // 3. Ensure the last readable crumb is the current page (not a link)
    if (crumbs.length > 0) {
        // We set the last one to null so it renders as <BreadcrumbPage>
        crumbs[crumbs.length - 1].href = null;

        // Optional: Remove the first crumb if you want "Home" to handle the root
        // For example, if your URL is /app/dashboard, and you want /app to be "Home"
        if (
            crumbs.length > 0 &&
            segments[0] === crumbs[0].label.toLowerCase()
        ) {
            // Usually, we keep it, but you can shift() it if "Home" covers it.
        }
    }

    return crumbs;
}

export function AppBreadcrumb() {
    const { url } = usePage();
    const crumbs = buildBreadcrumbs(url);

    // Dynamically identify the first segment for the "Home" position
    const segments = url.split("/").filter(Boolean);
    const rootSegment = segments[0] || "";
    const rootPath = `/${rootSegment}`;

    // Capitalize only the first letter: "admin" -> "Admin"
    const rootLabel =
        rootSegment.charAt(0).toUpperCase() +
            rootSegment.slice(1).toLowerCase() || "Home";
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        {/* If you are at the root, Home is the Page, else it's a Link */}
                        {url === rootPath || url === `${rootPath}/` ? (
                            <BreadcrumbPage>{rootLabel}</BreadcrumbPage>
                        ) : (
                            <Link href={rootPath}>{rootLabel}</Link>
                        )}
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {crumbs.slice(1).map(
                    (
                        crumb,
                        i, // slice(1) to avoid repeating the root
                    ) => (
                        <React.Fragment key={i}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {crumb.href ? (
                                    <BreadcrumbLink asChild>
                                        <Link href={crumb.href}>
                                            {crumb.label}
                                        </Link>
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>
                                        {crumb.label}
                                    </BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    ),
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
