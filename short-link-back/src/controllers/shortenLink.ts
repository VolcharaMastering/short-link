import serverError from '../errors/serverError';
import { generateShortUrl } from '../utils/generateShortUrl';
import { RequestHandler } from './types';

export const shortenLink: RequestHandler = async (req, res, next) => {
    const { originalUrl, expiresAt, alias } = req.body;
    try {
        const shortUrl = await generateShortUrl(originalUrl, expiresAt, alias);
        res.json({ shortUrl });
    } catch (error: Error | any) {
        // Unique constraint violation, likely alias already exists
        if (error.code === 'P2002') {
            return next(
                serverError(
                    `Short URL alias ${alias} already exists. Please choose a different alias.`,
                ),
            );
        }
        next(
            serverError(
                `Error generating short URL for ${originalUrl}: ${error.message}`,
            ),
        );
    }
};
