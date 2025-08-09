import { authApi, getAuthToken, removeAuthToken } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useAuthMutations } from './use-auth-mutations';

export const useAuth = () => {
  const {
    data: authStatus,
    isLoading: isCheckingAuth,
    error: authError,
    refetch: recheckAuth,
  } = useQuery({
    queryKey: ['auth', 'status'],
    queryFn: async () => {
      const token = await getAuthToken();
      if (!token) {
        return {
          isAuthenticated: false,
          coach: null,
          token: null,
        };
      }

      try {
        const response = await authApi.verifyToken();
        const result = {
          isAuthenticated: response.valid,
          token,
          coach: response.user,
        };
        return result;
      } catch (error) {
        console.warn('❌ Token verification failed:', error);
        await removeAuthToken();
        return {
          isAuthenticated: false,
          coach: null,
          token: null,
        };
      }
    },
  });

  const mutations = useAuthMutations();

  return {
    // Auth state
    isAuthenticated: authStatus?.isAuthenticated ?? false,
    coach: authStatus?.coach ?? null,
    token: authStatus?.token ?? null,

    // Loading states
    isLoading: isCheckingAuth,
    isLoggingIn: mutations.login.isPending,
    isRegistering: mutations.register.isPending,
    isLoggingOut: mutations.logout.isPending,

    // Actions
    login: mutations.login.mutateAsync,
    register: mutations.register.mutateAsync,
    logout: mutations.logout.mutateAsync,

    // Utils
    recheckAuth,
    isInitialized: !isCheckingAuth,
    hasError: !!authError,
  };
};
