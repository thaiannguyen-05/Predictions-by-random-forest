import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { AuthenticatedUser, AuthenticatedUserKey } from './types';

export const User = createParamDecorator(
  <K extends AuthenticatedUserKey | undefined = undefined>(
    data: K,
    ctx: ExecutionContext,
  ): K extends AuthenticatedUserKey
    ? AuthenticatedUser[K]
    : AuthenticatedUser => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user?: AuthenticatedUser }>();
    const user = request.user;

    if (!user) {
      return undefined as K extends AuthenticatedUserKey
        ? AuthenticatedUser[K]
        : AuthenticatedUser;
    }

    if (data) {
      return user[data] as K extends AuthenticatedUserKey
        ? AuthenticatedUser[K]
        : AuthenticatedUser;
    }

    return user as K extends AuthenticatedUserKey
      ? AuthenticatedUser[K]
      : AuthenticatedUser;
  },
);
