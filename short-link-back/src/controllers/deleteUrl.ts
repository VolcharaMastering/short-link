import { prisma } from '../config/prisma';
import notFound from '../errors/notFound';
import serverError from '../errors/serverError';
import { OK_CODE } from '../states/states';
import { RequestHandler } from './types';

export const deleteUrl: RequestHandler = async (req, res, next) => {
    const { shortUrl } = req.params;

    try {
        const deletedUrl = await prisma.url.delete({
            where: { alias: shortUrl },
        });
        return res.status(OK_CODE).json({
            message: 'Short URL deleted successfully',
            deletedUrl,
        });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return next(notFound(`Short URL ${shortUrl} not found`));
        }
        console.error(error);
        return next(
            serverError(`Error deleting URL ${shortUrl}: ${error.message}`),
        );
    }
};
