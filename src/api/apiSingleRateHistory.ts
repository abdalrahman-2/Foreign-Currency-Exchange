export default async function getSingleRateHistory(
  base: string,
  quote: string,
  date: string,
) {
  const res = await fetch(
    `https://api.frankfurter.dev/v2/rates?from=${date}&to=${date}&base=${base}&quotes=${quote}`,
  );

  const history = await res.json();

  return history;
}
