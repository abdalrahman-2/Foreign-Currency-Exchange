import styled from 'styled-components';
import Logo from './Logo';
// import { useEffect } from 'react';
import TickerBar from './TickerBar';

const StyledDiv = styled.div`
  height: calc(66 / 16 * 1rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-250) var(--spacing-300);

  @media (max-width: 23.4375em) {
    height: calc(52 / 16 * 1rem);
  }

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
    <header>
      <StyledDiv>
        <Logo />
        <p className="text-preset-4">55 CURRENCIES · EOD · ECB DATA</p>
      </StyledDiv>
      <TickerBar />
    </header>
  );
}
