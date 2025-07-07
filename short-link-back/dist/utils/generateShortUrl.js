"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortUrl = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Generate alias length from 2 to 5 characters
const generateAlias = () => {
    const aliasLength = Math.floor(Math.random() * 4) + 2;
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let alias = '';
    for (let i = 0; i < aliasLength; i++) {
        alias += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return alias;
};
const generateShortUrl = async (originalUrl, expiresAt, alias) => {
    // Check if alias was provided, if not - generate one
    let finalAlias = alias || generateAlias();
    // Check alias uniqueness and create record
    while (true) {
        const existingUrl = await prisma.url.findUnique({
            where: { alias: finalAlias },
        });
        if (!existingUrl) {
            // Alias is unique, create record
            try {
                await prisma.url.create({
                    data: {
                        originalUrl,
                        expiresAt,
                        alias: finalAlias,
                    },
                });
                const shortUrl = `${process.env.BASE_URL}/${finalAlias}`;
                return shortUrl;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to create short URL');
            }
        }
        else {
            // Alias already exists, generate a new one
            finalAlias = generateAlias();
            console.log('Alias already exists');
        }
    }
};
exports.generateShortUrl = generateShortUrl;
