import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../modules/auth/service/auth.service'; // THÊM DÒNG NÀY

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
        done: (err: any, user?: any) => void,
    ): Promise<any> {
        const { id, displayName, emails, photos, name } = profile;

        console.log('=== FACEBOOK STRATEGY ===');

        // QUAN TRỌNG: ĐẢM BẢO CÓ ACCESS TOKEN CHO AVATAR
        const user = {
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

        console.log('✅ Facebook user with access token');
        done(null, user);
    }
}