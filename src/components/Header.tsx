import styled from 'styled-components';
import Logo from './Logo';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-250) var(--spacing-300);

  & p {
    color: var(--neutral-200);
    @media (max-width: 31.25em) {
      font-size: 0.625rem; /* 10px */
      line-height: 1;
      letter-spacing: 0;
    }
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <Logo />
      <p className="text-preset-4">55 CURRENCIES · EOD · ECB DATA</p>
    </StyledHeader>
  );
}
