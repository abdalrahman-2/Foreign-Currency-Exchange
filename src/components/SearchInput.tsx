import styled from 'styled-components';

const StyledWrapper = styled.label`
  width: calc(360 / 16 * 1rem);
  height: calc(46 / 16 * 1rem);
  display: inline-flex;
  gap: var(--spacing-125);
  padding: var(--spacing-150);
  border: 1px solid var(--neutral-200);
  border-radius: var(--radius-6);
  background: none;

  &:focus-within {
    border-color: var(--lime-500);
  }

  @media (max-width: 375px) {
    width: calc(295 / 16 * 1rem);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  outline: none;
  color: var(--neutral-50);

  &::placeholder {
    color: var(--neutral-200);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: 0.5px;
  }
`;

export default function SearchInput() {
  return (
    <StyledWrapper>
      <img src="../../assets/images/icon-search.svg" alt="Search currencies" />
      <StyledInput
        type="text"
        className="text-preset-5"
        placeholder="Search currencies..."
        aria-label="Search currencies"
      />
    </StyledWrapper>
  );
}
