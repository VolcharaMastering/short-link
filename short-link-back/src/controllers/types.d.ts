import { Request, Response, NextFunction } from 'express';

// express types
type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;
