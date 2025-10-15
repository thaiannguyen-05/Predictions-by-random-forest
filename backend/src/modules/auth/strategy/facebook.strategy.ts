import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../service/auth.service';
import { FacebookOAuth2User } from '../auth.interface';

interface FacebookUser {
    id: string;
    email: string;
    name: string;
    displayName: string;
    firstName: string;
    lastName: string;
    middleName: string;
    picture: string;
    provider: string;
    accessToken: string;
}

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(
        private readonly configService: ConfigService,
    ) {
        super({
            clientID: configService.getOrThrow<string>('FACEBOOK_APP_ID'),
            clientSecret: configService.getOrThrow<string>('FACEBOOK_APP_SECRET'),
            callbackURL: configService.getOrThrow<string>(
                'FACEBOOK_CALLBACK_URL',
                'http://localhost:4000/auth/facebook/callback',
            ),
            profileFields: [
                'id',
                'displayName',
                'emails',
                'name',
                'picture.type(large)',
            ],
            scope: ['email', 'public_profile']
        });
    }

    // facebook.strategy.ts
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile
    ): Promise<FacebookOAuth2User> {
        const { id, displayName, emails, photos, name } = profile;

        const user: FacebookOAuth2User = {
            providerUserId: id,
            email: emails?.[0]?.value || '',
            fullname: displayName || `${name?.givenName || ''} ${name?.familyName || ''}`.trim(),
            firstname: name?.givenName,
            lastname: name?.familyName,
            avatarUrl: photos?.[0]?.value,
            username: displayName || `${name?.givenName || ''}_${name?.familyName || ''}`.replace(' ', '_'),
            provider: 'FACEBOOK',
            accessToken
        }

        return user
    }
}