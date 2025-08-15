import * as Network from 'expo-network';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { LoginFormData, SignUpFormData } from '@/types';
import { Coach, Skill, Team } from '@bb-companion/database';
import { TeamWithPositions } from '@bb-companion/shared';

export const API_CONFIG = {
  BASE_URL: __DEV__
    ? Platform.OS === 'web'
      ? 'http://localhost:3000/api'
      : 'http://192.168.1.81:3000/api'
    : 'https://production-api-url.com/api',
  TIMEOUT: 10000,
};

export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const checkNetworkStatus = async (): Promise<boolean> => {
  try {
    const networkState = await Network.getNetworkStateAsync();
    return networkState.isConnected === true;
  } catch {
    return navigator.onLine ?? true;
  }
};

export const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const isConnected = await checkNetworkStatus();
  if (!isConnected) {
    throw new ApiError('No internet connection.', 0);
  }

  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = await getAuthToken();
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...(Platform.OS !== 'web' && {
      signal: controller.signal,
    }),
  };

  try {
    const response = await fetch(url, config);

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }

      throw new ApiError(
        errorData.message || `HTTP ${response.status}`,
        response.status,
        errorData,
      );
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return response.text() as unknown as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 400);
      }

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new ApiError('Network error', 0);
      }
    }

    throw new ApiError('Unknown error occurred.', 500);
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem('auth_token');
  }

  return await SecureStore.getItemAsync('auth_token');
};

export const storeAuthToken = async (token: string): Promise<void> => {
  if (Platform.OS === 'web') {
    void localStorage.setItem('auth_token', token);
  } else {
    await SecureStore.deleteItemAsync('auth_token');
  }
};

export const removeAuthToken = async (): Promise<void> => {
  if (Platform.OS === 'web') {
    void localStorage.removeItem('auth_token');
  } else {
    await SecureStore.deleteItemAsync('auth_token');
  }
};

export const authApi = {
  login: (data: LoginFormData) =>
    apiFetch<{
      message: string;
      access_token: string;
      coach: Omit<Coach, 'password'>;
    }>('/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  register: (data: Omit<SignUpFormData, 'confirmPassword'>) =>
    apiFetch<Omit<Coach, 'password'>>('/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  logout: () =>
    apiFetch<{ message: string }>('/v1/auth/logout', {
      method: 'POST',
    }),

  refreshToken: () =>
    apiFetch<{ access_token: string }>('/v1/auth/refresh', {
      method: 'POST',
    }),

  checkUsernameExists: async (username: string): Promise<boolean> => {
    const response = await apiFetch<{ exists: boolean }>(
      `/v1/coaches/check-username?username=${username}`,
      {
        method: 'GET',
      },
    );

    return response.exists;
  },

  verifyToken: async () => {
    const response = await apiFetch<{
      user: Omit<Coach, 'password'>;
      valid: boolean;
      expires_at: Date;
    }>('/v1/auth/verify', { method: 'POST' });

    return response;
  },
};

export const teamApi = {
  getAll: () =>
    apiFetch<Team[]>(`/v1/teams`, {
      method: 'GET',
    }),

  getBySlug: (slug: string) =>
    apiFetch<TeamWithPositions | null>(`/v1/teams/${slug}`, {
      method: 'GET',
    }),
};

export const skillsApi = {
  getAll: () =>
    apiFetch<Skill[]>('/v1/skills', {
      method: 'GET',
    }),

  getBySlug: (slug: string) => apiFetch<Skill | null>(`/v1/skills/${slug}`),
};
