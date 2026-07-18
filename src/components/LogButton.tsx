import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type props = {
  state: 'empty' | 'filled' | 'logged';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<{ state: props['state'] }>`
  // common styles
  width: calc(132 / 16 * 1rem);
  height: calc(32 / 16 * 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-8);

  //defining the background-color based on the state if it logged or filled or empty
  background-color: ${({ state }) =>
    state === 'empty' || state === 'filled' ? '' : 'var(--lime-500)'};

  //defining the color based on the state if it logged or filled or empty
  color: ${({ state }) =>
    state === 'empty'
      ? 'var(--neutral-200)'
      : state === 'filled'
        ? 'var(--neutral-50)'
        : 'var(--neutral-900)'};

  //defining the text transform based on the state if it logged or filled or empty
  text-transform: ${({ state }) =>
    state === 'empty' || state === 'filled' ? 'uppercase' : 'capitalize'};

  //defining the cursor based on the state if it logged or filled or empty
  cursor: ${({ state }) => (state !== 'empty' ? 'pointer' : '')};

  //defining the border based on the state if it logged or filled or empty
  border: ${({ state }) =>
    state === 'logged' || state === 'filled'
      ? '1px solid var(--lime-500)'
      : '1px solid var(--neutral-300)'};

  &:hover {
    background-color: ${({ state }) => state === 'filled' && 'var(--lime-800)'};
  }

  &:focus {
    outline: ${({ state }) =>
      state === 'filled' && '1px solid var(--lime-500)'};
    outline-offset: ${({ state }) => state === 'filled' && '3px'};
  }
`;

export default function LogButton({ state }: props) {
  return (
    <StyledButton state={state} className="text-preset-5-medium">
      {state === 'logged' ? (
        <>
          <img
            src="../../assets/images/icon-check-black.png"
            className="w-[1rem] h-[1rem]"
          />
          <p className="ml-2">Logged</p>
        </>
      ) : (
        'Log conversion'
      )}
    </StyledButton>
  );
}
