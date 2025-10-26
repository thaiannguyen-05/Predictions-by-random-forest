import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { User } from 'prisma/generated/prisma';
import { AuthService } from 'src/modules/auth/service/auth.service';

type UserWithoutPassword = Omit<User, 'hashedPassword'>;
@Injectable()
export class CookieStrategy extends PassportStrategy(Strategy, 'cookie') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(req: Request) {
    // get access token from req
    const accessToken = req.cookies?.access_token;

    if (!accessToken) throw new UnauthorizedException('Access token not found');

    // Always return UserWithoutPassword, not full User
    const user = await this.authService.validate(accessToken);
    if (!user) throw new UnauthorizedException('User not found');
    // Remove hashedPassword if present
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
