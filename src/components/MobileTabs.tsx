import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const tabs = [
  { label: 'History', path: '/' },
  { label: 'Compare', path: '/compare' },
  { label: 'Favorites', path: '/favorites' },
  { label: 'Logs', path: '/logs' },
];

const StyledWrapper = styled.div`
  position: relative;
  text-transform: uppercase;
`;

const StyledButton = styled.button`
  width: 100%;
  height: calc(40 / 16 * 1rem);
  padding: 0 var(--spacing-150);
  background-color: var(--neutral-700);
  border: 1px solid var(--neutral-400);
  border-radius: var(--radius-8);
  color: var(--neutral-50);

  display: flex;
  align-items: center;
  justify-content: space-between;
  outline: none;
  text-transform: uppercase;
`;

const StyledMenu = styled.ul`
  padding: var(--spacing-100);
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background-color: var(--neutral-700);
  border: 1px solid var(--neutral-600);
  border-radius: var(--radius-8);
  z-index: 50;
  color: var(--neutral-50);
`;

const StyledItem = styled.li`
  padding: var(--spacing-125) var(--spacing-100);
  color: var(--neutral-50);
  cursor: pointer;
`;

export default function MobileTabs() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentTab = tabs.find((tab) => tab.path === pathname);
  const buttonLabel = currentTab?.label || 'History';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleNavigate(path: string) {
    navigate(path + search);
    setIsOpen(false);
  }

  return (
    <StyledWrapper ref={menuRef}>
      <StyledButton
        className="text-preset-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{buttonLabel}</span>
        <ChevronDown className="w-[1rem]" />
      </StyledButton>

      {isOpen && (
        <StyledMenu>
          {tabs.map((tab) => (
            <StyledItem
              className="text-preset-3"
              key={tab.path}
              onClick={() => handleNavigate(tab.path)}
            >
              {tab.label}
            </StyledItem>
          ))}
        </StyledMenu>
      )}
    </StyledWrapper>
  );
}
