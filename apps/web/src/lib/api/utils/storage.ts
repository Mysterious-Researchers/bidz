export enum STORAGE_KEYS {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

class StorageUtil {
  setTokens(accessToken: string, refreshToken: string) {
    if (!process.browser) {
      return;
    }

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  getTokens(): Tokens | null {
    if (!process.browser) {
      return null;
    }

    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    return accessToken && refreshToken ? { accessToken, refreshToken } : null;
  }

  getAccessToken() {
    return this.getTokens()?.accessToken;
  }

  deleteTokens() {
    if (!process.browser) {
      return;
    }

    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }
}

export default new StorageUtil();
