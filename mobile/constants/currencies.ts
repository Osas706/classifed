// mobile/constants/currencies.ts
export const CURRENCIES = [
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
];

// Exchange rates relative to NGN (approximate)
export const EXCHANGE_RATES: Record<string, number> = {
  NGN: 1,
  USD: 0.00065,
  EUR: 0.0006,
  GBP: 0.00051,
  GHS: 0.0092,
  KES: 0.084,
  ZAR: 0.012,
};
