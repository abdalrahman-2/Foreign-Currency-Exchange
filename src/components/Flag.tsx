import styled from 'styled-components';
import { getFlagAssetPath } from '../utils/helpers';

type props = {
  currencyName: string;
  size: 'normal' | 'small';
};

const StyledFlag = styled.img<{ size: props['size'] }>`
  width: ${({ size }) => (size === 'normal' ? 24 / 16 : 20 / 16)}rem;
  height: ${({ size }) => (size === 'normal' ? 24 / 16 : 20 / 16)}rem;
  border-radius: var(--radius-full);
`;

export default function Flag({ currencyName, size }: props) {
  return (
    <StyledFlag
      size={size}
      src={getFlagAssetPath(currencyName)}
      alt={`${currencyName} countrie's flag`}
    />
  );
}
