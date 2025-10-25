import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import LoadingScreen from '@/components/ui/LoadingScreen';

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
    <html lang="en">
      <body>
        <CartProvider>
          <LoadingScreen />
          <Navigation />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
