"use client";

import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import type { Faq } from "../../data/marketplaceFaqs";

const FaqAccordion = ({ faqs }: { faqs: Faq[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const open = openIndex === i;

        return (
          <div
            key={faq.question}
            className="bg-white border border-[#e7e2d8] rounded-2xl overflow-hidden text-left"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
            >
              <span className="font-sora font-bold text-navy text-[15px] sm:text-base">{faq.question}</span>
              <MdKeyboardArrowDown
                className={`text-xl text-accent shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>

            {open && (
              <p className="px-5 pb-4 sm:px-6 sm:pb-5 text-muted text-sm sm:text-[15px] leading-[1.7]">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
