import Flag from './Flag';
import styled from 'styled-components';
import { type Currency } from '../utils/types';
import { useEffect, useRef, useState } from 'react';
import CurrencyItem from './CurrencyItem';

type props = {
  allCurrencies: Currency[];
  $type: 'send' | 'receive';
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

const StyledCurrencyPicker = styled.div`
  margin-bottom: var(--spacing-125);
  width: calc(311 / 16 * 1rem);
  height: calc(458 / 16 * 1rem);
  background-color: var(--neutral-600);
  border: 1px solid var(--neutral-400);
  border-radius: var(--radius-8);
  overflow-y: scroll;
  padding: var(--spacing-100);
  position: absolute;
  top: 50px;
  right: 0;

  /* hide scrollbar Firefox */
  scrollbar-width: none;

  /* hide scrollbar IE/Edge */
  -ms-overflow-style: none;

  /* hide scrollbar Chrome/Safari */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledSearchBar = styled.label`
  display: flex;
  align-items: center;
  gap: var(--spacing-125);
  height: calc(46 / 16 * 1rem);
  width: 100%;
  padding: var(--spacing-150) var(--spacing-150);
  border: 1px var(--neutral-200) solid;
  border-radius: var(--radius-6);
  margin-bottom: var(--spacing-125);

  &:focus-within {
    outline: none;
    border-color: var(--lime-500);
  }
`;

const StyledInput = styled.input`
  flex-grow: 1;

  &::placeholder {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem; /* 12px */
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 0.5px;
  }

  &:focus {
    outline: none;
  }
`;

const StyledH3 = styled.h3`
  padding: var(--spacing-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--neutral-200);
  border-bottom: 1px solid var(--neutral-500);
  height: calc(30 / 16 * 1rem);
  text-transform: uppercase;
`;

export default function CurrencyPicker({
  allCurrencies,
  $type,
  setShowPicker,
}: props) {
  const [resultsArr, srtResultsArr] = useState<Currency[]>([]);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowPicker]);

  const popularCurrencies = [
    {
      iso_code: 'USD',
      iso_numeric: '840',
      name: 'United States Dollar',
      symbol: '$',
      start_date: '1948-06-21',
      end_date: '2026-07-19',
    },
    {
      iso_code: 'EUR',
      iso_numeric: '978',
      name: 'Euro',
      symbol: '€',
      start_date: '1999-01-04',
      end_date: '2026-07-19',
    },
    {
      iso_code: 'GBP',
      iso_numeric: '826',
      name: 'British Pound',
      symbol: '£',
      start_date: '1949-12-21',
      end_date: '2026-07-19',
    },
  ];

  // this handles search bar
  function handleOnChangeSearchBar(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    srtResultsArr(
      allCurrencies.filter((currency: Currency) => {
        return (
          currency.iso_code.toLowerCase().includes(value.toLowerCase()) ||
          currency.name.toLowerCase().includes(value.toLowerCase())
        );
      }),
    );
  }

  return (
    <StyledCurrencyPicker ref={pickerRef}>
      <StyledSearchBar htmlFor="search">
        <img
          className="w-[16px] h-[20px]"
          src="../../assets/images/search.png"
        />
        <StyledInput
          id="search"
          type="text"
          placeholder="Search currencies..."
          onChange={handleOnChangeSearchBar}
        />
      </StyledSearchBar>

      {resultsArr.length === 0 ? (
        <>
          <StyledH3>
            <span className="text-preset-5">Popular</span>
            <span className="text-preset-5">3</span>
          </StyledH3>
          <ul className="mb-[10px]">
            {popularCurrencies.map((currency) => (
              <CurrencyItem
                key={currency.iso_code}
                setShowPicker={setShowPicker}
                $type={$type}
                iso_code={currency.iso_code}
              >
                <Flag currencyName={currency.name.toLowerCase()} size="small" />
                <p className="text-preset-4">{currency.iso_code}</p>
                <p
                  className={
                    currency.name.length >= 20
                      ? `text-preset-6`
                      : `text-preset-5`
                  }
                >
                  {currency.name}
                </p>
              </CurrencyItem>
            ))}
          </ul>

          <StyledH3>
            <span className="text-preset-5">other currencies</span>
            <span className="text-preset-5">{allCurrencies.length}</span>
          </StyledH3>
          <ul>
            {allCurrencies.map((currency: Currency) => (
              <CurrencyItem
                key={currency.iso_code}
                setShowPicker={setShowPicker}
                $type={$type}
                iso_code={currency.iso_code}
              >
                <Flag currencyName={currency.name.toLowerCase()} size="small" />
                <p className="text-preset-4">{currency.iso_code}</p>
                <p
                  className={
                    currency.name.length >= 20
                      ? `text-preset-6`
                      : `text-preset-5`
                  }
                >
                  {currency.name}
                </p>
              </CurrencyItem>
            ))}
          </ul>
        </>
      ) : (
        <ul>
          {resultsArr.map((currency: Currency) => (
            <CurrencyItem
              key={currency.iso_code}
              setShowPicker={setShowPicker}
              $type={$type}
              iso_code={currency.iso_code}
            >
              <Flag currencyName={currency.name.toLowerCase()} size="small" />
              <p className="text-preset-4">{currency.iso_code}</p>
              <p
                className={
                  currency.name.length >= 20 ? `text-preset-6` : `text-preset-5`
                }
              >
                {currency.name}
              </p>
            </CurrencyItem>
          ))}
        </ul>
      )}
    </StyledCurrencyPicker>
  );
}
