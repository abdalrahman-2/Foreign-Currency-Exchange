import styled from 'styled-components';

const StyledButton = styled.button`
  width: calc(93 / 16 * 1rem);
  height: calc(30 / 16 * 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-8);
  text-transform: uppercase;
  background-color: var(--neutral-600);
  color: var(--neutral-200);
  border: 1px solid var(--neutral-400);
  cursor: pointer;

  &:hover {
    background-color: var(--neutral-500);
  }

  &:focus {
    outline: 1px solid var(--lime-500);
    outline-offset: 3px;
    border-color: var(--neutral-500);
  }
`;

export default function ClearButton() {
  return <StyledButton className="text-preset-5">Clear all</StyledButton>;
}
