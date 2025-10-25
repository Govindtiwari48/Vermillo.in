'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { useState, useRef } from 'react';
import ProductCard from '../products/ProductCard';
import { products } from '@/lib/mockData';

export default function TrendingProducts() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const trendingProducts = products.filter((p) => p.trending);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = 400;
    const newPosition =
      direction === 'left'
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

    containerRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });
    setScrollPosition(newPosition);
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-8 md:gap-0"
        >
          <div className="flex-1">
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <TrendingUp className="text-terracotta" size={20} />
              </div>
              <span className="text-sm text-terracotta font-semibold tracking-[0.25em] uppercase">
                What's Hot
              </span>
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl serif font-semibold text-charcoal mb-6 md:mb-8">
              Trending Now
            </h2>
            <p className="text-charcoal/65 text-base md:text-lg max-w-2xl leading-relaxed font-light">
              Discover what's capturing hearts this season — our most coveted pieces
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('left')}
              className="w-14 h-14 flex items-center justify-center bg-cream text-charcoal rounded-full shadow-md hover:bg-terracotta hover:text-cream transition-all duration-300 border border-soft-beige"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('right')}
              className="w-14 h-14 flex items-center justify-center bg-terracotta text-cream rounded-full shadow-lg hover:bg-rust transition-all duration-300"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </motion.button>
          </div>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <motion.div
          ref={containerRef}
          className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide -mx-8 px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex-shrink-0 w-[340px]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
