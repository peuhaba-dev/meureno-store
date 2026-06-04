import { MetadataRoute } from "next";

export const revalidate = 3600; // refresh tiap 1 jam

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://store.meureno.com";

  // Halaman statis
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  ];

  // Halaman produk dinamis
  try {
    const res = await fetch(`https://api.meureno.com/api/store/products?limit=200`, {
      next: { revalidate: 3600 },
    });
    const { products } = await res.json();

    const productPages: MetadataRoute.Sitemap = products.map(
      (p: { slug: string; updatedAt: string }) => ({
        url: `${base}/products/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })
    );

    return [...staticPages, ...productPages];
  } catch {
    return staticPages;
  }
}
