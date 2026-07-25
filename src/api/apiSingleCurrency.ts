export default async function getCurrency(base: string) {
  const res = await fetch(`https://api.frankfurter.dev/v2/currency/${base}`);
  const data = await res.json();

  return data;
}
