export const CookieUtil = {
  set(key: string, value: string, expires: string, config?: { path?: string }) {
    document.cookie = `${key}=${value}; path=${config?.path || '/'}; expires=${expires};`;
  },
  get(key: string) {
    const name = key + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  },
  getJSON(key: string): any {
    try {
      let stringify = this.get(key);
      if (stringify === null) {
        throw new Error('Cannot get JSON data of' + key);
      }
      return JSON.parse(stringify);
    } catch (error) {
      console.error(`[getJSON] ${error.message}`);
      return null;
    }
  },
  clear(key: string) {
    document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },
};
