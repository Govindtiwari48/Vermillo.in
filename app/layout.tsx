import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import ClientLayout from '@/components/ui/ClientLayout';

// Configure Google Fonts with Next.js optimization
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vermillo | Wearable Art Defined',
  description: 'Discover curated collections of art, apparel, and accessories. Celebrating craftsmanship, timeless design, and contemporary elegance.',
  keywords: 'art, fashion, accessories, craftsmanship, design, luxury, contemporary, elegance',
  authors: [{ name: 'Vermillo' }],
  openGraph: {
    title: 'Vermillo | Wearable Art Defined',
    description: 'Discover curated collections of art, apparel, and accessories. Celebrating craftsmanship, timeless design, and contemporary elegance.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <ClientLayout>
            <Navigation />
            <main>{children}</main>
            <Footer />
            <CartSidebar />
          </ClientLayout>
        </CartProvider>
      </body>
    </html>
  );
}
