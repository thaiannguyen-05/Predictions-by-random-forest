export interface AuthenticatedUser {
  id: string;
  email: string;
  createdAt?: Date;
}

export type AuthenticatedUserKey = keyof AuthenticatedUser;
