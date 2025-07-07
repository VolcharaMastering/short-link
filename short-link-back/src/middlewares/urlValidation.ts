import { z } from 'zod';

const urlValidationSchema = z.object({
    originalUrl: z.string().url(),
    expiresAt: z.date().optional(),
    alias: z.string().max(20).optional(),
});

export { urlValidationSchema };

// - originalUrl (обязательное) - исходный URL,
// - expiresAt (опциональное) - дата окончания действия укороченной ссылки,
// - alias (опциональное) - пользовательский алиас для URL (максимальная длина 20 символов)
// Эндпоинт возвращает уникальный укороченный URL.
