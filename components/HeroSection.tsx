"use client";

import { useEffect, useState } from "react";
import { Shield, Star, Wrench, ChevronLeft, ChevronRight } from "lucide-react";

const BANNERS = [
  "https://res.cloudinary.com/dsimkszdo/image/upload/f_auto,q_auto/v1/store/banners/banner-1",
  "https://res.cloudinary.com/dsimkszdo/image/upload/f_auto,q_auto/v1/store/banners/banner-2",
  "https://res.cloudinary.com/dsimkszdo/image/upload/f_auto,q_auto/v1/store/banners/banner-3",
];

function useCountUp(target: number, duration: number = 1500, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function HeroSection({ total }: { total: number }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  const count = useCountUp(total, 1200, visible);

  const prev = () => { setActive((i) => (i - 1 + BANNERS.length) % BANNERS.length); setPaused(true); };
  const next = () => { setActive((i) => (i + 1) % BANNERS.length); setPaused(true); };

  return (
    <section className="relative bg-[#080c14] text-white overflow-hidden">

      {/* Banner Slider */}
      <div
        className="relative w-full aspect-[16/7] md:aspect-[21/7] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {BANNERS.map((url, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
          >
            <img
              src={url}
              alt={`Banner ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Overlay gradient bawah */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/60 via-transparent to-transparent z-10" />

        {/* Nav arrows */}
        {BANNERS.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full p-2 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full p-2 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true); }}
              className={`rounded-full transition-all duration-300 ${
                i === active ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative bg-[#0d1018] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-blue-300 font-semibold">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="tabular-nums">{count}</span> Unit Tersedia
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Shield, color: "text-emerald-400", text: "Garansi SSD 1 Tahun" },
              { icon: Star, color: "text-yellow-400", text: "Grade A Certified" },
              { icon: Wrench, color: "text-blue-400", text: "Servis & Garansi Unit" },
            ].map(({ icon: Icon, color, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={13} className={color} />
                <span className="text-xs text-gray-400 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
