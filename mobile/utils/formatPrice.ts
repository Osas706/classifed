import { CURRENCIES } from "../constants/currencies";

export function formatPrice(
  priceInNGN: number | undefined,
  displayCurrency: string = "NGN"
): string {
  if (priceInNGN === undefined || priceInNGN === null || Number(priceInNGN) === 0) {
    return "On inquiry";
  }

  const currency = CURRENCIES.find((c) => c.code === displayCurrency) || CURRENCIES[0];
  const converted = Number(priceInNGN) * currency.rateFromNGN;
  const decimals = converted >= 1000 || currency.code === "NGN" ? 0 : 2;

  return `${currency.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}
