"use client";

import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";

export default function ShareButtons({ productName, price }: { productName: string; price: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareWA = () => {
    if (typeof window === "undefined") return;
    const text = encodeURIComponent(
      `Cek laptop ini di Meureno Tech Store:\n${productName} — ${price}\n${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCopy}
        className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-medium py-2.5 rounded-xl transition-all active:scale-[0.98]"
      >
        {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
        {copied ? "Tersalin!" : "Copy Link"}
      </button>
      <button
        onClick={handleShareWA}
        className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm font-medium py-2.5 rounded-xl transition-all active:scale-[0.98]"
      >
        <Share2 size={15} />
        Bagikan
      </button>
    </div>
  );
}
