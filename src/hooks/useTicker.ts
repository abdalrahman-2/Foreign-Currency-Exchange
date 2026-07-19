import { useQuery } from '@tanstack/react-query';
import { getLiveMarkets } from '../api/apiTicker';

export default function useTicker() {
  const { isPending, data, error } = useQuery({
    queryKey: ['ticker'],
    queryFn: getLiveMarkets,
  });

  return { isPending, data, error };
}
