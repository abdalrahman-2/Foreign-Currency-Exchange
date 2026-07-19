import styled from 'styled-components';
import useTicker from '../hooks/useTicker';
import Loader from './Loader';

const StyledDiv = styled.div`
  display: flex;
  height: calc(40 / 16 * 1rem);
  overflow: hidden;
  @media (max-width: 23.4375em) {
    height: calc(34 / 16 * 1rem);
  }
`;

const StyledHeading = styled.h2`
  position: relative;
  z-index: 2;
  flex-shrink: 0;

  width: calc(138 / 16 * 1rem);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-150) var(--spacing-200);
  background-color: var(--lime-500);
  color: var(--neutral-900);
  text-transform: uppercase;

  & img {
    width: calc(6 / 16 * 1rem);
    height: calc(6 / 16 * 1rem);
  }

  //mobile
  @media (max-width: 23.4375em) {
    width: calc(102 / 16 * 1rem);
  }
  & span {
    @media (max-width: 23.4375em) {
      font-size: 0.5rem;
      font-weight: 400;
      line-height: 1;
      letter-spacing: 0;
    }
  }
`;
const StyledUl = styled.ul`
  display: flex;
  flex-shrink: 0;
  background-color: var(--neutral-700);

  animation: slide 560s linear infinite;

  @keyframes slide {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-100%);
    }
  }
`;

const StyledRate = styled.li<{ situation: 'up' | 'down' }>`
  display: flex;
  align-items: center;
  padding: var(--spacing-150) var(--spacing-125);
  gap: var(--spacing-100);
  border-right: var(--neutral-500) 1px solid;
  width: max-content;
  & p:nth-child(1) {
    color: var(--neutral-200);
  }

  & p:nth-child(2) {
    color: var(--neutral-50);
  }

  & p:nth-child(3) {
    color: ${(props) =>
      props.situation === 'up' ? 'var(--green-500)' : 'var(--red-500)'};
  }

  & p:nth-child(1),
  & p:nth-child(2),
  & p:nth-child(3) {
    @media (max-width: 23.4375em) {
      font-size: 0.625rem;
      line-height: 1;
      letter-spacing: 0;
    }
  }
`;

export default function Ticker() {
  const { isPending, data, error } = useTicker();

  if (isPending)
    return (
      <StyledDiv>
        <Loader />
      </StyledDiv>
    );
  if (error) return <StyledDiv>Error: {error.message}</StyledDiv>;
  if (!data) return <p>No data found!</p>;

  const { today, yesterday } = data;
  const diffs = today.map((item, idx) => {
    const percentage =
      ((item.rate - yesterday[idx].rate) / yesterday[idx].rate) * 100;
    return {
      baseToQuote: `USD/${item.quote}`,
      rate: item.rate.toFixed(4),
      percentage: `${percentage.toFixed(2)}%`,
    };
  });

  console.log(today, yesterday);
  console.log(diffs);

  return (
    <StyledDiv>
      <StyledHeading>
        <img src="../../assets/images/record-button.png" />
        <span className="text-preset-5-medium">Live Markets</span>
      </StyledHeading>

      <StyledUl>
        {diffs.map((rate) => (
          <StyledRate
            situation={
              Number(rate.percentage.split('%')[0]) >= 0 ? 'up' : 'down'
            }
            key={rate.baseToQuote}
          >
            <p className="text-preset-5">{rate.baseToQuote}</p>
            <p className="text-preset-5-medium">{rate.rate}</p>
            <p className="text-preset-5 flex items-center gap-[5px]">
              <img
                className="w-[8px] h-[8px] "
                src={`../../assets/images/${Number(rate.percentage.split('%')[0]) >= 0 ? 'up' : 'down'}.png`}
              />
              <span>{rate.percentage}</span>
            </p>
          </StyledRate>
        ))}
      </StyledUl>
    </StyledDiv>
  );
}
