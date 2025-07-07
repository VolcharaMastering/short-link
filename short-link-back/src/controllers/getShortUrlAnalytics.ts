import { prisma } from '../config/prisma';
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
            return res.status(404).json({ error: 'Short URL not found' });
        }

        res.status(200).json(urlAnalytics);
    } catch (error) {
        console.error('Error fetching URL analytics:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
