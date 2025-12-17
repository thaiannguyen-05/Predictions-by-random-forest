import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Interface đại diện cho user đã xác thực từ JWT payload
 * Được inject vào request.user sau khi qua JwtAuthGuard
 */
export interface AuthenticatedUser {
  id: string;
  email: string;
  createdAt?: Date;
}

/**
 * Các field có thể lấy từ AuthenticatedUser
 */
export type AuthenticatedUserKey = keyof AuthenticatedUser;

/**
 * Custom decorator để lấy thông tin user đã xác thực từ request
 *
 * @description
 * Decorator này extract user từ request.user (được inject bởi JwtAuthGuard)
 * Hỗ trợ lấy toàn bộ user object hoặc một field cụ thể
 *
 * @example
 * // Lấy toàn bộ user object
 * @Get('profile')
 * getProfile(@User() user: AuthenticatedUser) {
 *   return user;
 * }
 *
 * @example
 * // Chỉ lấy userId
 * @Post('create')
 * create(@User('id') userId: string) {
 *   return this.service.create(userId);
 * }
 *
 * @example
 * // Lấy email
 * @Get('email')
 * getEmail(@User('email') email: string) {
 *   return { email };
 * }
 */
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
