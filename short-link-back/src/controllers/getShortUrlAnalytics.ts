import { prisma } from '../config/prisma';
import notFound from '../errors/notFound';
import serverError from '../errors/serverError';
import { OK_CODE } from '../states/states';
import { RequestHandler } from './types';

export const getShortUrlAnalytics: RequestHandler = async (req, res, next) => {
    const { shortUrl } = req.params;

    try {
        const urlAnalytics = await prisma.url.findUnique({
            where: { alias: shortUrl },
            select: {
                id: true,
                originalUrl: true,
                expiresAt: true,
                alias: true,
                clickCount: true,
                createdAt: true,
                visits: {
                    select: {
                        ip: true,
                        date: true,
                    },
                    take: 5,
                },
            },
        });

        if (!urlAnalytics) {
            next(notFound(`Short URL ${shortUrl} not found`));
        }

        res.status(OK_CODE).json(urlAnalytics);
    } catch (error: Error | any) {
        next(
            serverError(
                `Error fetching analytics for short URL ${shortUrl}: ${error.message}`,
            ),
        );
    }
};
