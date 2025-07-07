"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenLink = void 0;
const generateShortUrl_1 = require("../utils/generateShortUrl");
const shortenLink = async (req, res) => {
    const { originalUrl, expiresAt, alias } = req.body;
    try {
        const shortUrl = await (0, generateShortUrl_1.generateShortUrl)(originalUrl, expiresAt, alias);
        res.json({ shortUrl });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create short URL' });
    }
};
exports.shortenLink = shortenLink;
