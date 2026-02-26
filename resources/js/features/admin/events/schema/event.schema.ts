import { z } from "zod";

export const eventSchema = z
    .object({
        title: z.string().min(1, "Title is required"),

        description: z.string().optional(),

        location: z.string().min(1, "Location is required"),

        start_date: z.string().min(1, "Start date is required"),

        end_date: z.string().min(1, "End date is required"),
        start_time: z.string().min(1, "Start time is required"),
        end_time: z.string().min(1, "End time is required"),
        coordinates: z
            .array(
                z.object({
                    long: z.number(),
                    lat: z.number(),
                }),
            )
            .optional(),
    })
    .refine(
        (data) =>
            new Date(data.end_date).getTime() >
            new Date(data.start_date).getTime(),
        {
            message: "End date must be after start date",
            path: ["end_date"],
        },
    );

export type EventType = z.infer<typeof eventSchema>;
