"use client";

import { useDisplayCurrency } from "../../../../src/components/currencySelector/CurrencySelector";
import { formatConvertedPrice } from "../../../../src/utils/currency";

interface AdPriceProps {
  price?: number;
  terms?: string;
}

const AdPrice = ({ price }: AdPriceProps) => {
  const [displayCurrency] = useDisplayCurrency();

  return (
    <p className="text-2xl font-bold text-accent mt-2">
      {price === 0 || price === undefined ? "Price on inquiry" : formatConvertedPrice(price, displayCurrency)}
    </p>
  );
};

export default AdPrice;
