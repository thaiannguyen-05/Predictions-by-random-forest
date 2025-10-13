import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../service/auth.service';
import { VerifyCallback } from 'passport-google-oauth20';

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
        private readonly authService: AuthService, // THÊM DÒNG NÀY
    ) {
        super({
            clientID: configService.getOrThrow<string>('FACEBOOK_APP_ID'),
            clientSecret: configService.getOrThrow<string>('FACEBOOK_APP_SECRET'),
            callbackURL: configService.get<string>(
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
            scope: ['email', 'public_profile'],
            passReqToCallback: false,
        });
    }

    // facebook.strategy.ts
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback,
    ): Promise<void> {
        const { id, displayName, emails, photos, name } = profile;

        console.log('=== FACEBOOK STRATEGY ===');

        // QUAN TRỌNG: ĐẢM BẢO CÓ ACCESS TOKEN CHO AVATAR
        const user: FacebookUser = {
            id,
            email: emails?.[0]?.value || `${id}@facebook.com`,
            name: displayName,
            displayName: displayName,
            firstName: name?.givenName || '',
            lastName: name?.familyName || '',
            middleName: name?.middleName || '',
            picture: '', // ĐỂ TRỐNG, SẼ TẠO TRONG SOCIAL LOGIN
            provider: 'facebook',
            accessToken: accessToken, // QUAN TRỌNG: TRUYỀN ACCESS TOKEN
        };

        done(null, user);
    }
}