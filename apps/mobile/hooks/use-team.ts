import { teamApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const teamsKeys = {
  all: ['teams'] as const,
  details: (slug: string) => [...teamsKeys.all, slug] as const,
};

export const useTeam = (slug?: string) => {
  const {
    data: allTeams,
    isLoading: isAllTeamsLoading,
    error: allTeamsError,
  } = useQuery({
    queryKey: teamsKeys.all,
    queryFn: () => teamApi.getAll(),
    staleTime: Infinity,
  });

  const {
    data: team,
    isLoading: isTeamLoading,
    error: teamError,
  } = useQuery({
    queryKey: teamsKeys.details(slug!),
    queryFn: () => teamApi.getBySlug(slug!),
    enabled: !!slug,
    staleTime: Infinity,
  });

  return {
    team,
    isTeamLoading,
    teamError,
    allTeams,
    isAllTeamsLoading,
    allTeamsError,
  };
};
