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
      {/* Header katalog */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">Stok Laptop</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {activeBrand === "Semua" ? `${total} unit tersedia` : `${filtered.length} unit ${activeBrand}`}
          </p>
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

      {filtered.length === 0 ? (
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
