"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodValidate = void 0;
const zodValidate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ error: result.error.errors });
        return;
    }
    next();
};
exports.zodValidate = zodValidate;
