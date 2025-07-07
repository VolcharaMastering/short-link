import { prisma } from '../config/prisma';
import notFound from '../errors/notFound';
import serverError from '../errors/serverError';
import { OK_CODE } from '../states/states';
import { RequestHandler } from './types';

export const getUrlInfo: RequestHandler = async (req, res, next) => {
    const { shortUrl } = req.params;

    try {
        const urlInfo = await prisma.url.findUnique({
            where: { alias: shortUrl },
            select: {
                id: true,
                originalUrl: true,
                expiresAt: true,
                alias: true,
                clickCount: true,
            },
        });

        if (!urlInfo) {
            next(notFound(`Short URL ${shortUrl} not found`));
            return;
        }

        res.status(OK_CODE).json(urlInfo);
    } catch (error: Error | any) {
        // Prisma error for not found
        if (error.code === 'P2025') {
            next(notFound(`Short URL ${shortUrl} not found`));
            return;
        }
        next(
            serverError(
                `Error fetching URL info for ${shortUrl}: ${error.message}`,
            ),
        );
        return;
    }
};
