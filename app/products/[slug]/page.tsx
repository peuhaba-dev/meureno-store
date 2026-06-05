import { getProduct, formatPrice, getWhatsAppLink } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, ArrowLeft, Shield, HardDrive, Monitor, Cpu, Battery, Tag } from "lucide-react";
import ImageGallery from "@/components/ImageGallery";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    const primaryImage = product.images?.find((i: { isPrimary: boolean }) => i.isPrimary) || product.images?.[0];
    return {
      title: product.name,
      description: `${product.name} — ${product.processor || ""} RAM ${product.ramGb}GB SSD ${product.storageGb}GB. Harga: ${formatPrice(product.price)}. Laptop bekas berkualitas di Meureno Tech Store.`,
      openGraph: {
        title: product.name,
        description: `Beli ${product.name} harga terjangkau di Meureno Tech Store Aceh.`,
        images: primaryImage ? [{ url: primaryImage.url }] : [],
        type: "website",
      },
    };
  } catch {
    return { title: "Produk tidak ditemukan" };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let product;
  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  const waLink = getWhatsAppLink(product);
  const isAvailable = product.status === "AVAILABLE";

  const specs = [
    product.processor && { icon: "cpu", label: "Prosesor", value: product.processor },
    product.ramGb && { icon: "monitor", label: "RAM", value: `${product.ramGb} GB` },
    product.storageGb && { icon: "hdd", label: "Storage", value: `SSD ${product.storageGb} GB` },
    product.screenInch && { icon: "screen", label: "Layar", value: `${product.screenInch} inch` },
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#0f1117]">
      {/* Header */}
      <header className="bg-[#0f1117]/90 backdrop-blur border-b border-white/5 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Kembali</span>
          </Link>
          <span className="text-sm font-bold text-white tracking-wide">Meureno Tech Store</span>
          <div className="w-20" />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">

        {/* Main card */}
        <div className="bg-[#16181f] rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          <div className="md:grid md:grid-cols-2">

            {/* Gambar — dark bg */}
            <div className="bg-[#0f1117]">
              <ImageGallery images={product.images || []} productName={product.name} />
            </div>

            {/* Info */}
            <div className="p-6 md:p-8 flex flex-col gap-6">

              {/* Badge + nama */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    isAvailable
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}>
                    {isAvailable ? "● Tersedia" : "● Terjual"}
                  </span>
                  <span className="text-xs text-gray-500 border border-white/5 px-2.5 py-1 rounded-full">
                    {product.condition}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* Harga */}
              <div className="border-t border-b border-white/5 py-4">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-widest">Harga</p>
                <p className="text-3xl md:text-4xl font-extrabold text-white">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Spesifikasi grid */}
              {specs.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {specs.map((spec: any, i) => (
                    <div key={i} className="bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-white/5 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">{spec.label}</p>
                      <p className="text-sm font-semibold text-white leading-tight">{spec.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Garansi */}
              <div className="flex items-start gap-3 bg-blue-500/5 border border-blue-500/10 rounded-xl p-3.5">
                <Shield size={15} className="text-blue-400 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-300 leading-relaxed">{product.warranty}</p>
              </div>

              {/* CTA */}
              <div className="mt-auto">
                {isAvailable ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all text-base shadow-lg shadow-emerald-500/20"
                  >
                    <MessageCircle size={20} />
                    Hubungi via WhatsApp
                  </a>
                ) : (
                  <div className="w-full text-center bg-white/5 text-gray-500 font-semibold py-4 rounded-2xl border border-white/5">
                    Produk Sudah Terjual
                  </div>
                )}
                <p className="text-center text-xs text-gray-600 mt-3">
                  Respon cepat · Harga nego · Bergaransi
                </p>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          {product.description && (
            <div className="border-t border-white/5 px-6 md:px-8 py-6">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Deskripsi</h2>
              <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">{product.description}</p>
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-300 transition-colors">
            ← Lihat semua laptop
          </Link>
        </div>

      </div>
    </main>
  );
}
