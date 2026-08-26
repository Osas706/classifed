"use client";

import CurrencySelector, { useDisplayCurrency } from "../../../src/components/currencySelector/CurrencySelector";
import { formatConvertedPrice } from "../../../src/utils/currency";

const SAMPLE_NGN_PRICE = 250000;

interface CountryCurrencyWidgetProps {
  countryCurrencyCode: string;
}

// Lets visitors preview listing prices (stored in NGN) in their preferred currency.
// Display-only — never affects ad creation or storage, which always stays in Naira.
const CountryCurrencyWidget = ({ countryCurrencyCode }: CountryCurrencyWidgetProps) => {
  const [currency, setCurrency] = useDisplayCurrency();

  return (
    <div className="bg-white border border-[#e7e2d8] rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-between">
      <div className="text-center sm:text-left">
        <span className="block text-xs text-muted">Prices are stored in ₦ (Naira). Preview in:</span>
        <strong className="font-sora text-navy text-sm">
          {formatConvertedPrice(SAMPLE_NGN_PRICE, currency)} <span className="text-muted font-normal">≈ ₦{SAMPLE_NGN_PRICE.toLocaleString()}</span>
        </strong>
      </div>

      <CurrencySelector value={currency} onChange={setCurrency} />
    </div>
  );
};

export default CountryCurrencyWidget;
