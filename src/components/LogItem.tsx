import styled from 'styled-components';
import { formatRate } from '../utils/helpers';
import DeleteButton from './DeleteButton';

const StyledFavoriteItem = styled.li`
  display: flex;
  align-items: center;
  gap: var(--spacing-200);

  background-color: var(--neutral-600);
  border: solid 1px var(--neutral-500);
  padding: var(--spacing-200) var(--spacing-200);
  border-radius: var(--radius-10);

  @media (max-width: 23.125em) {
    padding: var(--spacing-150) var(--spacing-150);
    gap: var(--spacing-125);
  }
`;

export default function LogItem() {
  return (
    <StyledFavoriteItem>
      <span className="text-preset-4 flex gap-[var(--spacing-250)] max-[37.5em]:flex-col max-[37.5em]:gap-[var(--spacing-050)]">
        <p className=" text-[var(--neutral-200)]">11 may</p>
        <span className="flex gap-2  text-[var(--neutral-50)]">
          USD
          <img
            className="w-[10px]"
            src="../../assets/images/icon-arrow-right.svg"
            alt="right arrow"
          />
          EGP
        </span>
      </span>
      <span className="flex justify-end gap-[var(--spacing-250)] text-preset-3 grow max-[37.5em]:flex-col max-[37.5em]:gap-[var(--spacing-025)] max-[37.5em]:items-end">
        <p className="text-[var(--neutral-100)]">{formatRate(10000)}</p>
        <p className="text-[var(--lime-500)]">{formatRate(50000)}</p>
      </span>
      <DeleteButton />
    </StyledFavoriteItem>
  );
}
