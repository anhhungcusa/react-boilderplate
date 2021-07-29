export const ENV = {
  LOCAL_KEY: process.env.REACT_APP_LOCAL_KEY || 'local-rc-key',
  COOKIE_KEY: process.env.REACT_APP_COOKIE_KEY || 'cookie-rc-key',
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
};

if (process.env.REACT_APP_HOT_LOAD_ENV && process.env.NODE_ENV === 'development') {
  // local
}
