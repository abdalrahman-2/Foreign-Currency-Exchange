import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = {
  content: 'history' | 'compare' | 'favorites' | 'log';
  state?: 'default' | 'chosen';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<{ state: Props['state'] }>`
  height: calc(42 / 16 * 1rem);
  padding-left: var(--spacing-150);
  padding-right: var(--spacing-150);
  border-bottom: 2px solid
    ${({ state }) => (state === 'chosen' ? 'var(--lime-500)' : 'transparent')};
  color: var(--neutral-50);
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    border-bottom-color: var(--lime-500);
  }

  &:focus {
    outline: 1px solid var(--lime-500);
    outline-offset: 3px;
  }
`;

export default function TabButton({
  content,
  state = 'default',
  ...props
}: Props) {
  return (
    <StyledButton
      state={state}
      className="text-preset-3"
      aria-pressed={state === 'chosen'}
      {...props}
    >
      {content}
    </StyledButton>
  );
}
