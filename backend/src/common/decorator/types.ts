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
