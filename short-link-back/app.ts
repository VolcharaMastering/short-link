require('dotenv').config();
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import { Client } from 'pg';
import { rateLimit } from 'express-rate-limit';
import notFound from './src/errors/notFound';
import errorHandler from './src/middlewares/errorHandler';
import router from './src/routes';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
const { HTTP_PORT = 8081, PGHOST='localhost', PGPORT = '5432', PGUSER = "admin", PGPASSWORD = "password123", PGDATABASE = "short-link" } = process.env;

const app: Express = express();
app.use(limiter);
app.use(cors());
app.use(express.json());

app.use(router);

app.use((req, res, next) => {
  next(notFound('Page not found'));
});

app.use(errorHandler);

// PostgreSQL connection via 'pg' package
async function connect() {
    const client = new Client({
        host: PGHOST,
        port: PGPORT ? Number(PGPORT) : 5432,
        user: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE,
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL successfully!');
        app.listen(HTTP_PORT, () => {
            console.log(`connected! on port ${HTTP_PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
        process.exit(1);
    }
}

connect();

