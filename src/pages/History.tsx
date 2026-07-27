import styled from 'styled-components';
import { RateHistoryChart } from '../components/RateHistoryChart';
import { useSearchParams } from 'react-router-dom';
import { useAppData } from '../contexts/AppDataContext';
import { Empty, Loader } from '../components';
import { useState } from 'react';
import useSingleRateHistory from '../hooks/useSingleRateHistory';

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';

const StyledHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-250);
`;

const StyledStatsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 62.5em) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-250);
  }
`;

const StyledStatsCardContainer = styled.div`
  display: flex;
  gap: var(--spacing-200);
  flex-grow: 1;

  @media (max-width: 41.25em) {
    flex-wrap: wrap;
    gap: var(--spacing-125);
  }
`;

const StyledStatCard = styled.div`
  width: calc(140 / 16 * 1rem);
  height: calc(81 / 16 * 1rem);

  display: flex;
  flex-direction: column;
  gap: var(--spacing-200);

  padding: var(--spacing-150) var(--spacing-250);

  border-radius: var(--radius-16);
  background-color: var(--neutral-700);
  border: 1px solid var(--neutral-600);

  @media (max-width: 41.25em) {
    width: calc(166.5 / 16 * 1rem);
  }
`;

const StyledButtonTimeContainer = styled.div`
  display: flex;
  padding: var(--spacing-025);

  background-color: var(--neutral-700);
  border-radius: var(--radius-8);
`;

const StyledButtonTime = styled.button<{ $active: boolean }>`
  width: calc(47 / 16 * 1rem);
  height: calc(38 / 16 * 1rem);

  padding: var(--spacing-150) var(--spacing-200);

  border-radius: ${({ $active }) => ($active ? 'var(--radius-8)' : '')};

  background-color: ${({ $active }) =>
    $active ? 'var(--neutral-500)' : 'transparent'};

  color: ${({ $active }) =>
    $active ? 'var(--neutral-50)' : 'var(--neutral-200)'};

  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem; /* 12px */
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0.5px;

  cursor: pointer;

  &:hover {
    background-color: var(--neutral-500);
    color: var(--neutral-50);
  }
`;

const StyledChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-250);

  padding: var(--spacing-250);
  border-radius: var(--radius-16);
  background-color: var(--neutral-700);
  border: 1px solid var(--neutral-600);
`;
export default function History() {
  const ranges: TimeRange[] = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

  const [selectedRange, setSelectedRange] = useState<TimeRange>('1M');
  const [formattedDate, setFormattedDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .split('T')[0],
  );

  const [searchParams] = useSearchParams();
  const base = searchParams.get('base') || 'USD';
  const quote = searchParams.get('quote') || 'EGP';

  const { appState } = useAppData();
  const { sendAmmount } = appState;

  function handleTimeOnClick(range: TimeRange) {
    setSelectedRange(range);
    const date = new Date();
    switch (range) {
      case '1D':
        date.setDate(date.getDate() - 1);
        break;
      case '1W':
        date.setDate(date.getDate() - 7);
        break;
      case '1M':
        date.setDate(date.getDate() - 30);
        break;
      case '3M':
        date.setDate(date.getDate() - 90);
        break;
      case '1Y':
        date.setFullYear(date.getFullYear() - 1);
        break;
      case '5Y':
        date.setFullYear(date.getFullYear() - 5);
        break;
      default:
        break;
    }

    setFormattedDate(date.toISOString().split('T')[0]);
  }

  const { data, isPending, error } = useSingleRateHistory(
    base,
    quote,
    formattedDate,
  );

  if (isPending)
    return (
      <StyledHistoryContainer>
        <Loader />
      </StyledHistoryContainer>
    );
  if (error) throw new Error(error.message);
  if (!data)
    return <StyledHistoryContainer>No data found!</StyledHistoryContainer>;

  if (sendAmmount === '') {
    return (
      <div>
        <Empty
          heading="No chart data available"
          description="We couldn't load rate history for USD/EUR right now. This usually clears
        up in a minute."
        />
      </div>
    );
  }

  console.log(data);
  const open = data[data.length - 1].rate;
  const last = data[0].rate;
  const change = last - open;
  const changePercentage = ((last - open) / open) * 100;
  const latestDate = new Date(data[data.length - 1].date);
  return (
    <StyledHistoryContainer>
      <StyledStatsSection>
        <StyledStatsCardContainer>
          <StyledStatCard>
            <h4 className="text-preset-4 text-[var(--neutral-50)] uppercase">
              open
            </h4>
            <p className="text-preset-2 text-[var(--neutral-50)]">
              {last.toFixed(2)}
            </p>
          </StyledStatCard>
          <StyledStatCard>
            <h4 className="text-preset-4 text-[var(--neutral-50)] uppercase">
              last
            </h4>
            <p className="text-preset-2 text-[var(--neutral-50)]">
              {open.toFixed(2)}
            </p>
          </StyledStatCard>
          <StyledStatCard>
            <h4 className="text-preset-4 text-[var(--neutral-50)] uppercase">
              change
            </h4>
            <p
              className={`text-preset-2 text-[var(${change >= 0 ? '--green-500' : '--red-500'})]`}
            >
              {`${change > 0 ? '+' : ''}${change.toFixed(2)}`}
            </p>
          </StyledStatCard>
          <StyledStatCard>
            <h4 className="text-preset-4 text-[var(--neutral-50)] uppercase">
              % change
            </h4>
            <p
              className={`text-preset-2 text-[var(${changePercentage >= 0 ? '--green-500' : '--red-500'})] flex items-center gap-[var(--spacing-050)]`}
            >
              <img
                src={`../../assets/images/${changePercentage >= 0 ? 'up' : 'down'}.png`}
                className="w-[14px] h-[14px]"
              />
              {`${changePercentage > 0 ? '+' : ''}${changePercentage.toFixed(2)}%`}
            </p>
          </StyledStatCard>
        </StyledStatsCardContainer>
        <StyledButtonTimeContainer>
          {ranges.map((range) => (
            <StyledButtonTime
              key={range}
              onClick={() => handleTimeOnClick(range)}
              $active={selectedRange === range}
            >
              {range}
            </StyledButtonTime>
          ))}
        </StyledButtonTimeContainer>
      </StyledStatsSection>
      <StyledChartContainer>
        <div className="flex justify-between items-center text-[var(--neutral-50)]">
          <h5 className="text-preset-3-medium ">
            {base}/{quote}
          </h5>
          <p className="text-preset-5">
            {last.toFixed(2)} •
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
              timeZoneName: 'short',
            })
              .format(latestDate)
              .toUpperCase()}
          </p>
        </div>
        <RateHistoryChart data={data} selectedRange={selectedRange} />
      </StyledChartContainer>
    </StyledHistoryContainer>
  );
}
