import express, { Request, Response, NextFunction } from 'express';
import NotFound from '../errors/notFound';
import { urlValidationSchema } from '../middlewares/urlValidation';
import { zodValidate } from '../utils/zodValidate';
import { shortenLink } from '../controllers/shortenLink';
import { getAllUrlsData } from '../controllers/getAllUrlsData';
import { redirectToOriginalUrl } from '../controllers/redirectToOriginalUrl';
import { getUrlInfo } from '../controllers/getUrlInfo';
import { getShortUrlAnalytics } from '../controllers/getShortUrlAnalytics';
import { deleteUrl } from '../controllers/deleteUrl';

const router = express.Router();

router.post('/shorten', zodValidate(urlValidationSchema), shortenLink);

router.get('/', getAllUrlsData);
router.get('/:shortUrl', redirectToOriginalUrl);
router.get('/info/:shortUrl', getUrlInfo);
router.get('/analytics/:shortUrl', getShortUrlAnalytics);
router.delete('/delete/:shortUrl', deleteUrl);

router.use((req, res, next) => {
    next(NotFound('Page not found'));
});

export default router;
