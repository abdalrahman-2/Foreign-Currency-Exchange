import { useQuery } from '@tanstack/react-query';
import getLiveMarkets from '../api/apiTicker';

export default function useTicker(base: string) {
  const { isPending, data, error } = useQuery({
    queryKey: ['ticker', base],
    queryFn: () => getLiveMarkets(base),
    refetchOnMount: false,
  });

  return { isPending, data, error };
}
