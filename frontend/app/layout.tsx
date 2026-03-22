import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://refined-restaurant.com"),
  title: "REFINED | Luxury Nigerian Dining",
  description: "Experience the finest Nigerian cuisine with a refined touch. Firewood-smoked Jollof, gourmet Egusi, and more.",
  keywords: ["Nigerian Food", "Luxury Dining", "Jollof Rice", "Egusi Soup", "Lagos Restaurants"],
  authors: [{ name: "REFINED Team" }],
  openGraph: {
    title: "REFINED | Luxury Nigerian Dining",
    description: "Handcrafted flavours rooted in tradition, elevated to perfection.",
    url: "https://refined-restaurant.com",
    siteName: "REFINED",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Luxury Nigerian Dining",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REFINED | Luxury Nigerian Dining",
    description: "The finest Nigerian delicacies, delivered with elegance.",
    images: ["/images/hero.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
