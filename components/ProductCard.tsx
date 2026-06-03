import Link from "next/link";
import { Product, formatPrice, getWhatsAppLink } from "@/lib/api";
import { MessageCircle, HardDrive, MemoryStick, Monitor } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const primaryImage = product.images?.find((i) => i.isPrimary) || product.images?.[0];
  const waLink = getWhatsAppLink(product);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Gambar */}
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
          {primaryImage ? (
            <img
              src={primaryImage.url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <Monitor size={48} />
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {/* Badge kondisi */}
        <span className="inline-block text-xs font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full mb-2">
          {product.condition}
        </span>

        {/* Nama produk */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-3">
            {product.name}
          </h3>
        </Link>

        {/* Spesifikasi singkat */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.processor && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
              {product.processor}
            </span>
          )}
          {product.ramGb && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg flex items-center gap-1">
              <MemoryStick size={10} /> {product.ramGb}GB
            </span>
          )}
          {product.storageGb && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg flex items-center gap-1">
              <HardDrive size={10} /> {product.storageGb}GB SSD
            </span>
          )}
        </div>

        {/* Harga */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          {product.status === "SOLD" && (
            <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-1 rounded-full">
              Terjual
            </span>
          )}
        </div>

        {/* Tombol WA */}
        {product.status === "AVAILABLE" && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
          >
            <MessageCircle size={16} />
            Tanya via WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
