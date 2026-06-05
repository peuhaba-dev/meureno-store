"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import { Laptop, ArrowUpDown } from "lucide-react";
import type { Product } from "@/lib/api";

type SortOption = "terbaru" | "harga-asc" | "harga-desc";

export default function CatalogClient({ products, total }: { products: Product[]; total: number }) {
  const [activeBrand, setActiveBrand] = useState("Semua");
  const [sort, setSort] = useState<SortOption>("terbaru");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const sortLabels: Record<SortOption, string> = {
    "terbaru": "Terbaru",
    "harga-asc": "Harga Terendah",
    "harga-desc": "Harga Tertinggi",
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      {/* Header katalog */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Stok Laptop</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {activeBrand === "Semua" ? `${total} unit tersedia` : `${filtered.length} unit ${activeBrand}`}
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
            <ArrowUpDown size={12} />
            <span>Urutkan</span>
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 pr-8 text-sm font-semibold text-gray-700 cursor-pointer hover:border-blue-300 focus:outline-none focus:border-blue-500 transition-colors"
          >
            {(Object.keys(sortLabels) as SortOption[]).map((key) => (
              <option key={key} value={key}>{sortLabels[key]}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-2.5 bottom-2.5 text-gray-400">▾</div>
        </div>
      </div>

      {/* Filter Brand */}
      <div className="flex flex-wrap gap-2 mb-8">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setActiveBrand(brand)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all duration-200 ${
              activeBrand === brand
                ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200"
                : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {!mounted ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-300">
          <Laptop size={48} className="mx-auto mb-4" />
          <p className="text-gray-400">Tidak ada produk untuk brand ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
