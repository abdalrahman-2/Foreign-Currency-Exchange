export default async function getCurrency(iso: string) {
  const res = await fetch(`https://api.frankfurter.dev/v2/currency/${iso}`);
  const data = await res.json();

  return data;
}
