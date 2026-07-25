export function rondomize<T>(arr: T[]): T[] {
  const shuffeledArr = [...arr];

  for (let i = shuffeledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffeledArr[i], shuffeledArr[j]] = [shuffeledArr[j], shuffeledArr[i]];
  }

  return shuffeledArr;
}

export function setItems(key: string, value: Record<string, unknown>) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function getItems(key: string) {
  try {
    const items = window.localStorage.getItem(key);
    return items ? (JSON.parse(items) as Record<string, unknown>) : {};
  } catch (error) {
    console.log(error);
    return {};
  }
}

export function checkIfPairFavorited(base: string, quote: string): boolean {
  const tempPair = `${base}/${quote}`;
  const favoritePairs = getItems('favoritePairs');
  return tempPair in favoritePairs;
}
