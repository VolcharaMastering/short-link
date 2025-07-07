import { IncomingMessage } from 'http';

export const getClientIp = (req: IncomingMessage): string =>{
  const header = req.headers['x-forwarded-for'] || req.headers['x-real-ip'];
  if (Array.isArray(header)) return header[0] || '';
  if (typeof header === 'string') return header;
  return req.socket?.remoteAddress ?? '';
}