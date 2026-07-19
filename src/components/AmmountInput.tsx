import type { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type props = {
  type: 'send' | 'receive';
} & InputHTMLAttributes<HTMLInputElement>;

const StyledWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  width: calc(118 / 16 * 1rem);
  height: calc(33 / 16 * 1rem);
  border-bottom: 1px solid var(--neutral-500);

  &:hover {
    border-bottom-color: var(--neutral-50);
  }

  &:focus-within {
    border-bottom-color: transparent;
    outline: 1px solid var(--lime-500);
    outline-offset: 0;
  }
`;

const StyledInput = styled.input<{ $type: props['type'] }>`
  width: 100%;
  outline: none;
  color: ${({ $type }) =>
    $type === 'receive' ? 'var(--lime-500)' : 'var(--neutral-50)'};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &::placeholder {
    color: var(--neutral-200);
    font-family: 'JetBrains Mono', monospace;
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.5px;
  }

  @media (max-width: 48.125em) {
    font-size: 2rem;

    &::placeholder {
      font-size: 2rem;
    }
  }
`;

export default function AmmountInput({ type }: props) {
  return (
    <StyledWrapper>
      <StyledInput
        type="number"
        $type={type}
        placeholder="0"
        aria-label={
          type === 'send' ? 'Send amount input' : 'Receive amount input'
        }
        className="text-preset-1"
      />
    </StyledWrapper>
  );
}
