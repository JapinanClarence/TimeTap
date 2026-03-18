export type MemberType = {
    first_name: string;
    last_name: string;
    email: string;
    id?: string;
    gender?: string;
    created_at?:string;
};
export type InvitationCodeType = {
    code: string;
    expires_at: string;
    is_expired: boolean;
};
