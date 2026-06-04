import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Meureno Tech Store — Laptop Bekas Berkualitas di Aceh",
    template: "%s | Meureno Tech Store",
  },
  description: "Temukan laptop bekas berkualitas dengan harga terjangkau di Meureno Tech Store. Tersedia berbagai merek: Lenovo, HP, Dell, Asus, dan lainnya.",
  metadataBase: new URL("https://store.meureno.com"),
  openGraph: {
    siteName: "Meureno Tech Store",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
