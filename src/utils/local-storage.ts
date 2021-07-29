export const LocalStorageUtil = {
  get(key: string) {
    return localStorage.getItem(key);
  },
  getJSON<T>(key: string): null | T {
    try {
      const stringify = this.get(key);
      if (!stringify) return null;
      return JSON.parse(stringify) as T;
    } catch (error) {
      return null;
    }
  },
  set(key: string, data: string) {
    localStorage.setItem(key, data);
  },
  clear(key: string) {
    localStorage.removeItem(key);
  },
};
