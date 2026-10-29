// mobile/utils/formatPrice.ts
import { EXCHANGE_RATES, CURRENCIES } from "../constants/currencies";

export function formatPrice(
  priceInNGN: number | undefined,
  displayCurrency: string = "NGN"
): string {
  if (priceInNGN === undefined || priceInNGN === null) return "Contact seller";

  const rate = EXCHANGE_RATES[displayCurrency] ?? 1;
  const converted = priceInNGN * rate;
  const currency = CURRENCIES.find((c) => c.code === displayCurrency);
  const symbol = currency?.symbol ?? displayCurrency;

  return `${symbol}${converted.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
