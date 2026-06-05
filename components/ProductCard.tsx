import Link from "next/link";
import { Product, formatPrice, getWhatsAppLink, getCldUrl } from "@/lib/api";
import { MessageCircle, Monitor } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.images?.find((i) => i.isPrimary) || product.images?.[0];
  const waLink = getWhatsAppLink(product);
  const isSold = product.status === "SOLD";

  return (
    <div className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 flex flex-col ${isSold ? "opacity-60" : ""}`}>
      {/* Gambar */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {primaryImage ? (
          <img
            src={getCldUrl(primaryImage.url, "w_600,h_450,c_fill,f_auto,q_auto")}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Monitor size={52} className="text-gray-300" />
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[10px] font-bold bg-white/90 backdrop-blur-sm text-emerald-600 px-2.5 py-1 rounded-full shadow-sm border border-emerald-100">
            ✓ {product.condition}
          </span>
        </div>

        {isSold && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-sm font-black text-red-500 bg-white px-4 py-1.5 rounded-full border border-red-100 shadow">
              TERJUAL
            </span>
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        {/* Brand tag */}
        <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-1">
          {product.brand}
        </span>

        {/* Nama produk */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-3 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Spesifikasi chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.processor && (
            <span className="text-[11px] bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded-lg font-medium">
              {product.processor}
            </span>
          )}
          {product.ramGb && (
            <span className="text-[11px] bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded-lg font-medium">
              RAM {product.ramGb}GB
            </span>
          )}
          {product.storageGb && (
            <span className="text-[11px] bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded-lg font-medium">
              SSD {product.storageGb}GB
            </span>
          )}
          {product.screenInch && (
            <span className="text-[11px] bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded-lg font-medium">
              {product.screenInch}"
            </span>
          )}
        </div>

        {/* Harga + tombol */}
        <div className="mt-auto">
          <p className="text-2xl font-black text-gray-900 mb-3">
            {formatPrice(product.price)}
          </p>

          {!isSold ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-bold py-2.5 rounded-2xl transition-colors shadow-sm shadow-emerald-100"
            >
              <MessageCircle size={15} />
              Tanya via WhatsApp
            </a>
          ) : (
            <div className="w-full text-center text-sm font-bold text-gray-400 py-2.5 rounded-2xl border border-gray-100">
              Tidak tersedia
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
