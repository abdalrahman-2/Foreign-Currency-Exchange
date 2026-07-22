import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

type props = {
  children: React.ReactNode;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  $type: 'send' | 'receive';
  iso_code: string;
};

const StyledLi = styled.li`
  display: flex;
  gap: var(--spacing-150);
  align-items: center;
  height: calc(46 / 16 * 1rem);
  padding: var(--spacing-150) var(--spacing-100);
  border: 1px solid transparent;
  cursor: pointer;

  & p:nth-of-type(1) {
    color: var(--neutral-50);
  }

  & p:nth-of-type(2) {
    color: var(--neutral-200);
  }

  &:hover {
    border-color: var(--neutral-200);
    border-radius: var(--radius-4);
  }

  &:focus {
    outline: none;
    border-color: var(--lime-500);
  }
`;

export default function CurrencyItem({
  children,
  setShowPicker,
  $type,
  iso_code,
}: props) {
  const [, setSearchParams] = useSearchParams();

  // this handles currency picker changes
  function handleLiOnClick(iso_code: string) {
    if ($type === 'send') {
      setSearchParams((prev) => {
        prev.set('base', iso_code);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set('quote', iso_code);
        return prev;
      });
    }

    setShowPicker(false);
  }

  return (
    <StyledLi
      tabIndex={0}
      onClick={() => handleLiOnClick(iso_code)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleLiOnClick(iso_code);
          setShowPicker(false);
        }
      }}
    >
      {children}
    </StyledLi>
  );
}
