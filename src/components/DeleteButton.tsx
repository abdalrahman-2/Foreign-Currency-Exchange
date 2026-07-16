import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--neutral-600);
  border: 1px var(--neutral-500) solid;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon-hover {
    display: none;
  }

  &:hover {
    background-color: var(--neutral-500);
    border-color: var(--neutral-400);
  }

  &:hover .icon-default {
    display: none;
  }

  &:hover .icon-hover {
    display: inline;
  }

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 1px var(--lime-800),
      0 0 0 2px var(--lime-500);
  }
`;

export default function DeleteButton() {
  return (
    <StyledButton>
      <img
        className="icon-default"
        src="../../assets/images/icon-delete.svg"
        alt="Delete this item"
      />
      <img
        className="icon-hover"
        src="../../assets/images/icon-delete-filled.svg"
        alt="Delete this item"
      />
    </StyledButton>
  );
}
