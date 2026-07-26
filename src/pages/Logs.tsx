import styled from 'styled-components';
import { ClearButton, Empty, LogItem } from '../components';
import { useAppData } from '../contexts/AppDataContext';
// import { Empty } from '../components';

const StyledLogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-250);

  background-color: var(--neutral-700);
  border: 1px var(--neutral-600) solid;
  padding: var(--spacing-250);
  border-radius: var(--radius-16);

  @media (max-width: 25em) {
    padding: var(--spacing-250) var(--spacing-200);
  }
`;

const StyledLogsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 37.5em) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-125);
  }
`;

const StyledLogList = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-150);
`;

export default function Logs() {
  const { appState, appDispatch } = useAppData();
  const { logs } = appState;

  function handleClearAllButton() {
    appDispatch({ type: 'SET_LOGS', payload: {} });
  }

  if (Object.keys(logs).length === 0) {
    return (
      <Empty
        heading="No conversions logged yet"
        description="Every conversion is recorded here automatically when you tap LOG CONVERSION. Your log is private to this session and this browser."
      />
    );
  }

  return (
    <StyledLogsContainer>
      <StyledLogsHeader>
        <h3 className="uppercase text-preset-3-medium text-[var(--neutral-50)] ">
          conversion log
        </h3>
        <span className="flex items-center gap-[var(--spacing-250)] max-[37.5em]:w-full max-[37.5em]:justify-between">
          <p className="uppercase text-preset-5 text-[var(--neutral-50)] pr-[var(--spacing-200)]">
            {Object.keys(logs).length} logged
          </p>
          <ClearButton onClick={handleClearAllButton} />
        </span>
      </StyledLogsHeader>
      <StyledLogList>
        {Object.keys(logs).map((key) => (
          <LogItem
            key={key}
            date={Number(key)}
            pair={logs[Number(key)].pair}
            sendAmmount={logs[Number(key)].sendAmmount}
            receiveAmmount={logs[Number(key)].receiveAmmount}
          />
        ))}
      </StyledLogList>
    </StyledLogsContainer>
  );
}
