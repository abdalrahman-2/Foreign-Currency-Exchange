import styled from 'styled-components';
import useAllCurrencies from '../hooks/useAllCurrencies';
import Loader from './Loader';
import Flag from './Flag';
import type { Currency } from '../utils/types';
import SmallFavoritButton from './SmallFavoriteButton';
import { checkIfPairFavorited } from '../utils/helpers';

type props = {
  base: string;
  quote: string;
  rate: number;
  ammount: string;
};

const StyledCompareItem = styled.li`
  display: flex;
  align-items: center;
  gap: var(--spacing-150);

  background-color: var(--neutral-600);
  border: solid 1px var(--neutral-500);
  padding: var(--spacing-150) var(--spacing-200);
  border-radius: var(--radius-10);
`;

export default function CompareItem({ base, quote, rate, ammount }: props) {
  const { isPending, error, data: allCurrencies } = useAllCurrencies();
  if (isPending) {
    return (
      <StyledCompareItem>
        <Loader />
      </StyledCompareItem>
    );
  }
  if (error) throw new Error(error.message);
  if (!allCurrencies) return <StyledCompareItem>No data</StyledCompareItem>;

  const currencyName = allCurrencies.find(
    (currency: Currency) => currency.iso_code === quote,
  ).name;

  const result = (Number(ammount) * rate).toFixed(1);

  return (
    <StyledCompareItem>
      <Flag currencyName={currencyName} size="normal" />
      <span className="grow">
        <p className="text-preset-4 text-[var(--neutral-50)] mb-[var(--spacing-075)]">
          {quote}
        </p>
        <p className="text-preset-5 text-[var(--neutral-200)]">
          {currencyName}
        </p>
      </span>
      <span>
        <p
          className={`${Number(result) > 10000 ? 'text-preset-6' : 'text-preset-3'} text-[var(--neutral-50)] mb-[var(--spacing-075)] text-right`}
        >
          {result}
        </p>
        <p className="text-preset-6 text-[var(--neutral-200)]">@ {rate}</p>
      </span>
      <SmallFavoritButton
        $state={`${checkIfPairFavorited(base, quote) ? 'favorited' : 'notFavorited'}`}
      />
    </StyledCompareItem>
  );
}
