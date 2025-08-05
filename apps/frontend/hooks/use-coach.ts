import { ApiError, apiFetch } from '@/lib/api';
import { Coach } from '@bb-companion/database';
import { useQuery } from '@tanstack/react-query';

const fetchUser = () => apiFetch<Coach>('/v1/auth/me');

export const useCoach = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 401) {
        return false;
      }

      return failureCount < 2;
    },
  });
};
