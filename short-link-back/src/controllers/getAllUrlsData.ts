import { prisma } from '../config/prisma';
import { RequestHandler } from './types';

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
        res.status(200).json(urlsData);
    } catch (error) {
        console.error('Error fetching short URLs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
