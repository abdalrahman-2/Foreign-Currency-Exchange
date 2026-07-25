import styled from 'styled-components';
import { ClearButton, LogItem } from '../components';
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
  return (
    // <Empty
    //   heading="No conversions logged yet"
    //   description="Every conversion is recorded here automatically when you tap LOG CONVERSION. Your log is private to this session and this browser."
    // />
    <StyledLogsContainer>
      <StyledLogsHeader>
        <h3 className="uppercase text-preset-3-medium text-[var(--neutral-50)] ">
          conversion log
        </h3>
        <span className="flex items-center gap-[var(--spacing-250)] max-[37.5em]:w-full max-[37.5em]:justify-between">
          <p className="uppercase text-preset-5 text-[var(--neutral-50)] pr-[var(--spacing-200)]">
            X logged
          </p>
          <ClearButton />{' '}
        </span>
      </StyledLogsHeader>
      <StyledLogList>
        <LogItem />
        <LogItem />
        <LogItem />
        <LogItem />
        <LogItem />
      </StyledLogList>
    </StyledLogsContainer>
  );
}
