"use client";

import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CURRENCIES, getCurrency } from "../../utils/currency";
import useStore from "../../store/useStore";

interface CurrencySelectorProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
  compact?: boolean;
}

// Reads/writes the user's preferred display currency (backed by the shared store + localStorage)
// so every price on the page stays in sync. Purely a UI preference — it never affects ad
// creation or storage, which always stays in Naira.
export const useDisplayCurrency = () => {
  const { displayCurrency, setDisplayCurrency } = useStore();
  return [displayCurrency, setDisplayCurrency] as const;
};

const CurrencySelector = ({ value, onChange, className = "", compact = false }: CurrencySelectorProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // Render the default currency until mounted so the server-rendered markup (which has no
  // access to the persisted localStorage preference) matches the first client render.
  const current = getCurrency(mounted ? value : "NGN");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const select = (code: string) => {
    onChange(code);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Display currency"
        className={`flex items-center gap-1.5 rounded-lg border border-[#e7e2d8] dark:border-white/15 bg-white dark:bg-navy px-3 py-2 text-sm font-semibold text-navy-ink dark:text-white outline-none hover:bg-accent-soft dark:hover:bg-white/10 transition ${
          compact ? "px-2.5 py-1.5 text-xs" : ""
        }`}
      >
        <span>{current.flag}</span>
        <span>{current.code}</span>
        <MdKeyboardArrowDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 max-h-72 w-56 overflow-y-auto rounded-xl border border-[#e7e2d8] dark:border-white/15 bg-white dark:bg-navy-deep py-1.5 shadow-[0_16px_40px_-12px_rgba(7,19,40,0.35)]"
        >
          {CURRENCIES.map((c) => (
            <li key={c.code}>
              <button
                type="button"
                role="option"
                aria-selected={c.code === value}
                onClick={() => select(c.code)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-left text-sm transition ${
                  c.code === value
                    ? "bg-accent-soft dark:bg-white/10 text-navy dark:text-white font-semibold"
                    : "text-navy-ink/80 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <span className="font-semibold">{c.code}</span>
                <span className="text-xs text-muted truncate">{c.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencySelector;
