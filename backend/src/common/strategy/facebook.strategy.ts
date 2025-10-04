// src/common/strategy/facebook.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor() {
        super({
            clientID: process.env.FACEBOOK_APP_ID as string,
            clientSecret: process.env.FACEBOOK_APP_SECRET as string,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL ?? 'http://localhost:3000/auth/facebook/callback',
            profileFields: ['id', 'emails', 'name', 'photos'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: Function,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails?.[0]?.value,
            firstName: name?.givenName,
            lastName: name?.familyName,
            picture: photos?.[0]?.value,
            accessToken,
        };
        done(null, user);
    }
}
