import { z } from "zod";

export const formSchema = z.object({
    link: z.string().url("Invalid URL format"),
    alias: z
        .string()
        .min(3, "Alias must be at least 3 characters long")
        .max(20, "Alias must be at most 20 characters long")
        .optional(),
    expireDate: z
        .string()
        .regex(/^\d{2}\.\d{2}\.\d{4}\s\d{2}:\d{2}$/, "Date must be in format dd.mm.yyyy hh:mm")
        .refine(
            (dateStr) => {
                const [datePart, timePart] = dateStr.split(" ");
                const [day, month, year] = datePart.split(".").map(Number);
                const [hour, minute] = timePart.split(":").map(Number);
                const parsed = new Date(year, month - 1, day, hour, minute);
                return !isNaN(parsed.getTime());
            },
            {
                message: "Invalid date value",
            }
        )
        .optional(),
});
