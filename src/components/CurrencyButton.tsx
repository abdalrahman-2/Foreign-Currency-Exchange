import styled from 'styled-components';
import { CurrencyPicker, Flag, Loader } from '.';
import useAllCurrencies from '../hooks/useAllCurrencies';
import { type Currency } from '../utils/types';
import { useFormData } from '../contexts/FormDataContext';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const StyledCurrencyButton = styled.button<{ $type: 'send' | 'receive' }>`
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
export default function CurrencyButton() {
  const buttonRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const base = searchParams.get('base') || 'USD';
  const quote = searchParams.get('quote') || 'EGP';

  const { isPending, data: allCurrencies, error } = useAllCurrencies();

  const { state, dispatch } = useFormData();
  const { $type, showPicker } = state;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        dispatch({ type: 'SET_SHOWPICKER', payload: false });
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  if (isPending) return <Loader />;
  if (error) console.log(error.message);

  function handleOnClick() {
    dispatch({ type: 'SET_SHOWPICKER', payload: !state.showPicker });
  }

  const alt =
    $type === 'send'
      ? `Selected send currency: ${base}. Open send currency options`
      : `Selected receive currency: ${quote}. Open receive currency options`;

  return (
    <div className="relative" ref={buttonRef}>
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
              (currency: Currency) =>
                currency.iso_code === ($type === 'send' ? base : quote),
            )?.name
          }
        />
        <p>{$type === 'send' ? base : quote}</p>
        <img src="../../assets/images/icon-chevron-down.svg" alt={alt} />
      </StyledCurrencyButton>
      {showPicker && <CurrencyPicker allCurrencies={allCurrencies} />}
    </div>
  );
}
