import styled from 'styled-components';
import {
  formatRate,
  getImageAssetPath,
  getLogs,
  getTimeAgo,
} from '../utils/helpers';
import DeleteButton from './DeleteButton';
import { useAppData } from '../contexts/AppDataContext';

type props = {
  date: number;
  pair: string;
  sendAmmount: string;
  receiveAmmount: string;
};

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

export default function LogItem({
  date,
  pair,
  sendAmmount,
  receiveAmmount,
}: props) {
  const { appDispatch } = useAppData();

  const base = pair.split('/')[0];
  const quote = pair.split('/')[1];

  function handleDeleteButton(date: number) {
    const modifiedLogs = getLogs();
    delete modifiedLogs[date];
    appDispatch({ type: 'SET_LOGS', payload: modifiedLogs });
  }

  return (
    <StyledFavoriteItem>
      <span className="text-preset-4 flex gap-[var(--spacing-250)] max-[37.5em]:flex-col max-[37.5em]:gap-[var(--spacing-050)]">
        <p className=" text-[var(--neutral-200)]">{getTimeAgo(date)}</p>
        <span className="flex gap-2  text-[var(--neutral-50)]">
          {base}
          <img
            className="w-[10px]"
            src={getImageAssetPath('icon-arrow-right.svg')}
            alt="right arrow"
          />
          {quote}
        </span>
      </span>
      <span className="flex justify-end gap-[var(--spacing-250)] text-preset-3 grow max-[37.5em]:flex-col max-[37.5em]:gap-[var(--spacing-025)] max-[37.5em]:items-end">
        <p className="text-[var(--neutral-100)]">
          {formatRate(Number(sendAmmount))}
        </p>
        <p className="text-[var(--lime-500)]">
          {formatRate(Number(receiveAmmount))}
        </p>
      </span>
      <DeleteButton onClick={() => handleDeleteButton(date)} />
    </StyledFavoriteItem>
  );
}
