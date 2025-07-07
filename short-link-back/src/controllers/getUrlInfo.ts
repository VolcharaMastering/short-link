import { prisma } from "../config/prisma";
import { RequestHandler } from "./types";

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
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.status(200).json(urlInfo);
  } catch (error) {
    console.error('Error fetching URL info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}