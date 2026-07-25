import { useQuery } from '@tanstack/react-query';
import getLiveSingleRate from '../api/apiSingleRate';

export default function useSingleRate(base: string, quote: string) {
  const { isPending, data, error } = useQuery({
    queryKey: ['singleRate', base, quote],
    queryFn: () => getLiveSingleRate(base, quote),
    refetchOnMount: false,
  });

  return { isPending, data, error };
}
