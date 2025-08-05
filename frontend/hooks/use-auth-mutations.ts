import { authApi } from '@/lib/api';
import { LoginFormData, SignUpFormData } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { Alert, Platform } from 'react-native';

const storeAuthToken = async (token: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem('auth_token', token);
  } else {
    void (await SecureStore.setItemAsync('auth_token', token));
  }
};

const removeAuthToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem('auth_token');
  } else {
    void (await SecureStore.deleteItemAsync('auth_token'));
  }
};

export const useAuthMutations = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => authApi.login(data),
    onSuccess: async (response) => {
      void (await storeAuthToken(response.access_token));
      void queryClient.setQueryData(['auth_token'], [response.access_token]);

      void Alert.alert('Success', 'Login successful');

      // TODO: Update reroute on login success
      // void router.replace('/(tabs)')
    },
    onError: (error) => {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: SignUpFormData) => authApi.register(data),
    onSuccess: (response) => {
      void queryClient.setQueryData(['user'], response);
      Alert.alert('Success', 'Account created successfully!');

      // TODO: Reroute to login screen
    },
    onError: (error) => {
      console.error('Register error:', error.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: async () => {
      void (await removeAuthToken());
      void queryClient.clear();
      // TODO: Reroute to home screen
    },
  });

  return {
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
  };
};
