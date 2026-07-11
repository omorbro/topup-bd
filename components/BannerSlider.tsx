"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const banners = [
  "/images/banner1.png",
  "/images/banner2.png",
  "/images/banner3.png",
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <Image
        src={banners[current]}
        alt="Banner"
        width={1200}
        height={500}
        className="w-full h-auto rounded-xl"
        priority
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
