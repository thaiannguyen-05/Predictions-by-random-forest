import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { AuthService } from '../service/auth.service';

@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: Request) {
    const accessToken = req.cookies?.access_token;

    if (!accessToken) throw new UnauthorizedException('Access token not found');

    const user = await this.authService.validate(accessToken as string);
    if (!user) throw new UnauthorizedException('User not found');

    const { hashedPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
