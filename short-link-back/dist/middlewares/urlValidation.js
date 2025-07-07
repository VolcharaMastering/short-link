"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlValidationSchema = void 0;
const zod_1 = require("zod");
const urlValidationSchema = zod_1.z.object({
    originalUrl: zod_1.z.string().url(),
    expiresAt: zod_1.z.date().optional(),
    alias: zod_1.z.string().max(20).optional(),
});
exports.urlValidationSchema = urlValidationSchema;
// - originalUrl (обязательное) - исходный URL,
// - expiresAt (опциональное) - дата окончания действия укороченной ссылки,
// - alias (опциональное) - пользовательский алиас для URL (максимальная длина 20 символов)
// Эндпоинт возвращает уникальный укороченный URL.
