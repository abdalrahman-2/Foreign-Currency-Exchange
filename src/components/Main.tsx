import type { ReactNode } from 'react';
import styled from 'styled-components';

type props = {
  children: ReactNode;
};

const StyledMain = styled.main`
  padding: var(--spacing-600) var(--spacing-400);
  max-width: 68.75rem;
  margin: 0 auto;

  @media (max-width: 48.125em) {
    padding: var(--spacing-600) var(--spacing-300);
  }

  @media (max-width: 23.4375em) {
    padding: var(--spacing-400) var(--spacing-200);
  }
`;

export default function Main({ children }: props) {
  return <StyledMain>{children}</StyledMain>;
}
