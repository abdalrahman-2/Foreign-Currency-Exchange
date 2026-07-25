export function rondomize<T>(arr: T[]): T[] {
  const shuffeledArr = [...arr];

  for (let i = shuffeledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffeledArr[i], shuffeledArr[j]] = [shuffeledArr[j], shuffeledArr[i]];
  }

  return shuffeledArr;
}

export function formatRate(rate: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: rate > 10000 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(rate);
}

export function setItems(key: string, value: Record<string, unknown>) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function getFavorites(key: string) {
  try {
    const favorites = window.localStorage.getItem(key);
    return favorites ? (JSON.parse(favorites) as Record<string, boolean>) : {};
  } catch (error) {
    console.log(error);
    return {};
  }
}

export function checkIfPairFavorited(base: string, quote: string): boolean {
  const tempPair = `${base}/${quote}`;
  const favoritePairs = getFavorites('favoritePairs');
  return tempPair in favoritePairs;
}

export function handleFavoriteButtonOnClick(
  base: string,
  quote: string,
  favorites: Record<string, boolean>,
  dispatcher: (action: {
    type: 'SET_FAVORITES';
    payload: Record<string, boolean>;
  }) => void,
) {
  if (checkIfPairFavorited(base, quote)) {
    const modifiedFavorites = { ...favorites };
    delete modifiedFavorites[`${base}/${quote}`];
    dispatcher({ type: 'SET_FAVORITES', payload: modifiedFavorites });
  } else {
    const modifiedFavorites = { ...favorites };
    modifiedFavorites[`${base}/${quote}`] = true;
    console.log(modifiedFavorites);
    dispatcher({ type: 'SET_FAVORITES', payload: modifiedFavorites });
  }
}

export function getLogs(key: string) {
  try {
    const logs = window.localStorage.getItem(key);
    return logs
      ? (JSON.parse(logs) as Record<
          string,
          { time: string; sendAmmount: number; receiveAmmount: number }
        >)
      : {};
  } catch (error) {
    console.log(error);
    return {};
  }
}
