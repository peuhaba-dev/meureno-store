import { getProduct, formatPrice, getWhatsAppLink } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, ArrowLeft, Shield, HardDrive, Monitor, Cpu } from "lucide-react";
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

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <span className="font-bold text-gray-900">Meureno Tech Store</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="md:flex">
            {/* Gambar */}
            <div className="md:w-1/2">
              <ImageGallery images={product.images || []} productName={product.name} />
            </div>

            {/* Info */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <span className="inline-block text-xs font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full mb-3">
                  {product.condition}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-3xl font-bold text-blue-600 mb-6">
                  {formatPrice(product.price)}
                </p>

                {/* Spesifikasi */}
                <div className="space-y-3 mb-6">
                  {product.processor && (
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Cpu size={16} className="text-gray-400" />
                      <span>{product.processor}</span>
                    </div>
                  )}
                  {product.ramGb && (
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Monitor size={16} className="text-gray-400" />
                      <span>RAM {product.ramGb} GB</span>
                    </div>
                  )}
                  {product.storageGb && (
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <HardDrive size={16} className="text-gray-400" />
                      <span>SSD {product.storageGb} GB</span>
                    </div>
                  )}
                  {product.screenInch && (
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Monitor size={16} className="text-gray-400" />
                      <span>Layar {product.screenInch} inch</span>
                    </div>
                  )}
                </div>

                {/* Garansi */}
                <div className="flex items-start gap-2 bg-blue-50 rounded-xl p-3 mb-6">
                  <Shield size={16} className="text-blue-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-700">{product.warranty}</p>
                </div>
              </div>

              {/* CTA */}
              {product.status === "AVAILABLE" ? (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
                >
                  <MessageCircle size={18} />
                  Beli / Tanya via WhatsApp
                </a>
              ) : (
                <div className="w-full text-center bg-red-50 text-red-600 font-semibold py-3 rounded-xl">
                  Sudah Terjual
                </div>
              )}
            </div>
          </div>

          {/* Deskripsi */}
          {product.description && (
            <div className="px-6 py-5 border-t border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-2">Deskripsi</h2>
              <p className="text-sm text-gray-600 whitespace-pre-line">{product.description}</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
            ← Lihat semua laptop
          </Link>
        </div>
      </div>
    </main>
  );
}
