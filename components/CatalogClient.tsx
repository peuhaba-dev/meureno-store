"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { Laptop } from "lucide-react";
import type { Product } from "@/lib/api";

export default function CatalogClient({ products, total }: { products: Product[]; total: number }) {
  const [activeBrand, setActiveBrand] = useState("Semua");

  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand));
    return ["Semua", ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    if (activeBrand === "Semua") return products;
    return products.filter((p) => p.brand === activeBrand);
  }, [products, activeBrand]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Stok Tersedia
          <span className="ml-2 text-sm font-normal text-gray-500">({total} unit)</span>
        </h2>
      </div>

      {/* Filter Brand */}
      <div className="flex flex-wrap gap-2 mb-6">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setActiveBrand(brand)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeBrand === brand
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Laptop size={48} className="mx-auto mb-4 opacity-30" />
          <p>Tidak ada produk untuk brand ini.</p>
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
