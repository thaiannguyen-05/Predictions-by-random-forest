// src/common/strategy/facebook.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(
        private readonly configService: ConfigService
    ) {
        super({
            clientID: configService.getOrThrow<string>("FACEBOOK_APP_ID"),
            clientSecret: configService.getOrThrow<string>("FACEBOOK_APP_SECRET"),
            callbackURL: configService.get<string>("FACEBOOK_CALLBACK_URL", 'http://localhost:4000/auth/facebook/callback'),
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
