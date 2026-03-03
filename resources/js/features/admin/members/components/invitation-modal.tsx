import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InviteEmailForm from "./invite-email-form";
import GenerateCodeForm from "./generate-code-form";
import { InvitationCodeType } from "@/types/member";
interface InvitationModalProps {
    open: boolean;
    onOpenChange: () => void;
    invitation: InvitationCodeType;
}

export default function InvitationModal({
    open,
    onOpenChange,
    invitation
}: InvitationModalProps) {


  
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Invite members</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    <Tabs defaultValue="generate">
                        <TabsList>
                            <TabsTrigger value="generate">
                                Generate Code
                            </TabsTrigger>
                            <TabsTrigger value="email">Email</TabsTrigger>
                        </TabsList>
                        <TabsContent value="generate">
                            <GenerateCodeForm invitation={invitation}/>
                        </TabsContent>
                        <TabsContent value="email">
                            <InviteEmailForm />
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}
