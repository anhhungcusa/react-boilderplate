import { CookieStorage } from 'services';
import { User } from 'store/modules/auth';

import { ENV } from './env';

export const authStorage = new CookieStorage<{ user: User; accessToken: string }>(
  ENV.COOKIE_KEY,
  true,
  1,
);
