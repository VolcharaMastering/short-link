"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUrlsData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllUrlsData = async (req, res, next) => {
    try {
        const urlsData = await prisma.url.findMany({
            select: {
                id: true,
                originalUrl: true,
                expiresAt: true,
                alias: true,
            },
        });
        res.status(200).json(urlsData);
    }
    catch (error) {
        console.error('Error fetching short URLs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllUrlsData = getAllUrlsData;
