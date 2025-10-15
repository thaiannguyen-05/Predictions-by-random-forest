import { GoogleOAuth2User, FacebookOAuth2User } from '../auth.interface';

interface GoogleStrategyUser {
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

interface FacebookStrategyUser {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  fullName?: string;
  picture?: string;
  provider: string;
  accessToken: string;
  refreshToken?: string;
}

export class OAuth2Mapper {
  static mapGoogleUser(strategyUser: GoogleStrategyUser): GoogleOAuth2User {
    return {
      providerUserId: strategyUser.id,
      email: strategyUser.email ?? '',
      fullname: strategyUser.fullName ?? strategyUser.displayName ?? '',
      firstname: strategyUser.firstName,
      lastname: strategyUser.lastName,
      avatarUrl: strategyUser.picture,
      username: strategyUser.email?.split('@')[0],
      provider: 'GOOGLE',
      accessToken: strategyUser.accessToken,
    };
  }

  static mapFacebookUser(strategyUser: FacebookStrategyUser): FacebookOAuth2User {
    return {
      providerUserId: strategyUser.id,
      email: strategyUser.email ?? '',
      fullname: strategyUser.fullName ?? strategyUser.displayName ?? '',
      firstname: strategyUser.firstName,
      lastname: strategyUser.lastName,
      avatarUrl: strategyUser.picture,
      username: strategyUser.email?.split('@')[0],
      provider: 'FACEBOOK',
      accessToken: strategyUser.accessToken,
    };
  }
}
