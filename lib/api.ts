const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.meureno.com/api";

export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  model: string | null;
  processor: string | null;
  ramGb: number | null;
  storageGb: number | null;
  screenInch: string | null;
  condition: string;
  price: string;
  warranty: string;
  description: string | null;
  status: string;
  createdAt: string;
  images: ProductImage[];
}

export interface ProductImage {
  id: number;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

export async function getProducts(params?: {
  brand?: string;
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> {
  const query = new URLSearchParams();
  if (params?.brand) query.set("brand", params.brand);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  const res = await fetch(`${API_BASE}/store/products?${query}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Gagal mengambil produk");
  return res.json();
}

export async function getProduct(slug: string): Promise<Product> {
  const res = await fetch(`${API_BASE}/store/products/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Produk tidak ditemukan");
  return res.json();
}

export function formatPrice(price: string | number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(price));
}

export function getWhatsAppLink(product: Product): string {
  const phone = "628984125987";
  const text = encodeURIComponent(
    `Halo, saya tertarik dengan ${product.name} seharga ${formatPrice(product.price)}. Apakah masih tersedia?`
  );
  return `https://wa.me/${phone}?text=${text}`;
}
