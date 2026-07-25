import type { Rate } from '../utils/types';

// const today = new Date();
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

// const formattedToday = today.toISOString().split('T')[0];
const formattedYesterday = yesterday.toISOString().split('T')[0];

export default async function getLiveSingleRate(base: string, quote: string) {
  const res1 = await fetch(
    `https://api.frankfurter.dev/v2/rate/${base}/${quote}`,
  );
  const today: Rate = await res1.json();

  const res2 = await fetch(
    `https://api.frankfurter.dev/v2/rate/${base}/${quote}?date=${formattedYesterday}`,
  );
  const yesterday: Rate = await res2.json();

  return { today, yesterday };
}
