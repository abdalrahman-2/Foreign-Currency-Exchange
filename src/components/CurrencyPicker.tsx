import styled from 'styled-components';
import { type Currency } from '../utils/types';
import CurrencyItem from './CurrencyItem';
import { useState } from 'react';

type props = {
  allCurrencies: Currency[];
};

const StyledCurrencyPicker = styled.div`
  margin-bottom: var(--spacing-125);
  width: calc(311 / 16 * 1rem);
  max-height: calc(458 / 16 * 1rem);
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

  @media (max-width: 23.4375em) {
    top: 65px;
    right: -21px;
    z-index: 2;
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

export default function CurrencyPicker({ allCurrencies }: props) {
  const [resultsArr, srtResultsArr] = useState<Currency[]>([]);
  const [value, setValue] = useState<string>('');

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
    setValue(e.target.value);
    srtResultsArr(
      allCurrencies.filter((currency: Currency) => {
        return (
          currency.iso_code
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          currency.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
      }),
    );
  }

  return (
    <StyledCurrencyPicker>
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
          value={value}
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
                iso_code={currency.iso_code}
                currencyName={currency.name}
              />
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
                iso_code={currency.iso_code}
                currencyName={currency.name}
              />
            ))}
          </ul>
        </>
      ) : (
        <ul>
          {resultsArr.map((currency: Currency) => (
            <CurrencyItem
              key={currency.iso_code}
              iso_code={currency.iso_code}
              currencyName={currency.name}
            />
          ))}
        </ul>
      )}
    </StyledCurrencyPicker>
  );
}
