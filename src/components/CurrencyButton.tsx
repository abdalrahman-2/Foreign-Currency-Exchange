import styled from 'styled-components';
import { Flag } from '.';

type props = {
  countryName: string;
  currency: string;
  type: 'send' | 'recieve';
};

const StyledCurrencyButton = styled.button<{ type: props['type'] }>`
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
    background-color: ${({ type }) =>
      type === 'send' ? 'var(--neutral-400)' : ''};
  }
`;

export default function CurrencyButton({ countryName, currency, type }: props) {
  const buttonLabel =
    type === 'send'
      ? `Selected send currency: ${currency}. Open send currency options`
      : `Selected receive currency: ${currency}. Open receive currency options`;

  return (
    <StyledCurrencyButton type={type}>
      <Flag
        size="small"
        countryName={countryName}
        alt={
          type === 'send'
            ? `${currency} flag for the send currency selector`
            : `${currency} flag for the receive currency selector`
        }
      />
      <p>{currency}</p>
      <img src="../../assets/images/icon-chevron-down.svg" alt={buttonLabel} />
    </StyledCurrencyButton>
  );
}
