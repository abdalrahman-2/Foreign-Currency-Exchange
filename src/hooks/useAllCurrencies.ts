import { useQuery } from '@tanstack/react-query';
import getCurrencies from '../api/apiAllCurrencies';

export default function useAllCurrencies() {
  const { isPending, data, error } = useQuery({
    queryKey: ['picker'],
    queryFn: getCurrencies,
  });

  return { isPending, data, error };
}
