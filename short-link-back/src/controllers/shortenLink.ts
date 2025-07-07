import { Request, Response } from 'express';
import { generateShortUrl } from '../utils/generateShortUrl';


export const shortenLink = async (req: Request, res: Response) => {
    const { originalUrl, expiresAt, alias } = req.body;
    try {
        const shortUrl = await generateShortUrl(originalUrl, expiresAt, alias);
        res.json({ shortUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create short URL' });
    }
};
