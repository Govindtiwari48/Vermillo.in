'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cartContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show logo after hero animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 2500); // Show slightly after hero logo animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Fades in after hero animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: showLogo ? 1 : 0,
                x: showLogo ? 0 : -20
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Link href="/" className="text-3xl serif font-bold transition-colors duration-300 text-black">
                Vermillo
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link
                href="/collections/all"
                className="text-sm font-medium hover:text-terracotta transition-colors duration-300 whitespace-nowrap text-black"
              >
                Collections
              </Link>
              <Link
                href="/collections/art"
                className="text-sm font-medium hover:text-terracotta transition-colors duration-300 whitespace-nowrap text-black"
              >
                Art
              </Link>
              <Link
                href="/collections/clothing"
                className="text-sm font-medium hover:text-terracotta transition-colors duration-300 whitespace-nowrap text-black"
              >
                Clothing
              </Link>
              <Link
                href="/collections/accessories"
                className="text-sm font-medium hover:text-terracotta transition-colors duration-300 whitespace-nowrap text-black"
              >
                Accessories
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleCart}
                className="relative hover:text-sage transition-colors p-1.5 text-black"
                aria-label="Shopping cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sienna text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 text-black"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 bg-white z-40 md:hidden pt-24"
          >
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="flex flex-col space-y-6">
                <Link
                  href="/collections/all"
                  className="text-2xl serif text-charcoal hover:text-sage transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Collections
                </Link>
                <Link
                  href="/collections/art"
                  className="text-2xl serif text-charcoal hover:text-sage transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Art
                </Link>
                <Link
                  href="/collections/clothing"
                  className="text-2xl serif text-charcoal hover:text-sage transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Clothing
                </Link>
                <Link
                  href="/collections/accessories"
                  className="text-2xl serif text-charcoal hover:text-sage transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accessories
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

