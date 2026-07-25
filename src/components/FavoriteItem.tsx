import styled from 'styled-components';
import useSingleRate from '../hooks/useSingleRate';
import Loader from './Loader';
import SmallFavoritButton from './SmallFavoriteButton';

type props = {
  pair: string;
};

const StyledFavoriteItem = styled.li`
  display: flex;
  align-items: center;
  gap: var(--spacing-250);

  background-color: var(--neutral-600);
  border: solid 1px var(--neutral-500);
  padding: var(--spacing-150) var(--spacing-200);
  border-radius: var(--radius-10);
`;

export default function FavoriteItem({ pair }: props) {
  const base = pair.split('/')[0];
  const quote = pair.split('/')[1];

  const { isPending, error, data } = useSingleRate(base, quote);
  if (isPending)
    return (
      <StyledFavoriteItem>
        <Loader />
      </StyledFavoriteItem>
    );
  if (!data) return <StyledFavoriteItem>no data found</StyledFavoriteItem>;
  if (error) throw new Error(error.message);

  const { today, yesterday } = data;

  const rate = today.rate;
  const percentage = ((today.rate - yesterday.rate) / yesterday.rate) * 100;

  console.log(today);
  console.log(yesterday);

  return (
    <StyledFavoriteItem>
      <span className="flex gap-2 text-preset-4 grow text-[var(--neutral-50)]">
        {base}
        <img
          className="w-[10px]"
          src="../../assets/images/icon-arrow-right.svg"
          alt="right arrow"
        />
        {quote}
      </span>
      <span>
        <p className="text-right text-preset-3 mb-[6px] text-[var(--neutral-50)]">
          {rate}
        </p>
        <span className="text-preset-6 flex items-center gap-2 justify-end text-[var(--neutral-50)]">
          <img
            className="w-[8px] h-[8px] "
            src={`../../assets/images/${percentage >= 0 ? 'up' : 'down'}.png`}
          />
          <p
            className={`${percentage >= 0 ? 'text-[var(--green-500)]' : 'text-[var(--red-500)]'}`}
          >
            {percentage >= 0 ? '+' : ''}
            {percentage.toFixed(2)}%
          </p>
        </span>
      </span>
      <SmallFavoritButton $state="favorited" />
    </StyledFavoriteItem>
  );
}
