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
}

export const NoContent = ({title="No data", description="No data found"}: NoContentProps) => {
    return (
        <Empty className="border-2">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <IconFolderCode/>
                </EmptyMedia>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>{description}</EmptyDescription>
            </EmptyHeader>
        </Empty>
    );
};
