import { GoogleOAuth2User, FacebookOAuth2User } from '..';
import type { GoogleStrategyUser, FacebookStrategyUser } from '.';

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

  static mapFacebookUser(
    strategyUser: FacebookStrategyUser,
  ): FacebookOAuth2User {
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
