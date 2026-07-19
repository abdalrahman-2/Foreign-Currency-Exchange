type rateType = {
  date: string;
  base: string;
  quote: string;
  rate: number;
};

const today = new Date();
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const formattedToday = today.toISOString().split('T')[0];
const formattedYesterday = yesterday.toISOString().split('T')[0];

export async function getLiveMarkets() {
  const res1 = await fetch(
    `https://api.frankfurter.dev/v2/rates?date=${formattedToday}&base=USD`,
  );
  const today: rateType[] = await res1.json();

  const res2 = await fetch(
    `https://api.frankfurter.dev/v2/rates?date=${formattedYesterday}&base=USD`,
  );
  const yesterday: rateType[] = await res2.json();

  return { today, yesterday };
}
