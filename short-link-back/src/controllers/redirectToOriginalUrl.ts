import { findOriginalUrlByShortUrl } from "../utils/findOriginalUrlByShortUrl";
import { RequestHandler } from "./types";
import NotFound from '../errors/notFound';
import { getClientIp } from "../utils/getClientIp";

export const redirectToOriginalUrl: RequestHandler = async (req, res, next) => {
  const { shortUrl } = req.params;
  const ip = getClientIp(req);
  console.log("request from IP", ip, "for short URL:", shortUrl);

  try {
    const originalUrl = await findOriginalUrlByShortUrl(shortUrl, ip);

    if (!originalUrl) {
      return next(NotFound('Short URL not found'));
    }

    return res.redirect(302, originalUrl);
  } catch (err) {
    next(err);
  }
};