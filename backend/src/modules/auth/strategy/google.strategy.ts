import { GoogleOAuth2User } from '../auth.interface';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

interface _GoogleUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  fullName?: string;
  picture: string;
  provider: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>(
        'GOOGLE_CALLBACK_URL',
        'http://localhost:4000/auth/google/callback',
      ),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { name, emails, photos, id, displayName } = profile;

    let picture = '';
    if (photos && photos[0] && photos[0].value) {
      picture = photos[0].value;
      if (
        picture.includes('googleusercontent.com') &&
        picture.includes('=s96-c')
      ) {
        picture = picture.replace('=s96-c', '=s400-c');
      }
    }

    const user: GoogleOAuth2User = {
      providerUserId: id,
      email: emails?.[0]?.value ?? '',
      firstname: name?.givenName,
      username: emails?.[0]?.value?.split('@')[0],
      lastname: name?.familyName,
      fullname:
        displayName ||
        `${name?.givenName || ''} ${name?.familyName || ''}`.trim(), // THÊM DÒNG NÀY
      avatarUrl: picture,
      provider: 'GOOGLE',
      accessToken,
    };

    console.log('Google profile with full name:', user);

    done(null, user);
  }
}
