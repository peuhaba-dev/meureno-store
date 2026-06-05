"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Star, Wrench, ChevronLeft, ChevronRight } from "lucide-react";

const CMS_API = "https://cms.meureno.com";
const SLIDE_INTERVAL = 4000;
const RESUME_DELAY = 8000;

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
  const [banners, setBanners] = useState<string[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch(`${CMS_API}/banners/list`)
      .then(r => r.json())
      .then(data => {
        const urls = (data.banners || []).map((b: { url: string }) => b.url);
        setBanners(urls);
      })
      .catch(() => setBanners([]));
  }, []);

  const startInterval = (currentBanners: string[]) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (currentBanners.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setActive(i => (i + 1) % currentBanners.length);
    }, SLIDE_INTERVAL);
  };

  useEffect(() => {
    startInterval(banners);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [banners]);

  const pauseAndResume = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => startInterval(banners), RESUME_DELAY);
  };

  const count = useCountUp(total, 1200, visible);

  const prev = () => {
    setActive(i => (i - 1 + banners.length) % banners.length);
    pauseAndResume();
  };

  const next = () => {
    setActive(i => (i + 1) % banners.length);
    pauseAndResume();
  };

  const goTo = (i: number) => {
    setActive(i);
    pauseAndResume();
  };

  return (
    <section className="relative bg-[#080c14] text-white overflow-hidden">

      {banners.length > 0 && (
        <div
          className="relative w-full aspect-[16/7] md:aspect-[21/7] overflow-hidden"
          onMouseEnter={() => { if (intervalRef.current) clearInterval(intervalRef.current); }}
          onMouseLeave={() => startInterval(banners)}
        >
          {banners.map((url, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
            >
              <img src={url} alt={`Banner ${i + 1}`} className="w-full h-full object-contain md:object-cover bg-[#080c14]" />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/60 via-transparent to-transparent z-10" />

          {banners.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full p-2 transition-all">
                <ChevronLeft size={20} />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white rounded-full p-2 transition-all">
                <ChevronRight size={20} />
              </button>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 flex gap-1 px-4 pb-3">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="flex-1 h-1 rounded-full overflow-hidden bg-white/20"
                  >
                    <div className={`h-full bg-white rounded-full transition-all duration-300 ${i === active ? "w-full" : "w-0"}`} />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}

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
