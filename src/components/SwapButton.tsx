import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--neutral-600);
  width: calc(48 / 16 * 1rem);
  height: calc(48 / 16 * 1rem);
  border: var(--neutral-500) solid 1px;
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
      0 0 0 1px var(--lime-800),
      0 0 0 2px var(--lime-500);
  }

  &:hover {
    background-color: var(--neutral-500);
    border: var(--neutral-400) solid 1px;
  }
`;

export default function SwapButton() {
  return (
    <StyledButton>
      <img
        className="big-screen"
        src="../../assets/images/icon-exchange.svg"
        alt="Swap the send and receive currencies"
      />
      <img
        className="small-screen"
        src="../../assets/images/icon-exchange-vertical.svg"
        alt="Swap the send and receive currencies"
      />
    </StyledButton>
  );
}
