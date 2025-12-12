import { User } from 'prisma/generated/prisma';

/**
 * User type không bao gồm trường hashedPassword
 * Dùng cho các response trả về client
 */
export type UserWithoutPassword = Omit<User, 'hashedPassword'>;
