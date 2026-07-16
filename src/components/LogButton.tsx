import type { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type props = {
  state: 'filled' | 'empty' | 'logged';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const commonStyles = css`
  width: calc(132 / 16 * 1rem);
  height: calc(32 / 16 * 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-8);
`;

const EmptyStyledButton = styled.button`
  ${commonStyles}
  border: 1px solid var(--neutral-300);
  color: var(--neutral-200);
  text-transform: uppercase;
`;

const FilledStyledButton = styled.button`
  ${commonStyles}
  border: 1px solid var(--lime-500);
  color: var(--neutral-50);
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background-color: var(--lime-800);
  }

  &:focus {
    outline: 1px solid var(--lime-500);
    outline-offset: 3px;
  }
`;

const LoggedStyledButton = styled.button`
  ${commonStyles}
  background-color: var(--lime-500);
  color: var(--neutral-900);
`;

export default function LogButton({ state, className }: props) {
  return state === 'empty' ? (
    <EmptyStyledButton className={className}>Log conversion</EmptyStyledButton>
  ) : state === 'filled' ? (
    <FilledStyledButton className={className}>
      Log conversion
    </FilledStyledButton>
  ) : (
    <LoggedStyledButton className={className}>
      <img
        src="../../assets/images/icon-check-black.png"
        className="w-[1rem] h-[1rem]"
      />
      <p className="ml-2">Logged</p>
    </LoggedStyledButton>
  );
}
