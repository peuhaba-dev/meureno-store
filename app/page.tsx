import { getProducts } from "@/lib/api";
import Link from "next/link";
import { Laptop, MessageCircle, Shield, Star } from "lucide-react";
import CatalogClient from "@/components/CatalogClient";
import HeroSection from "@/components/HeroSection";

export const revalidate = 60;

export default async function HomePage() {
  const { products, total } = await getProducts({ limit: 100 });

  return (
    <main className="min-h-screen bg-[#0f1117]">
      {/* Header */}
      <header className="bg-[#0f1117]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-blue-600 group-hover:bg-blue-500 transition-colors rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
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

      <HeroSection total={total} />

      <CatalogClient products={products} total={total} />

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0a0c12] py-12 mt-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Laptop className="text-white" size={18} />
              </div>
              <div>
                <p className="font-black text-white text-sm tracking-tight">Meureno Tech Store</p>
                <p className="text-xs text-gray-500 mt-0.5">Banda Aceh, Aceh</p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { icon: Shield, text: "Garansi SSD 1 Tahun" },
                { icon: Star, text: "Grade A Certified" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded-lg px-3 py-1.5">
                  <Icon size={12} className="text-blue-400" />
                  <span className="text-xs text-gray-400 font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Kontak */}
            <div className="text-center md:text-right space-y-2">
              <a
                href="https://wa.me/628984125987"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-end gap-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              >
                <MessageCircle size={15} />
                <span className="text-sm">0898-4125-987</span>
              </a>
              <p className="text-xs text-gray-600">© 2025 Meureno Tech Store</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
