import { QueryClient } from '@tanstack/react-query';

import { isApiError } from '@/types';
import { Platform } from 'react-native';

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        retry: (failureCount, error) => {
          if (isApiError(error)) {
            if (error.status >= 400 && error.status < 500) {
              return error.status === 408 || error.status === 429
                ? failureCount < 2
                : false;
            }
            return failureCount < 3;
          }
          return failureCount < 1;
        },
        refetchOnWindowFocus: Platform.OS === 'web',
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
      },
    },
  });
};
