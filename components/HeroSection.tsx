"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Star, Wrench } from "lucide-react";

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
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const count = useCountUp(total, 1200, visible);

  const particles = [
    { w: 3, h: 3, top: "15%", left: "10%", delay: "0s", dur: "4s" },
    { w: 2, h: 2, top: "25%", left: "80%", delay: "0.5s", dur: "5s" },
    { w: 4, h: 4, top: "60%", left: "5%", delay: "1s", dur: "6s" },
    { w: 2, h: 2, top: "70%", left: "90%", delay: "1.5s", dur: "4.5s" },
    { w: 3, h: 3, top: "40%", left: "70%", delay: "2s", dur: "5.5s" },
    { w: 2, h: 2, top: "80%", left: "40%", delay: "0.8s", dur: "4s" },
    { w: 3, h: 3, top: "10%", left: "55%", delay: "1.2s", dur: "6s" },
    { w: 2, h: 2, top: "50%", left: "25%", delay: "2.5s", dur: "5s" },
  ];

  return (
    <section ref={ref} className="relative bg-[#080c14] text-white overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #3b82f6, transparent)",
            top: "-20%", left: "-10%",
            animation: "orbMove1 8s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
          style={{
            background: "radial-gradient(circle, #6366f1, transparent)",
            bottom: "-10%", right: "5%",
            animation: "orbMove2 10s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-[60px]"
          style={{
            background: "radial-gradient(circle, #10b981, transparent)",
            top: "30%", right: "30%",
            animation: "orbMove3 12s ease-in-out infinite alternate",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-400 opacity-30"
          style={{
            width: p.w, height: p.h,
            top: p.top, left: p.left,
            animation: `floatUp ${p.dur} ${p.delay} ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* CSS animations */}
      <style>{`
        @keyframes orbMove1 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(60px, 40px) scale(1.15); }
        }
        @keyframes orbMove2 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-50px, -30px) scale(1.1); }
        }
        @keyframes orbMove3 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(30px, -40px) scale(1.2); }
        }
        @keyframes floatUp {
          from { transform: translateY(0px); opacity: 0.2; }
          to { transform: translateY(-20px); opacity: 0.6; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeSlideUp 0.7s ease forwards; }
        .delay-1 { animation-delay: 0.1s; opacity: 0; }
        .delay-2 { animation-delay: 0.25s; opacity: 0; }
        .delay-3 { animation-delay: 0.4s; opacity: 0; }
        .delay-4 { animation-delay: 0.55s; opacity: 0; }
      `}</style>

      <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-300 mb-8 fade-up delay-1`}>
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="tabular-nums">{count}</span> Unit Tersedia Sekarang
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight tracking-tight fade-up delay-2">
          Laptop Second
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Berkualitas Tinggi
          </span>
        </h1>

        {/* Sub */}
        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed fade-up delay-3">
          Pilihan laptop grade A terpercaya dengan garansi resmi di Banda Aceh
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 fade-up delay-4">
          {[
            { icon: Shield, color: "text-emerald-400", text: "Garansi SSD 1 Tahun" },
            { icon: Star, color: "text-yellow-400", text: "Grade A Certified" },
            { icon: Wrench, color: "text-blue-400", text: "Servis & Garansi Unit" },
          ].map(({ icon: Icon, color, text }) => (
            <div key={text} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5">
              <Icon size={15} className={color} />
              <span className="text-slate-200 text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
