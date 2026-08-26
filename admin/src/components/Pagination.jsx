import React from "react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";

const Pagination = ({ currentPage, numberOfPages, onChange }) => {
  if (numberOfPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2 mt-2">
      <button
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-navy disabled:opacity-40"
      >
        <HiOutlineArrowLeft /> Prev
      </button>

      <span className="rounded-lg px-3 py-1.5 text-sm border border-slate-300 text-navy font-medium">
        Page {currentPage} of {numberOfPages}
      </span>

      <button
        onClick={() => onChange(Math.min(numberOfPages, currentPage + 1))}
        disabled={currentPage === numberOfPages}
        className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-navy disabled:opacity-40"
      >
        Next <HiOutlineArrowRight />
      </button>
    </nav>
  );
};

export default Pagination;
