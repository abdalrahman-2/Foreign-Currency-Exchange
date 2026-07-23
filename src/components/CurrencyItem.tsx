import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useFormDataContext } from '../contexts/FormDataContext';
import { Check } from 'lucide-react';
import Flag from './Flag';

type props = {
  iso_code: string;
  currencyName: string;
};

const StyledLi = styled.li`
  display: flex;
  gap: var(--spacing-150);
  align-items: center;
  height: calc(46 / 16 * 1rem);
  padding: var(--spacing-150) var(--spacing-100);
  border: 1px solid transparent;
  cursor: pointer;

  & p:nth-of-type(1) {
    color: var(--neutral-50);
  }

  & p:nth-of-type(2) {
    color: var(--neutral-200);
  }

  &:hover {
    border-color: var(--neutral-200);
    border-radius: var(--radius-4);
  }

  &:focus {
    outline: none;
    border-color: var(--lime-500);
  }
`;

export default function CurrencyItem({ iso_code, currencyName }: props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const base = searchParams.get('base') || 'USD';
  const quote = searchParams.get('quote') || 'EGP';
  const { state, dispatch } = useFormDataContext();
  const { $type } = state;

  // this handles currency picker changes
  function handleLiOnClick(iso_code: string) {
    if ($type === 'send') {
      setSearchParams((prev) => {
        prev.set('base', iso_code);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set('quote', iso_code);
        return prev;
      });
    }
    dispatch({ type: 'SET_SHOWPICKER', payload: false });
  }

  return (
    <StyledLi
      tabIndex={0}
      onClick={() => handleLiOnClick(iso_code)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleLiOnClick(iso_code);
        }
      }}
    >
      <Flag currencyName={currencyName.toLowerCase()} size="small" />
      <p className="text-preset-4">{iso_code}</p>
      <p
        className={
          currencyName.length >= 20 ? `text-preset-6` : `text-preset-5`
        }
      >
        {currencyName}
      </p>

      {(($type === 'send' && base === iso_code) ||
        ($type === 'receive' && quote === iso_code)) && (
        <Check className="w-[12px]" />
      )}
    </StyledLi>
  );
}
