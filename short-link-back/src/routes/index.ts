import express, { Request, Response, NextFunction } from 'express';
import NotFound from '../errors/notFound';
import { urlValidationSchema } from '../middlewares/urlValidation';
import { zodValidate } from '../utils/zodValidate';
import { shortenLink } from '../controllers/shortenLink';
import { getAllUrlsData } from '../controllers/getAllUrlsData';

const router = express.Router();

router.post('/shorten', zodValidate(urlValidationSchema), shortenLink);

router.get('/', getAllUrlsData);

router.use((req, res, next) => {
  next(NotFound('Page not found'));
});

export default router;
