import { getProducts } from "@/lib/api";
import Link from "next/link";
import { Laptop, Shield, Wrench, Star } from "lucide-react";
import CatalogClient from "@/components/CatalogClient";
import HeroSection from "@/components/HeroSection";

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

      <HeroSection total={total} />

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
