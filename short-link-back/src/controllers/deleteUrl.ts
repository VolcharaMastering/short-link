import { prisma } from '../config/prisma';
import { RequestHandler } from './types';

export const deleteUrl: RequestHandler = async (req, res, next) => {
    const { shortUrl } = req.params;

    try {
        const deletedUrl = await prisma.url.delete({
            where: { alias: shortUrl },
        });

        if (!deletedUrl) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        await prisma.visit.deleteMany({
            where: { urlId: deletedUrl.id },
        });

        res.status(200).json({
            message: 'Short URL deleted successfully',
            deletedUrl,
        });
    } catch (error) {
        console.error('Error deleting URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
