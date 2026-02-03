export interface UserResponse {
  status: boolean;
  data: Omit<import('../../../prisma/generated/prisma').User, 'hashedPassword'>;
}
