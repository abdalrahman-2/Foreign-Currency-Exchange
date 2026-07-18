import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type props = {
  state: 'notFavorited' | 'favorited';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<{ state: props['state'] }>`
  // common styles
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-8);
  background-color: var(--neutral-600);
  cursor: pointer;

  //defining the border based on the state if it not favorited or favorited
  border: ${({ state }) =>
    state === 'notFavorited'
      ? '1px solid var(--neutral-500)'
      : '1px solid var(--lime-500)'};

  //defining the hover state if it not favorited or favorited
  &:hover {
    background-color: var(--neutral-500);
    border: ${({ state }) =>
      state === 'notFavorited' ? 'var(--neutral-400)' : ''};
  }

  //defining the focus state
  &:focus {
    outline: 1px solid var(--lime-500);
    outline-offset: 3px;
  }
`;

export default function SmallFavoritButton({ state }: props) {
  return (
    <StyledButton
      state={state}
      aria-label={
        state === 'notFavorited' ? 'make it Favorite' : 'remove from favorite'
      }
    >
      {state === 'notFavorited' ? (
        <img
          src="../../assets/images/icon-star.svg"
          alt="Add this currency pair to favorites"
        />
      ) : (
        <img
          src="../../assets/images/icon-star-filled.svg"
          alt="This currency pair is in favorites"
        />
      )}
    </StyledButton>
  );
}
