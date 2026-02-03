import { User } from 'prisma/generated/prisma';

export type UserWithoutPassword = Omit<User, 'hashedPassword'>;
