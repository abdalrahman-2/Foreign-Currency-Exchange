export function rondomize<T>(arr: T[]): T[] {
  const shuffeledArr = [...arr];

  for (let i = shuffeledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffeledArr[i], shuffeledArr[j]] = [shuffeledArr[j], shuffeledArr[i]];
  }

  return shuffeledArr;
}
