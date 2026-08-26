"use client";

import { CURRENCIES } from "../../utils/currency";
import useStore from "../../store/useStore";

interface CurrencySelectorProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

// Reads/writes the user's preferred display currency (backed by the shared store + localStorage)
// so every price on the page stays in sync. Purely a UI preference — it never affects ad
// creation or storage, which always stays in Naira.
export const useDisplayCurrency = () => {
  const { displayCurrency, setDisplayCurrency } = useStore();
  return [displayCurrency, setDisplayCurrency] as const;
};

const CurrencySelector = ({ value, onChange, className = "" }: CurrencySelectorProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Display currency"
      className={`rounded-lg border border-[#e7e2d8] bg-white px-3 py-2 text-sm font-semibold text-navy-ink outline-none focus:border-accent transition ${className}`}
    >
      {CURRENCIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.code} — {c.label}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
