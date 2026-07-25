import { useQuery } from '@tanstack/react-query';
import getCurrency from '../api/apiSingleCurrency';

export default function useCurrency(base: string) {
  const { data, isPending, error } = useQuery({
    queryKey: ['currency', base],
    queryFn: () => getCurrency(base),
  });

  return { data, isPending, error };
}
