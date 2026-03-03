export type NotificationType = {
    id: string; // Added ID for keys
    message: string;
    read_at: string | null;
    type: "invitation" | "event" | string;
    subject_id: string;
    subject_type: string;
    subject: InvitationSubject | any; // Polymorphic data
    created_at: string;
};
export type InvitationSubject = {
    id: string;
    status: 'pending' | 'accepted' | 'declined';
    organization_id: string;
};