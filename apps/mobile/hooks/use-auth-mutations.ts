import { authApi } from '@/lib/api';
import { LoginFormData, SignUpFormData } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const storeAuthToken = async (token: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem('auth_token', token);
  } else {
    await SecureStore.setItemAsync('auth_token', token);
  }
};

const removeAuthToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('auth_token');
  } else {
    await SecureStore.deleteItemAsync('auth_token');
  }
};

export const useAuthMutations = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => authApi.login(data),
    onSuccess: async (response) => {
      await storeAuthToken(response.access_token);
      await queryClient.invalidateQueries({ queryKey: ['auth', 'status'] });
    },
    onError: (error) => {
      console.error('❌ Login error:', error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: async () => {
      try {
        await removeAuthToken();

        await queryClient.invalidateQueries({
          queryKey: ['auth', 'status'],
        });
      } catch (error) {
        console.error('❌ Logout error:', error);
        await removeAuthToken();
        await queryClient.invalidateQueries({
          queryKey: ['auth', 'status'],
        });
      }
    },
    onError: async (error) => {
      console.error('Logout error:', error);

      void queryClient.setQueryData(['auth', 'status'], {
        isAuthenticated: false,
        coach: null,
        token: null,
      });
      await removeAuthToken();
      await queryClient.invalidateQueries({ queryKey: ['auth', 'status'] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: SignUpFormData) => authApi.register(data),
    onSuccess: () => {},
    onError: (error) => {
      console.error('Register error:', error.message);
    },
  });

  return {
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
  };
};
