"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function ScrollHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-30 transition-all duration-500 ${
      scrolled
        ? "bg-[#0d0f1a]/95 backdrop-blur-xl border-b border-indigo-500/10 shadow-xl shadow-indigo-900/20"
        : "bg-transparent"
    }`}>
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Wordmark dengan M stylized */}
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
              <span className="text-white font-black text-sm tracking-tighter">M</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-sm tracking-tight">MEURENO</span>
              <span className="text-blue-400 font-bold text-[9px] tracking-[0.15em] uppercase">Tech Store</span>
            </div>
          </div>
        </Link>

        {/* Center — tagline, hidden mobile */}
        <div className="hidden md:flex items-center gap-1.5 bg-white/[0.04] border border-white/5 rounded-full px-4 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-gray-400 font-medium">Laptop Bekas · Grade A · Bergaransi</span>
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/628984125987"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.97] text-white text-sm px-4 py-2 rounded-xl font-bold transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
        >
          <MessageCircle size={15} />
          <span className="hidden sm:inline">Hubungi Kami</span>
          <span className="sm:hidden">Chat</span>
        </a>

      </div>

      {/* Subtle bottom glow saat scroll */}
      {scrolled && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      )}
    </header>
  );
}
