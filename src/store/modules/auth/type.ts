export enum Role {
  Admin = 'admin',
  Normal = 'normal',
}

export type User = {
  name: string;
  username: string;
  role: Role;
};

export type AuthState = {
  init: boolean;
  isAuthenticated: boolean;
  isExpired: boolean;
  user?: User;
  accessToken?: string;
};
