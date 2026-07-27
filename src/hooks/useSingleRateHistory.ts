import { useQuery } from '@tanstack/react-query';
import getSingleRateHistory from '../api/apiSingleRateHistory';

export default function useSingleRateHistory(
  base: string,
  quote: string,
  date: string,
) {
  const { isPending, data, error } = useQuery({
    queryKey: ['rateHistory', base, quote, date],
    queryFn: () => getSingleRateHistory(base, quote, date),
  });

  return { isPending, data, error };
}
