import { getProducts } from "@/lib/api";
import { Laptop } from "lucide-react";
import CatalogClient from "@/components/CatalogClient";

export const revalidate = 60;

export default async function HomePage() {
  const { products, total } = await getProducts({ limit: 20 });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Laptop className="text-blue-600" size={24} />
            <span className="font-bold text-gray-900 text-lg">Meureno Tech Store</span>
          </div>
          <a
            href="https://wa.me/628984125987"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors"
          >
            Hubungi Kami
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Laptop Second Berkualitas
          </h1>
          <p className="text-blue-100 text-lg mb-2">
            Grade A · Garansi SSD 1 Tahun · Harga Terbaik
          </p>
          <p className="text-blue-200 text-sm">Banda Aceh & sekitarnya</p>
        </div>
      </section>

      {/* Katalog */}
      <CatalogClient products={products} total={total} />

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 mt-10">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
          <p className="font-medium text-gray-700 mb-1">Meureno Tech Store</p>
          <p>Banda Aceh · WA: 0898-4125-987 · Garansi unit 1 bulan, SSD 1 tahun</p>
        </div>
      </footer>
    </main>
  );
}
