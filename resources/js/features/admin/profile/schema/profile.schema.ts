import { z } from "zod";

export const profileSchema = z.object({
    name: z.string().min(1, "Organization name is required"),
    description:z.string().max(200, "200 characters limit reached").nullable(),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
});

export const changePasswordSchema = z
    .object({
        old_password: z
            .string()
            .min(8, "Password must be at least 8 characters"),
        password: z
            .string()
            .min(8, "New password must be at least 8 characters"),
        password_confirmation: z
            .string()
            .min(8, "Please confirm your new password"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"], // This sets the error specifically on the confirmation field
    });