import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Generate alias length from 2 to 5 characters
const generateAlias = () => {
    const aliasLength = Math.floor(Math.random() * 4) + 2;
    const chars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let alias = '';
    for (let i = 0; i < aliasLength; i++) {
        alias += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return alias;
};

export const generateShortUrl = async (
    originalUrl: string,
    expiresAt: Date | null,
    alias: string | null,
) => {
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
                const shortUrl = `${process.env.HTTP_HOST}/${finalAlias}`;
                return shortUrl;
            } catch (error) {
                console.error(error);
                throw new Error('Failed to create short URL');
            }
        } else {
            // Alias already exists, generate a new one
            finalAlias = generateAlias();
            console.log('Alias already exists');
        }
    }
};
