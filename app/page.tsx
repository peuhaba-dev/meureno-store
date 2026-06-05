import { getProducts } from "@/lib/api";
import Link from "next/link";
import { Laptop, Shield, Wrench, Star } from "lucide-react";
import CatalogClient from "@/components/CatalogClient";

export const revalidate = 60;

export default async function HomePage() {
  const { products, total } = await getProducts({ limit: 100 });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <Laptop className="text-white" size={16} />
            </div>
            <div>
              <span className="font-black text-gray-900 text-sm">Meureno Tech Store</span>
              <span className="hidden sm:inline text-xs text-gray-400 ml-2">Laptop Bekas Terpercaya</span>
            </div>
          </Link>
          <a
            href="https://wa.me/628984125987"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-1.5 shadow-sm shadow-emerald-100"
          >
            <span className="text-base">💬</span>
            <span>Hubungi Kami</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "40px 40px"}}>
        </div>
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

        <div className="relative max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-200 mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            {total} Unit Tersedia Sekarang
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Laptop Second<br />
            <span className="text-blue-400">Berkualitas Tinggi</span>
          </h1>
          <p className="text-slate-300 text-lg mb-8 max-w-md mx-auto">
            Pilihan laptop grade A terpercaya dengan garansi resmi di Banda Aceh
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Shield size={16} className="text-emerald-400" />
              <span className="text-slate-200 font-medium">Garansi SSD 1 Tahun</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Star size={16} className="text-yellow-400" />
              <span className="text-slate-200 font-medium">Grade A Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <Wrench size={16} className="text-blue-400" />
              <span className="text-slate-200 font-medium">Servis & Garansi Unit</span>
            </div>
          </div>
        </div>
      </section>

      {/* Katalog */}
      <CatalogClient products={products} total={total} />

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-10 mt-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                <Laptop className="text-white" size={16} />
              </div>
              <div>
                <p className="font-black text-gray-900 text-sm">Meureno Tech Store</p>
                <p className="text-xs text-gray-400">Banda Aceh, Aceh</p>
              </div>
            </div>
            <div className="text-center md:text-right text-xs text-gray-400 space-y-1">
              <p>📱 WA: <a href="https://wa.me/628984125987" className="text-blue-500 font-medium">0898-4125-987</a></p>
              <p>Garansi unit 1 bulan · SSD 1 tahun · Grade A</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
