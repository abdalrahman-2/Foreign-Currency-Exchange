import { type ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type props = {
  state: 'empty' | 'filled' | 'favorited';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<{ state: props['state'] }>`
  // common styles
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-8);

  //defining the width based on the state if it favorited or filled or empty
  width: ${({ state }) =>
    state === 'favorited' ? 'calc(117 / 16 * 1rem)' : 'calc(110 / 16 * 1rem)'};

  //defining the background-color based on the state if it favorited or filled or empty
  background-color: ${({ state }) =>
    state === 'empty' || state === 'filled'
      ? 'var(--neutral-600)'
      : 'var(--lime-500)'};

  //defining the border based on the state if it favorited or filled or empty
  border: ${({ state }) =>
    state === 'empty' || state === 'filled'
      ? '1px solid var(--neutral-500)'
      : '1px solid var(--lime-500)'};

  //defining the color based on the state if it favorited or filled or empty
  color: ${({ state }) =>
    state === 'empty'
      ? 'var(--neutral-200)'
      : state === 'filled'
        ? 'var(--neutral-50)'
        : 'var(--neutral-900)'};

  //defining the cursor based on the state if it favorited or filled or empty
  cursor: ${({ state }) => (state !== 'empty' ? 'pointer' : '')};

  //defining the hover state if it filled and favorited
  &:hover {
    background-color: ${({ state }) =>
      state === 'filled' || state === 'empty'
        ? 'var(--neutral-500)'
        : 'var(--lime-650)'};
  }

  //defining the focus state for filled and favorited
  &:focus {
    outline: ${({ state }) =>
      state === 'filled' || state === 'favorited'
        ? '1px solid var(--lime-500)'
        : ''};

    outline-offset: ${({ state }) =>
      state === 'filled' || state === 'favorited' ? '3px' : ''};
  }
`;

export default function FavoritButton({ state }: props) {
  return (
    <StyledButton state={state} className="text-preset-5-medium">
      {state === 'empty' || state === 'filled' ? (
        <img
          src="../../assets/images/icon-star.svg"
          alt="Add this currency pair to favorites"
        />
      ) : (
        <img
          src="../../assets/images/icon-star-black.png"
          className="w-[1rem]"
          alt="This currency pair is in favorites"
        />
      )}
      <p className="ml-2">favorite</p>
    </StyledButton>
  );
}
