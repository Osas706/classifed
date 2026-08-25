"use client";

import { useEffect, useState } from "react";

const IMAGES = ["/bic.jpg", "/ps.png", "/car.png", "/keke.png", "/fash.png"];

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev >= IMAGES.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full rounded-2xl bg-[#759585] overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out w-full h-full">
        {IMAGES.map((src, index) => (
          <div
            key={src}
            className={`slide min-w-full ${index === slideIndex ? "block m-auto" : "hidden"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-full m-auto object-cover" src={src} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
