import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import requestError from '../errors/requestError';

export const zodValidate =
    (schema: ZodSchema<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            next(
                requestError(
                    `Validation error ${result.error.errors.map(
                        (error) => error.message,
                    )}`,
                ),
            );
            return;
        }
        next();
    };
