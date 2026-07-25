import styled from 'styled-components';
import { useFormData } from '../contexts/FormDataContext';
import { useSearchParams } from 'react-router-dom';
import { useAppData } from '../contexts/AppDataContext';

type Props = {
  rates?: { date: string; base: string; quote: string; rate: number }[];
};

const StyledWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  width: calc(118 / 16 * 1rem);
  height: calc(33 / 16 * 1rem);
  border-bottom: 1px solid var(--neutral-500);

  &:hover {
    border-bottom-color: var(--neutral-50);
  }

  &:focus-within {
    border-bottom-color: transparent;
    outline: 1px solid var(--lime-500);
    outline-offset: 0;
  }
`;

const StyledInput = styled.input<{ $type: 'send' | 'receive' }>`
  width: 100%;
  outline: none;
  color: ${({ $type }) =>
    $type === 'receive' ? 'var(--lime-500)' : 'var(--neutral-50)'};

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &::placeholder {
    color: var(--neutral-200);
    font-family: 'JetBrains Mono', monospace;
    font-size: ${({ $type }) => ($type === 'send' ? '2.5rem' : '1rem')};
    font-weight: ${({ $type }) => ($type === 'send' ? '700' : '500')};
    line-height: ${({ $type }) => ($type === 'send' ? '1' : '1.2')};
    letter-spacing: ${({ $type }) => ($type === 'send' ? '-0.5px' : '1px')};
  }

  @media (max-width: 48.125em) {
    font-size: 2rem;

    &::placeholder {
      font-size: 2rem;
    }
  }
`;

export default function AmmountInput(props: Props) {
  const [searchParams] = useSearchParams();
  const quote = searchParams.get('quote') || 'EGP';

  const { state } = useFormData();
  const { $type } = state;

  const { appState, appDispatch } = useAppData();
  const { sendAmmount, receiveAmmount } = appState;

  function handleAmmountOnchange(e: React.ChangeEvent<HTMLInputElement>) {
    if ($type !== 'send') return;
    const rate = props.rates!.find((rate) => rate.quote === quote)!.rate;
    appDispatch({ type: 'SET_SEND_AMMOUNT', payload: e.target.value });
    appDispatch({
      type: 'SET_RECEIVE_AMMOUNT',
      payload: String(Number(e.target.value) * rate),
    });
  }

  return (
    <StyledWrapper>
      {$type === 'receive' ? (
        <StyledInput
          type="number"
          $type={$type}
          placeholder="0"
          aria-label="Receive amount input"
          className="text-preset-3"
          value={String(Number(receiveAmmount).toFixed(2))}
          readOnly
        />
      ) : (
        <StyledInput
          type="number"
          $type={$type}
          placeholder="0"
          aria-label="Send amount input"
          className="text-preset-1"
          value={sendAmmount}
          onChange={handleAmmountOnchange}
        />
      )}
    </StyledWrapper>
  );
}
