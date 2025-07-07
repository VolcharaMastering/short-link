import { prisma } from '../config/prisma';
import { RequestHandler } from './types';
import { OK_CODE } from '../states/states';
import serverError from '../errors/serverError';

export const getAllUrlsData: RequestHandler = async (req, res, next) => {
    try {
        const urlsData = await prisma.url.findMany({
            select: {
                id: true,
                originalUrl: true,
                expiresAt: true,
                alias: true,
                clickCount: true,
            },
        });
        res.status(OK_CODE).json(urlsData);
    } catch (error: Error | any) {
        next(serverError(`Error fetching short URLs: ${error.message}`));
        return;
    }
};
