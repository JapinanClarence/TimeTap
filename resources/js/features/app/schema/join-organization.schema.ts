import { z } from "zod";


export const joinOrgSchema = z.object({
    invitation_code: z.string().min(1, "Invitation code is required")
})
