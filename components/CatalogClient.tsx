"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import { Laptop, ArrowUpDown, ChevronDown } from "lucide-react";
import type { Product } from "@/lib/api";

type SortOption = "terbaru" | "harga-asc" | "harga-desc";
const MOBILE_INITIAL = 6;
const MOBILE_LOAD_MORE = 6;

export default function CatalogClient({ products, total }: { products: Product[]; total: number }) {
  const [activeBrand, setActiveBrand] = useState("Semua");
  const [sort, setSort] = useState<SortOption>("terbaru");
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(MOBILE_INITIAL);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reset visible count saat filter/sort berubah
  useEffect(() => {
    setVisibleCount(MOBILE_INITIAL);
  }, [activeBrand, sort]);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => { counts[p.brand] = (counts[p.brand] || 0) + 1; });
    return counts;
  }, [products]);

  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand));
    return ["Semua", ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    let list = activeBrand === "Semua" ? products : products.filter((p) => p.brand === activeBrand);
    if (sort === "harga-asc") list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    else if (sort === "harga-desc") list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    else list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  }, [products, activeBrand, sort]);

  const displayed = isMobile ? filtered.slice(0, visibleCount) : filtered;
  const hasMore = isMobile && visibleCount < filtered.length;

  const sortLabels: Record<SortOption, string> = {
    "terbaru": "Terbaru",
    "harga-asc": "Harga Terendah",
    "harga-desc": "Harga Tertinggi",
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-white">Stok Laptop</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {activeBrand === "Semua" ? `${total} unit tersedia` : `${filtered.length} unit ${activeBrand}`}
          </p>
        </div>

        {/* Sort */}
        <div className="relative">
          <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1">
            <ArrowUpDown size={11} />
            <span>Urutkan</span>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="appearance-none bg-[#16181f] border border-white/10 rounded-xl px-3 py-2 pr-8 text-sm font-semibold text-gray-300 cursor-pointer hover:border-blue-500/40 focus:outline-none focus:border-blue-500/60 transition-colors"
          >
            {(Object.keys(sortLabels) as SortOption[]).map((key) => (
              <option key={key} value={key}>{sortLabels[key]}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-2.5 bottom-2.5 text-gray-500 text-xs">▾</div>
        </div>
      </div>

      {/* Filter Brand */}
      <div className="flex flex-wrap gap-2 mb-8">
        {brands.map((brand) => {
          const count = brand === "Semua" ? products.length : (brandCounts[brand] || 0);
          return (
            <button
              key={brand}
              onClick={() => setActiveBrand(brand)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-bold border transition-all duration-200 ${
                activeBrand === brand
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                  : "bg-white/5 text-gray-400 border-white/10 hover:border-blue-500/30 hover:text-blue-300"
              }`}
            >
              {brand}
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                activeBrand === brand ? "bg-white/20 text-white" : "bg-white/5 text-gray-500"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {!mounted ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <Laptop size={48} className="mx-auto mb-4 text-gray-700" />
          <p className="text-gray-500">Tidak ada produk untuk brand ini.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More — mobile only */}
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setVisibleCount(v => v + MOBILE_LOAD_MORE)}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-200 active:scale-[0.97]"
              >
                <ChevronDown size={16} />
                Lihat Lebih Banyak
                <span className="text-xs text-gray-500">({filtered.length - visibleCount} lagi)</span>
              </button>
            </div>
          )}

          {/* Semua sudah tampil — mobile */}
          {isMobile && !hasMore && filtered.length > MOBILE_INITIAL && (
            <p className="text-center text-xs text-gray-600 mt-6">Semua {filtered.length} laptop sudah ditampilkan</p>
          )}
        </>
      )}
    </section>
  );
}
