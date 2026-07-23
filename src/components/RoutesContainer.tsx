import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Tab from './Tab';
import styled from 'styled-components';

const StyeledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-250);

  @media (max-width: 23.125em) {
    gap: var(--spacing-200);
  }
`;

const StyledNav = styled.nav`
  border-bottom: solid 1px var(--neutral-600);
`;

export default function RoutesContainer() {
  const { pathname, search } = useLocation();

  return (
    <StyeledDiv>
      <StyledNav>
        <ul className="flex">
          <Tab state={pathname === '/' ? 'chosen' : 'default'}>
            <NavLink
              to={`/${search}`}
              className="h-full flex items-center px-[var(--spacing-150)] uppercase text-preset-3 text-[var(--neutral-50)]"
            >
              History
            </NavLink>
          </Tab>
          <Tab state={pathname === '/compare' ? 'chosen' : 'default'}>
            <NavLink
              to={`/compare${search}`}
              className="h-full flex items-center px-[var(--spacing-150)] uppercase text-preset-3 text-[var(--neutral-50)]"
            >
              compare
            </NavLink>
          </Tab>
          <Tab state={pathname === '/favorites' ? 'chosen' : 'default'}>
            <NavLink
              to={`/favorites${search}`}
              className="h-full flex items-center px-[var(--spacing-150)] uppercase text-preset-3 text-[var(--neutral-50)]"
            >
              favorites
            </NavLink>
          </Tab>
          <Tab state={pathname === '/logs' ? 'chosen' : 'default'}>
            <NavLink
              to={`/logs${search}`}
              className="h-full flex items-center px-[var(--spacing-150)] uppercase text-preset-3 text-[var(--neutral-50)]"
            >
              logs
            </NavLink>
          </Tab>
        </ul>
      </StyledNav>
      <Outlet />
    </StyeledDiv>
  );
}
