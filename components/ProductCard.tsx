"use client";

import Link from "next/link";
import { Product, formatPrice, getWhatsAppLink, getCldUrl } from "@/lib/api";
import { MessageCircle, Monitor, Cpu, HardDrive, MemoryStick, Maximize2 } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.images?.find((i) => i.isPrimary) || product.images?.[0];
  const waLink = getWhatsAppLink(product);
  const isSold = product.status === "SOLD";

  const specs = [
    product.processor && { icon: Cpu, label: product.processor },
    product.ramGb && { icon: MemoryStick, label: `RAM ${product.ramGb}GB` },
    product.storageGb && { icon: HardDrive, label: `SSD ${product.storageGb}GB` },
    product.screenInch && { icon: Maximize2, label: `${product.screenInch}"` },
  ].filter(Boolean) as { icon: any; label: string }[];

  return (
    <div className={`group relative bg-[#16181f] rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col ${isSold ? "opacity-50" : ""}`}>

      {/* Gambar */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] bg-[#0f1117] overflow-hidden">
        {primaryImage ? (
          <img
            src={getCldUrl(primaryImage.url, "w_600,h_450,c_fill,f_auto,q_auto")}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Monitor size={48} className="text-gray-700" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#16181f]/80 via-transparent to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-bold bg-white/10 backdrop-blur-sm text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            ✓ {product.condition}
          </span>
        </div>

        {isSold && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-sm font-black text-white bg-red-500/80 backdrop-blur-sm px-4 py-1.5 rounded-full">
              TERJUAL
            </span>
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        {/* Brand */}
        <span className="text-[10px] font-bold tracking-widest text-blue-400/70 uppercase mb-1.5">
          {product.brand}
        </span>

        {/* Nama */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-white hover:text-blue-300 transition-colors line-clamp-2 mb-4 leading-snug text-sm">
            {product.name}
          </h3>
        </Link>

        {/* Specs dengan icon */}
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {specs.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-white/[0.03] border border-white/5 rounded-lg px-2 py-1.5">
              <Icon size={11} className="text-blue-400/60 shrink-0" />
              <span className="text-[10px] text-gray-400 font-medium truncate">{label}</span>
            </div>
          ))}
        </div>

        {/* Harga + tombol */}
        <div className="mt-auto">
          <p className="text-xl font-black text-white mb-3">
            {formatPrice(product.price)}
          </p>

          {!isSold ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.97] text-white text-sm font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/10"
            >
              <MessageCircle size={14} />
              Tanya via WhatsApp
            </a>
          ) : (
            <div className="w-full text-center text-sm font-bold text-gray-600 py-2.5 rounded-xl border border-white/5">
              Tidak tersedia
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
