// Prices are stored in NGN. Rates match the web app and are for display only.
export const CURRENCIES = [
  { code: "NGN", label: "Nigeria", symbol: "₦", flag: "🇳🇬", rateFromNGN: 1 },
  { code: "GHS", label: "Ghana", symbol: "₵", flag: "🇬🇭", rateFromNGN: 0.0086 },
  { code: "KES", label: "Kenya", symbol: "KSh", flag: "🇰🇪", rateFromNGN: 0.084 },
  { code: "ZAR", label: "South Africa", symbol: "R", flag: "🇿🇦", rateFromNGN: 0.012 },
  { code: "EGP", label: "Egypt", symbol: "E£", flag: "🇪🇬", rateFromNGN: 0.032 },
  { code: "MAD", label: "Morocco", symbol: "DH", flag: "🇲🇦", rateFromNGN: 0.0063 },
  { code: "ETB", label: "Ethiopia", symbol: "Br", flag: "🇪🇹", rateFromNGN: 0.078 },
  { code: "TZS", label: "Tanzania", symbol: "TSh", flag: "🇹🇿", rateFromNGN: 1.62 },
  { code: "UGX", label: "Uganda", symbol: "USh", flag: "🇺🇬", rateFromNGN: 2.35 },
  { code: "XOF", label: "Senegal / Côte d'Ivoire", symbol: "CFA", flag: "🇸🇳", rateFromNGN: 0.39 },
  { code: "RWF", label: "Rwanda", symbol: "FRw", flag: "🇷🇼", rateFromNGN: 0.79 },
  { code: "XAF", label: "Cameroon", symbol: "FCFA", flag: "🇨🇲", rateFromNGN: 0.39 },
  { code: "ZMW", label: "Zambia", symbol: "K", flag: "🇿🇲", rateFromNGN: 0.016 },
  { code: "AOA", label: "Angola", symbol: "Kz", flag: "🇦🇴", rateFromNGN: 0.57 },
  { code: "BWP", label: "Botswana", symbol: "P", flag: "🇧🇼", rateFromNGN: 0.0084 },
  { code: "ZWG", label: "Zimbabwe", symbol: "ZiG", flag: "🇿🇼", rateFromNGN: 0.016 },
  { code: "USD", label: "US Dollar", symbol: "$", flag: "🇺🇸", rateFromNGN: 0.00062 },
];

export const EXCHANGE_RATES: Record<string, number> = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c.rateFromNGN])
);
