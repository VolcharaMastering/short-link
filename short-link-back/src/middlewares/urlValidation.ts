import { z } from 'zod';

const urlValidationSchema = z.object({
    originalUrl: z.string().url(),
    expiresAt: z.date().optional(),
    alias: z.string().max(20).optional(),
});

export { urlValidationSchema };
