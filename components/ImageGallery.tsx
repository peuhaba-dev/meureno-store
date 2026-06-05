"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Monitor } from "lucide-react";
import { getCldUrl } from "@/lib/api";

type Image = {
  id: number;
  url: string;
  isPrimary: boolean;
};

export default function ImageGallery({ images, productName }: { images: Image[]; productName: string }) {
  const sorted = [...images].sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
  const [active, setActive] = useState(0);

  if (!sorted.length) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-50 flex items-center justify-center text-gray-300">
        <Monitor size={64} />
      </div>
    );
  }

  const prev = () => setActive((i) => (i - 1 + sorted.length) % sorted.length);
  const next = () => setActive((i) => (i + 1) % sorted.length);

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
        <img
          src={getCldUrl(sorted[active].url, "w_900,h_675,c_fill,f_auto,q_auto")}
          alt={`${productName} ${active + 1}`}
          className="w-full h-full object-cover"
        />
        {sorted.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-2 right-3 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
              {active + 1}/{sorted.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex gap-2 p-3 overflow-x-auto">
          {sorted.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === active ? "border-blue-500" : "border-transparent"
              }`}
            >
              <img src={getCldUrl(img.url, "w_120,h_120,c_fill,f_auto,q_auto")} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
