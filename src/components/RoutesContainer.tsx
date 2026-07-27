import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Tab from './Tab';
import styled from 'styled-components';
import MobileTabs from './MobileTabs';
import { useAppData } from '../contexts/AppDataContext';

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

const StyledUl = styled.ul`
  display: flex;
`;

export default function RoutesContainer() {
  const { pathname, search } = useLocation();
  const { appState } = useAppData();
  const { favorites, logs } = appState;

  return (
    <StyeledDiv>
      {/* Desktop Nav*/}
      <StyledNav className="max-[28.125em]:hidden">
        <StyledUl>
          <Tab $state={pathname === '/' ? 'chosen' : 'default'}>
            <NavLink
              to={`/${search}`}
              className="h-full flex items-center px-[var(--spacing-150)] uppercase text-preset-3 text-[var(--neutral-50)] focus:outline-1 focus:outline-solid focus:outline-[var(--lime-500)] focus:outline-offset-[3px]"
            >
              History
            </NavLink>
          </Tab>
          <Tab $state={pathname === '/compare' ? 'chosen' : 'default'}>
            <NavLink
              to={`/compare${search}`}
              className="h-full flex items-center px-[var(--spacing-150)] uppercase text-preset-3 text-[var(--neutral-50)] focus:outline-1 focus:outline-solid focus:outline-[var(--lime-500)] focus:outline-offset-[3px]"
            >
              compare
            </NavLink>
          </Tab>
          <Tab $state={pathname === '/favorites' ? 'chosen' : 'default'}>
            <NavLink
              to={`/favorites${search}`}
              className="h-full flex items-center px-[var(--spacing-150)] uppercase text-preset-3 text-[var(--neutral-50)] focus:outline-1 focus:outline-solid focus:outline-[var(--lime-500)] focus:outline-offset-[3px]"
            >
              favorites{' '}
              {Object.keys(favorites).length > 0 ? (
                <p className="ml-[var(--spacing-050)] flex items-center justify-center text-[var(--lime-500)] rounded-full bg-[var(--lime-800)] w-[1.25rem] h-[1.25rem]  text-preset-6">
                  {Object.keys(favorites).length}
                </p>
              ) : (
                ''
              )}
            </NavLink>
          </Tab>
          <Tab $state={pathname === '/logs' ? 'chosen' : 'default'}>
            <NavLink
              to={`/logs${search}`}
              className="h-full flex items-center px-[var(--spacing-150)] uppercase text-preset-3 text-[var(--neutral-50)] focus:outline-1 focus:outline-solid focus:outline-[var(--lime-500)] focus:outline-offset-[3px]"
            >
              logs{' '}
              {Object.keys(logs).length > 0 ? (
                <p className="ml-[var(--spacing-050)] flex items-center justify-center text-[var(--lime-500)] rounded-full bg-[var(--lime-800)] w-[1.25rem] h-[1.25rem]  text-preset-6">
                  {Object.keys(logs).length}
                </p>
              ) : (
                ''
              )}
            </NavLink>
          </Tab>
        </StyledUl>
      </StyledNav>

      {/* Mobile Nav*/}
      <div className="hidden max-[28.125em]:block">
        <MobileTabs />
      </div>
      <Outlet />
    </StyeledDiv>
  );
}
