import { Injectable } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class AuthOtherService {
  // get hardware user
  getClientInfo(req: Request) {
    // Fastest IP extraction with fallback chain
    const ip =
      req.ip ||
      req.socket.remoteAddress ||
      req.connection.remoteAddress ||
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      (req.headers['x-real-ip'] as string) ||
      'unknown';

    // Fastest User-Agent extraction
    const userAgent = req.headers['user-agent'] || 'unknown';

    return { ip, userAgent };
  }

  genrateTokens() {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  }
}
