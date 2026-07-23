import styled from 'styled-components';
import AmmountInput from './AmmountInput';
import CurrencyButton from './CurrencyButton';
import SwapButton from './SwapButton';
import FavoritButton from './FavoriteButton';
import LogButton from './LogButton';
import { useSearchParams } from 'react-router-dom';
import {
  FormDataContext,
  type Action,
  type State,
} from '../contexts/FormDataContext';
import { useReducer, useState } from 'react';
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
  const [searchParams, setSearchPrams] = useSearchParams();
  const base = searchParams.get('base') || 'USD';
  const quote = searchParams.get('quote') || 'EGP';

  const [sendValue, setSendValue] = useState('');
  const [receiveValue, setReceiveValue] = useState('');

  // defining initial states
  const initialState1: State = {
    $type: 'send',
    showPicker: false,
  };

  const initialState2: State = {
    $type: 'receive',
    showPicker: false,
  };

  // defining the reducer
  function formDataReducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SET_TYPE':
        return { ...state, $type: action.payload };
      case 'SET_SHOWPICKER':
        return { ...state, showPicker: action.payload };
    }
  }

  // defning the useReducers
  const [state1, dispatch1] = useReducer(formDataReducer, initialState1);
  const [state2, dispatch2] = useReducer(formDataReducer, initialState2);

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

  function handleSwapButton() {
    const temp = base;
    setSearchPrams({
      base: quote,
      quote: temp,
    });
  }

  return (
    <section className="flex flex-col gap-[12px]">
      <h2 className="text-preset-2">check the rate</h2>
      <StyledForm>
        <StyledCurrencyPickersContainer>
          {/* send */}
          <FormDataContext.Provider
            value={{ state: state1, dispatch: dispatch1 }}
          >
            <StyledCurrencyTaker>
              <p className="text-preset-4">send</p>
              <div className="flex justify-between">
                <AmmountInput
                  $type="send"
                  sendValue={sendValue}
                  setSendValue={setSendValue}
                  setReceiveValue={setReceiveValue}
                  rates={today}
                  quote={quote}
                />
                <CurrencyButton />
              </div>
            </StyledCurrencyTaker>
          </FormDataContext.Provider>
          <SwapButton onClick={handleSwapButton} />
          {/* recieve */}
          <FormDataContext.Provider
            value={{ state: state2, dispatch: dispatch2 }}
          >
            <StyledCurrencyTaker>
              <p className="text-preset-4">receive</p>
              <div className="flex justify-between">
                <AmmountInput $type="receive" receiveValue={receiveValue} />
                <CurrencyButton />
              </div>
            </StyledCurrencyTaker>
          </FormDataContext.Provider>
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
