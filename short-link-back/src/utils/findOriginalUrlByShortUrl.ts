import { prisma } from '../config/prisma';

export const findOriginalUrlByShortUrl = async (
    shortUrl: string,
    redirectedIp: string,
) => {
    const alias = shortUrl.split('/').pop(); // Extract alias from the short URL
    if (!alias) {
        throw new Error('Invalid short URL format');
    }

    try {
        const urlRecord = await prisma.url.findUnique({
            where: { alias },
        });

        if (!urlRecord) {
            return null; // No record found for the given alias
        }

        // Check if the URL has expired
        if (urlRecord.expiresAt && new Date(urlRecord.expiresAt) < new Date()) {
            return null; // URL has expired
        }

        const newIpToUrl = await prisma.visit.create({
            data: {
                ip: redirectedIp,
                urlId: urlRecord.id,
                date: new Date(),
            },
        });
        await prisma.url.update({
            where: { id: urlRecord.id },
            data: {
                clickCount: {
                    increment: 1, // Increment the click count
                },
            },
        });
        if (!newIpToUrl) {
            throw new Error('Failed to create visit record');
        }
        return urlRecord.originalUrl; // Return the original URL
    } catch (error) {
        console.error('Error finding original URL:', error);
        throw new Error('Failed to find original URL');
    }
};
