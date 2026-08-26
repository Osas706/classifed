// All ad prices are created and stored in Nigerian Naira (NGN). This table is ONLY used to
// convert prices for on-screen display — it is approximate/static and NOT live FX data, and it
// never touches how ads are created, stored, or sent to the backend.
export interface CurrencyOption {
  code: string;
  label: string;
  symbol: string;
  // 1 NGN = ratesFromNGN[code] units of that currency
  rateFromNGN: number;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: "NGN", label: "Nigeria", symbol: "₦", rateFromNGN: 1 },
  { code: "GHS", label: "Ghana", symbol: "₵", rateFromNGN: 0.0086 },
  { code: "KES", label: "Kenya", symbol: "KSh", rateFromNGN: 0.084 },
  { code: "ZAR", label: "South Africa", symbol: "R", rateFromNGN: 0.012 },
  { code: "EGP", label: "Egypt", symbol: "E£", rateFromNGN: 0.032 },
  { code: "MAD", label: "Morocco", symbol: "DH", rateFromNGN: 0.0063 },
  { code: "ETB", label: "Ethiopia", symbol: "Br", rateFromNGN: 0.078 },
  { code: "TZS", label: "Tanzania", symbol: "TSh", rateFromNGN: 1.62 },
  { code: "UGX", label: "Uganda", symbol: "USh", rateFromNGN: 2.35 },
  { code: "XOF", label: "Senegal / Côte d'Ivoire", symbol: "CFA", rateFromNGN: 0.39 },
  { code: "RWF", label: "Rwanda", symbol: "FRw", rateFromNGN: 0.79 },
  { code: "XAF", label: "Cameroon", symbol: "FCFA", rateFromNGN: 0.39 },
  { code: "ZMW", label: "Zambia", symbol: "K", rateFromNGN: 0.016 },
  { code: "USD", label: "US Dollar", symbol: "$", rateFromNGN: 0.00062 },
];

export const DEFAULT_CURRENCY_CODE = "NGN";

export function getCurrency(code: string): CurrencyOption {
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
}

export function convertFromNGN(amountInNGN: number, targetCurrencyCode: string): number {
  const currency = getCurrency(targetCurrencyCode);
  return amountInNGN * currency.rateFromNGN;
}

export function formatConvertedPrice(amountInNGN: number, targetCurrencyCode: string): string {
  const currency = getCurrency(targetCurrencyCode);
  const converted = convertFromNGN(amountInNGN, targetCurrencyCode);

  const decimals = converted >= 1000 || currency.code === "NGN" ? 0 : 2;

  return `${currency.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}
