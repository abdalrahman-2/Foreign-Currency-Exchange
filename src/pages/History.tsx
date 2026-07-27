import styled from 'styled-components';
import { RateHistoryChart } from '../components/RateHistoryChart';
import { useSearchParams } from 'react-router-dom';
// import { Empty } from '../components';

const StyledHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-250);
`;

const StyledStatsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledStatsCardContainer = styled.div`
  display: flex;
  gap: var(--spacing-200);
  flex-grow: 1;
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
  const [searchParams] = useSearchParams();
  const base = searchParams.get('base') || 'USD';
  const quote = searchParams.get('quote') || 'EGP';
  return (
    // <div>
    //   <Empty
    //     heading="No chart data available"
    //     description="We couldn't load rate history for USD/EUR right now. This usually clears
    //     up in a minute."
    //   />
    // </div>

    <StyledHistoryContainer>
      <StyledStatsSection>
        <StyledStatsCardContainer>
          <StyledStatCard>
            <h4 className="text-preset-4 text-[var(--neutral-50)] uppercase">
              open
            </h4>
            <p className="text-preset-2 text-[var(--neutral-50)]">0.8456</p>
          </StyledStatCard>
          <StyledStatCard>
            <h4 className="text-preset-4 text-[var(--neutral-50)] uppercase">
              last
            </h4>
            <p className="text-preset-2 text-[var(--neutral-50)]">0.8456</p>
          </StyledStatCard>
          <StyledStatCard>
            <h4 className="text-preset-4 text-[var(--neutral-50)] uppercase">
              change
            </h4>
            <p className="text-preset-2 text-[var(--green-500)]">0.8456</p>
          </StyledStatCard>
          <StyledStatCard>
            <h4 className="text-preset-4 text-[var(--neutral-50)] uppercase">
              % change
            </h4>
            <p className="text-preset-2 text-[var(--green-500)]">0.8456</p>
          </StyledStatCard>
        </StyledStatsCardContainer>
        <StyledButtonTimeContainer>
          <StyledButtonTime $active={false}>1D</StyledButtonTime>
          <StyledButtonTime $active={false}>1W</StyledButtonTime>
          <StyledButtonTime $active={false}>1M</StyledButtonTime>
          <StyledButtonTime $active={true}>3M</StyledButtonTime>
          <StyledButtonTime $active={false}>1Y</StyledButtonTime>
          <StyledButtonTime $active={false}>5Y</StyledButtonTime>
        </StyledButtonTimeContainer>
      </StyledStatsSection>
      <StyledChartContainer>
        <div className="flex justify-between items-center text-[var(--neutral-50)]">
          <h5 className="text-preset-3-medium ">
            {base}/{quote}
          </h5>
          <p className="text-preset-5">0.8530 • MAY 14 16:00 CET</p>
        </div>
        <RateHistoryChart />
      </StyledChartContainer>
    </StyledHistoryContainer>
  );
}
