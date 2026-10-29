"use client";

import { useState } from "react";
import { RiStarFill, RiStarLine } from "react-icons/ri";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  readOnly?: boolean;
}

const StarRating = ({ value, onChange, size = 20, readOnly = false }: StarRatingProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const display = hovered ?? value;

  return (
    <div className={`flex items-center gap-0.5 ${readOnly ? "" : "cursor-pointer"}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= display;

        return (
          <span
            key={star}
            onClick={() => !readOnly && onChange?.(star)}
            onMouseEnter={() => !readOnly && setHovered(star)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            className={`transition ${filled ? "text-amber-400" : "text-navy/20 dark:text-white/20"} ${
              readOnly ? "" : "hover:scale-110"
            }`}
            style={{ fontSize: size }}
            role={readOnly ? undefined : "button"}
            aria-label={readOnly ? undefined : `Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            {filled ? <RiStarFill /> : <RiStarLine />}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
