import styled from 'styled-components';
import { Empty, FavoriteItem } from '../components';
import { useAppData } from '../contexts/AppDataContext';

const StyledFavoritesContaner = styled.div`
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

const StyledFavoritesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledFavoritesList = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-150);
`;

export default function Favorites() {
  const { appState } = useAppData();
  const { favorites } = appState;

  if (Object.keys(favorites).length === 0) {
    return (
      <Empty
        heading="No pinned pairs yet"
        description="Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row."
      />
    );
  }

  return (
    <StyledFavoritesContaner>
      <StyledFavoritesHeader>
        <p className="text-preset-3-medium text-[var(--neutral-50)] uppercase">
          pinned pairs
        </p>
        <p className="text-preset-5 text-[var(--neutral-50)] uppercase">
          {Object.keys(favorites).length} favorites
        </p>
      </StyledFavoritesHeader>
      <StyledFavoritesList>
        {Object.keys(favorites).map((key) => (
          <FavoriteItem key={key} pair={key} />
        ))}
      </StyledFavoritesList>
    </StyledFavoritesContaner>
  );
}
