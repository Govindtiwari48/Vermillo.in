import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/ui/Footer';
import CartSidebar from '@/components/cart/CartSidebar';

export const metadata: Metadata = {
  title: 'The Artisan Collective | Wearable Art. Redefined.',
  description: 'Discover curated collections of art, apparel, and accessories. Celebrating craftsmanship and timeless design.',
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
          <Navigation />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
