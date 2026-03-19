import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react";

interface NoContentProps{
    title?:string;
    description?:string;
    className?: string;
    showIcon?:boolean
}   

export const NoContent = ({className, title="No data", description="No data found", showIcon=true}: NoContentProps) => {
    return (
        <Empty className={`border-2 ${className}`}>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    {showIcon &&<IconFolderCode/>}
                </EmptyMedia>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
};
