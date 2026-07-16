import styled from 'styled-components';
import { Flag } from '.';

type props = {
  countryName: string;
  currency: string;
  type: 'send' | 'recieve';
};

const StyledCurrencyButton = styled.button<{ type: string }>`
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

  &:hover {
    background-color: ${({ type }) =>
      type === 'send' ? 'var(--neutral-400)' : 'var(--neutral-300)'};
  }
`;

export default function CurrencyButton({ countryName, currency, type }: props) {
  return (
    <StyledCurrencyButton type={type}>
      <Flag size="small" countryName={countryName} />
      <p>{currency}</p>
      <img src="../../assets/images/icon-chevron-down.svg" alt="down arrow" />
    </StyledCurrencyButton>
  );
}
