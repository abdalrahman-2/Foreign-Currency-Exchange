import styled from 'styled-components';

type Props = {
  state?: 'default' | 'chosen';
  children: React.ReactNode;
};

const StyledTab = styled.li<{ state: Props['state'] }>`
  height: calc(42 / 16 * 1rem);
  border-bottom: 2px solid
    ${({ state }) => (state === 'chosen' ? 'var(--lime-500)' : 'transparent')};

  &:hover {
    border-bottom-color: var(--lime-500);
  }

  &:focus {
    outline: 1px solid var(--lime-500);
    outline-offset: 3px;
  }
`;

export default function Tab({ state = 'default', children }: Props) {
  return <StyledTab state={state}>{children}</StyledTab>;
}
