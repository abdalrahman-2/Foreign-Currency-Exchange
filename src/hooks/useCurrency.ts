import { useQuery } from '@tanstack/react-query';
import getCurrency from '../api/apiSingleCurrency';

export default function useCurrency(iso: string) {
  const { data, isPending, error } = useQuery({
    queryKey: ['currency', iso],
    queryFn: () => getCurrency(iso),
  });

  return { data, isPending, error };
}
