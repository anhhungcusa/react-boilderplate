export type User = {
  name: string;
  username: string;
  role: string;
};

export type AuthState = {
  init: boolean;
  isAuthenticated: boolean;
  isExpired: boolean;
  user?: User;
  accessToken?: string;
};
