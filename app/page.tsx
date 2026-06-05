import { getProducts } from "@/lib/api";
import Link from "next/link";
import { Laptop, MessageCircle, Shield, Star } from "lucide-react";
import ScrollHeader from "@/components/ScrollHeader";
import CatalogClient from "@/components/CatalogClient";
import HeroSection from "@/components/HeroSection";

export const revalidate = 60;

export default async function HomePage() {
  const { products, total } = await getProducts({ limit: 100 });

  return (
    <main className="min-h-screen bg-[#0f1117]">
      <ScrollHeader />

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
    {/* Floating WA Button */}
      <a
        href="https://wa.me/628984125987"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-bold px-4 py-3 rounded-2xl shadow-2xl shadow-emerald-500/30 transition-all duration-200 group"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.553 4.122 1.522 5.858L.057 23.428a.5.5 0 0 0 .617.608l5.765-1.516A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.9 9.9 0 0 1-5.031-1.371l-.361-.214-3.741.984.999-3.648-.235-.374A9.861 9.861 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.466 0 9.9 4.434 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z"/>
        </svg>
        <span className="text-sm">Chat Sekarang</span>
      </a>
    </main>
  );
}
