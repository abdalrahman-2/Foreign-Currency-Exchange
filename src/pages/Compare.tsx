import styled from 'styled-components';
import Empty from '../components/Empty';
import { useAppData } from '../contexts/AppDataContext';
import { useSearchParams } from 'react-router-dom';
import useTicker from '../hooks/useTicker';
import { CompareItem, Loader } from '../components';
import { rondomize } from '../utils/helpers';

const StyledCompareContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-250);

  background-color: var(--neutral-700);
  border: 1px var(--neutral-600) solid;
  padding: var(--spacing-250);
  border-radius: var(--radius-16);

  @media (max-width: 25em) {
    padding: var(--spacing-200);
  }
`;

const StyledCompareHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCompareList = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-150);
`;

export default function Compare() {
  const [searchParams] = useSearchParams();
  const base = searchParams.get('base') || 'USD';

  const { appState } = useAppData();
  const { sendAmmount } = appState;

  const { data, error, isPending } = useTicker(base);
  if (isPending)
    return (
      <StyledCompareContainer>
        <Loader />
      </StyledCompareContainer>
    );
  if (error) throw new Error(error.message);
  if (!data)
    return <StyledCompareContainer>No data found!</StyledCompareContainer>;

  if (sendAmmount === '') {
    return (
      <Empty
        heading="No comparison available"
        description="Enter an amount in SEND above to see what your money is worth in other currencies."
      />
    );
  }

  const { today } = data;
  console.log(today);
  const shuffeled = rondomize(today);
  console.log(shuffeled);

  return (
    <StyledCompareContainer>
      <StyledCompareHeader>
        <span className="flex gap-[var(--spacing-150)]">
          <p className="text-preset-4 text-[var(--neutral-200)] uppercase">
            multi-currency
          </p>
          <p className="text-preset-3-medium text-[var(--neutral-50)] uppercase">
            {sendAmmount} from {base}
          </p>
        </span>
        <p className="text-preset-5 text-[var(--neutral-50)] uppercase">
          8 pairs
        </p>
      </StyledCompareHeader>
      <StyledCompareList>
        {shuffeled.map((item, idx) => {
          if (idx <= 7) {
            return (
              <CompareItem
                key={item.quote}
                quote={item.quote}
                rate={item.rate}
                ammount={sendAmmount}
              />
            );
          }
        })}
      </StyledCompareList>
    </StyledCompareContainer>
  );
}
