// src/common/strategy/google.strategy.ts (Mã đã sửa cuối cùng)
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // SỬA: Đảm bảo mặc định là cổng 4000
            callbackURL: process.env.GOOGLE_CALLBACK_URL ?? 'http://localhost:4000/auth/google/callback', 
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            // SỬA: Thêm optional chaining (?.)
            email: emails?.[0]?.value,
            firstName: name.givenName,
            lastName: name.familyName,
            // SỬA: Thêm optional chaining (?.)
            picture: photos?.[0]?.value,
            accessToken,
        };
        done(null, user);
    }
}