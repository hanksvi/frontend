import { useQuery } from '@tanstack/react-query';
import { searchGuides, getGuideById } from '../api/guides';

export function useSearchGuides(params: { city?: string; language?: string; date?: string }) {
  return useQuery({
    queryKey: ['guides', params],
    queryFn: () => searchGuides(params),
    enabled: !!params.city || !!params.language || !!params.date,
  });
}

export function useGuideById(id: string) {
  return useQuery({
    queryKey: ['guide', id],
    queryFn: () => getGuideById(id),
    enabled: !!id,
  });
}
