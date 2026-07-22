export default async function getCurrencies() {
  const res = await fetch('https://api.frankfurter.dev/v2/currencies');
  const data = await res.json();

  return data;
}
