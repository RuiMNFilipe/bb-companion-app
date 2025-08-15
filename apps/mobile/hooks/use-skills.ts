import { skillsApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const skillsKeys = {
  all: ['skills'] as const,
  details: (slug: string) => [...skillsKeys.all, slug] as const,
};

export const useSkills = (slug?: string) => {
  const {
    data: allSkills,
    isLoading: isAllSkillsLoading,
    error: allSkillsError,
  } = useQuery({
    queryKey: skillsKeys.all,
    queryFn: () => skillsApi.getAll(),
    staleTime: Infinity,
  });

  const {
    data: skill,
    isLoading: isSkillLoading,
    error: skillError,
    refetch: refetchAllSkills,
  } = useQuery({
    queryKey: skillsKeys.details(slug!),
    queryFn: () => skillsApi.getBySlug(slug!),
    enabled: !!slug,
    staleTime: Infinity,
  });

  return {
    skill,
    isSkillLoading,
    skillError,
    allSkills,
    isAllSkillsLoading,
    allSkillsError,
    refetchAllSkills,
  };
};
