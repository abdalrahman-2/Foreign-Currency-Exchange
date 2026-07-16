import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--neutral-600);
  width: calc(48 / 16 * 1rem);
  height: calc(48 / 16 * 1rem);
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .small-screen {
    display: none;
  }

  @media (max-width: 375px) {
    .big-screen {
      display: none;
    }

    .small-screen {
      display: inline;
    }
  }

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 3px var(--lime-800),
      0 0 0 5px var(--lime-500);
  }

  &:hover {
    background-color: var(--neutral-500);
  }
`;

export default function SwapButton() {
  return (
    <StyledButton>
      <img
        className="big-screen"
        src="../../assets/images/icon-exchange.svg"
        alt="swap button"
      />
      <img
        className="small-screen"
        src="../../assets/images/icon-exchange-vertical.svg"
        alt="swap button"
      />
    </StyledButton>
  );
}
