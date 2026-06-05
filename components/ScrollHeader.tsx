"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Laptop, MessageCircle } from "lucide-react";

export default function ScrollHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-10 transition-all duration-300 ${
      scrolled
        ? "bg-[#0a0c12]/95 backdrop-blur-md border-b border-blue-500/10 shadow-lg shadow-blue-500/5"
        : "bg-[#0f1117]/90 backdrop-blur-md border-b border-white/5"
    }`}>
      <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
            scrolled
              ? "bg-blue-500 shadow-lg shadow-blue-500/30"
              : "bg-blue-600 shadow-lg shadow-blue-500/20"
          }`}>
            <Laptop className="text-white" size={16} />
          </div>
          <div>
            <span className="font-black text-white text-sm tracking-tight">Meureno Tech Store</span>
            <span className="hidden sm:inline text-xs text-gray-500 ml-2">Laptop Bekas Terpercaya</span>
          </div>
        </Link>
        <a
          href="https://wa.me/628984125987"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.97] text-white text-sm px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
        >
          <MessageCircle size={15} />
          <span>Hubungi Kami</span>
        </a>
      </div>
    </header>
  );
}
