import { useQuery } from '@tanstack/react-query';
import getLiveMarkets from '../api/apiRates';

export default function useRates(base: string) {
  const { isPending, data, error } = useQuery({
    queryKey: ['rates', base],
    queryFn: () => getLiveMarkets(base),
  });

  return { isPending, data, error };
}
