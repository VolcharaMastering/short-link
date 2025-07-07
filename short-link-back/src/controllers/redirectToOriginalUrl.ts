import { findOriginalUrlByShortUrl } from '../utils/findOriginalUrlByShortUrl';
import { RequestHandler } from './types';
import NotFound from '../errors/notFound';
import { getClientIp } from '../utils/getClientIp';
import serverError from '../errors/serverError';

export const redirectToOriginalUrl: RequestHandler = async (req, res, next) => {
    const { shortUrl } = req.params;
    const ip = getClientIp(req);

    try {
        const originalUrl = await findOriginalUrlByShortUrl(shortUrl, ip);

        if (!originalUrl) {
            next(NotFound(`Short URL ${shortUrl} not found`));
            return;
        }

        return res.redirect(302, originalUrl);
    } catch (error: Error | any) {
        if (error.code === 'P2025') {
            next(NotFound(`Short URL ${shortUrl} not found`));
            return;
        }
        next(
            serverError(
                `Error redirecting to original URL for ${shortUrl}: ${error.message}`,
            ),
        );
    }
};
