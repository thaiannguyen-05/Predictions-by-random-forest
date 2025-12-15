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
 * Custom decorator để lấy thông tin user đã xác thực
 * @param data - Optional: key cụ thể của user cần lấy (id, email, createdAt)
 * @returns Toàn bộ user object hoặc giá trị của field được chỉ định
 *
 * @example
 * // Lấy toàn bộ user object
 * @User() user: AuthenticatedUser
 *
 * @example
 * // Chỉ lấy userId
 * @User('id') userId: string
 *
 * @example
 * // Lấy email
 * @User('email') email: string
 */
export const User = createParamDecorator(
  <K extends keyof AuthenticatedUser>(
    data: K | undefined,
    ctx: ExecutionContext,
  ): AuthenticatedUser | AuthenticatedUser[K] | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUser | undefined;

    if (!user) {
      return undefined;
    }

    return data ? user[data] : user;
  },
);
