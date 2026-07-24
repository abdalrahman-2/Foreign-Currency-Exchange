import styled from 'styled-components';
import AmmountInput from './AmmountInput';
import CurrencyButton from './CurrencyButton';
import SwapButton from './SwapButton';
import FavoritButton from './FavoriteButton';
import LogButton from './LogButton';
import { useSearchParams } from 'react-router-dom';
import { FormDataProvider } from '../contexts/FormDataContext';
import { useState } from 'react';
import useTicker from '../hooks/useTicker';
import Loader from './Loader';

const StyledForm = styled.form`
  background-color: var(--neutral-700);
  border-radius: var(--radius-20);
`;

const StyledCurrencyPickersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-250);

  // 690 px
  @media (max-width: 43.125em) {
    flex-direction: column;
    gap: var(--spacing-200);
  }
`;

const StyledCurrencyTaker = styled.div`
  background-color: var(--neutral-600);
  border-radius: var(--radius-16);
  padding: var(--spacing-250);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: calc(450 / 16 * 1rem);
  height: calc(118 / 16 * 1rem);

  // 1070 px
  @media (max-width: 66.875em) {
    width: calc(400 / 16 * 1rem);
  }

  // 970 px
  @media (max-width: 66.875em) {
    width: calc(350 / 16 * 1rem);
  }

  // 870 px
  @media (max-width: 66.875em) {
    width: calc(320 / 16 * 1rem);
  }

  // 800 px
  @media (max-width: 50em) {
    width: calc(292 / 16 * 1rem);
    height: calc(117 / 16 * 1rem);
  }

  // 740 px
  @media (max-width: 46.25em) {
    width: calc(270 / 16 * 1rem);
  }

  // 690 px
  @media (max-width: 43.125em) {
    width: calc(311 / 16 * 1rem);
    height: calc(109 / 16 * 1rem);
  }
`;

const StyledButtonsContainer = styled.div`
  padding: var(--spacing-200) var(--spacing-250);
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: dashed var(--neutral-500) 1px;

  // 560 px
  @media (max-width: 35em) {
    flex-direction: column;
    gap: var(--spacing-200);
  }
`;

const StyledText = styled.p`
  color: var(--nuetral-50);
  // 375 px
  @media (max-width: 23.4375em) {
    font-size: 0.625rem;
    line-height: 1;
    letter-spacing: 0;
  }
`;

export default function ConverterForm() {
  const [searchParams] = useSearchParams();
  const base = searchParams.get('base') || 'USD';
  const quote = searchParams.get('quote') || 'EGP';

  const [sendValue, setSendValue] = useState('');
  const [receiveValue, setReceiveValue] = useState('');

  const { isPending, error, data } = useTicker(base);
  if (isPending)
    return (
      <StyledCurrencyTaker>
        <Loader />
      </StyledCurrencyTaker>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <p>No data found!</p>;
  const { today } = data;

  return (
    <section className="flex flex-col gap-[12px]">
      <h2 className="text-preset-2">check the rate</h2>
      <StyledForm>
        <StyledCurrencyPickersContainer>
          {/* send */}
          <FormDataProvider $type="send">
            <StyledCurrencyTaker>
              <p className="text-preset-4">send</p>
              <div className="flex justify-between">
                <AmmountInput
                  sendValue={sendValue}
                  setSendValue={setSendValue}
                  setReceiveValue={setReceiveValue}
                  rates={today}
                />
                <CurrencyButton />
              </div>
            </StyledCurrencyTaker>
          </FormDataProvider>
          <SwapButton />
          {/* recieve */}
          <FormDataProvider $type="receive">
            <StyledCurrencyTaker>
              <p className="text-preset-4">receive</p>
              <div className="flex justify-between">
                <AmmountInput receiveValue={receiveValue} />
                <CurrencyButton />
              </div>
            </StyledCurrencyTaker>
          </FormDataProvider>
        </StyledCurrencyPickersContainer>

        {/* ****************************************************************** */}

        <StyledButtonsContainer>
          <StyledText className="text-preset-5">
            1 {base} = {today.find((rate) => rate.quote === quote)?.rate}{' '}
            {quote}
          </StyledText>
          <div className="flex gap-[12px]">
            <FavoritButton state="empty" onClick={(e) => e.preventDefault()} />
            <LogButton state="empty" />
          </div>
        </StyledButtonsContainer>
      </StyledForm>
    </section>
  );
}
