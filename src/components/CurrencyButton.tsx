import styled from 'styled-components';
import { CurrencyPicker, Flag, Loader } from '.';
import usePicker from '../hooks/usePicker';
import { type Currency } from '../utils/types';
import { useState } from 'react';

type props = {
  currency_iso: string;
  $type: 'send' | 'receive';
};

const StyledCurrencyButton = styled.button<{ $type: props['$type'] }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--neutral-500);
  border-radius: var(--radius-8);
  border: 1px solid var(--neutral-400);

  padding: var(--spacing-125);
  width: calc(96 / 16 * 1rem);
  height: calc(40 / 16 * 1rem);
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 3px var(--lime-800),
      0 0 0 5px var(--lime-500);
  }

  &:hover {
    background-color: ${({ $type }) =>
      $type === 'send' ? 'var(--neutral-400)' : ''};
  }
`;

///////////////////////////////////////////////////////////////
export default function CurrencyButton({ currency_iso, $type }: props) {
  const { isPending, data: allCurrencies, error } = usePicker();
  const [showPicker, setShowPicker] = useState<boolean>(false);

  if (isPending) return <Loader />;
  if (error) console.log(error.message);

  function handleOnClick() {
    setShowPicker((prevState) => !prevState);
  }

  const alt =
    $type === 'send'
      ? `Selected send currency: ${currency_iso}. Open send currency options`
      : `Selected receive currency: ${currency_iso}. Open receive currency options`;

  return (
    <div className="relative">
      <StyledCurrencyButton
        type="button"
        $type={$type}
        aria-label="currency picker"
        onClick={handleOnClick}
      >
        <Flag
          size="small"
          currencyName={
            allCurrencies.find(
              (currency: Currency) => currency.iso_code === currency_iso,
            ).name
          }
        />
        <p>{currency_iso}</p>
        <img src="../../assets/images/icon-chevron-down.svg" alt={alt} />
      </StyledCurrencyButton>
      {showPicker && (
        <CurrencyPicker
          allCurrencies={allCurrencies}
          $type={$type}
          setShowPicker={setShowPicker}
        />
      )}
    </div>
  );
}
