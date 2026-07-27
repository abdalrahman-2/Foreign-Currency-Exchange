export function randomizer<T>(arr: T[]): T[] {
  const shuffledArr = [...arr];

  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

  return shuffledArr;
}

export function getImageAssetPath(fileName: string) {
  return new URL(`../../assets/images/${fileName}`, import.meta.url).href;
}

const flagAssetModules = import.meta.glob('../../assets/images/flags/*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const flagAssetMap = Object.fromEntries(
  Object.entries(flagAssetModules).map(([path, assetUrl]) => {
    const fileName = path.split('/').pop()?.replace('.svg', '') ?? '';
    return [fileName.toLowerCase(), assetUrl];
  }),
);

export function getFlagAssetPath(currencyName: string) {
  const normalizedName = currencyName.toLowerCase();
  const fallbackFlag = flagAssetMap.xx ?? '';

  return flagAssetMap[normalizedName] ?? fallbackFlag;
}

export function formatRate(rate: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: rate > 10000 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(rate);
}

export function getTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < hour) {
    return `${Math.floor(diff / minute)}M`;
  }

  if (diff < day) {
    return `${Math.floor(diff / hour)}H`;
  }

  const date = new Date(timestamp);

  return `${date.getDate()} ${date.toLocaleString('en-US', {
    month: 'short',
  })}`;
}

export function setItems(key: string, value: Record<string, unknown>) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function getFavorites() {
  try {
    const favorites = window.localStorage.getItem('favoritePairs');
    return favorites ? (JSON.parse(favorites) as Record<string, boolean>) : {};
  } catch (error) {
    console.log(error);
    return {};
  }
}

export function checkIfPairFavorited(base: string, quote: string): boolean {
  const tempPair = `${base}/${quote}`;
  const favoritePairs = getFavorites();
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
  const modifiedFavorites = { ...favorites };
  if (checkIfPairFavorited(base, quote)) {
    delete modifiedFavorites[`${base}/${quote}`];
    dispatcher({ type: 'SET_FAVORITES', payload: modifiedFavorites });
  } else {
    modifiedFavorites[`${base}/${quote}`] = true;
    dispatcher({ type: 'SET_FAVORITES', payload: modifiedFavorites });
  }
}

export function getLogs() {
  try {
    const logs = window.localStorage.getItem('logs');
    return logs
      ? (JSON.parse(logs) as Record<
          number,
          { pair: string; sendAmmount: string; receiveAmmount: string }
        >)
      : {};
  } catch (error) {
    console.log(error);
    return {};
  }
}
