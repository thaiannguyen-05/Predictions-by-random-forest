export interface GoogleStrategyUser {
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

export interface FacebookStrategyUser {
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
