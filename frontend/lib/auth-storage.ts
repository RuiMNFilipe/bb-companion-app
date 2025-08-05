const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

interface TokenStorage {
  getToken(): Promise<string | null>;
  setToken(token: string): Promise<void>;
  removeToken(): Promise<void>;
  getRefreshToken(): Promise<string | null>;
  setRefreshToken(token: string): Promise<void>;
  removeRefreshToken(): Promise<void>;
  getUserData(): Promise<any>;
  setUserData(userData: any): Promise<void>;
  removeUserData(): Promise<void>;
  clearAll(): Promise<void>;
}

class WebTokenStorage implements TokenStorage {
  getToken = async (): Promise<string | null> => {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
      return null;
    }
  };

  setToken = async (token: string): Promise<void> => {
    try {
      void localStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting token in localStorage:', error);
      throw error;
    }
  };

  removeToken = async (): Promise<void> => {
    try {
      void localStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token from localStorage:', error);
    }
  };

  getRefreshToken = async (): Promise<string | null> => {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token from localStorage:', error);
      return null;
    }
  };

  removeRefreshToken = async (): Promise<void> => {
    try {
      void localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing refresh token from localStorage:', error);
    }
  };

  getUserData = async (): Promise<Omit<Coach>> => {};
}
