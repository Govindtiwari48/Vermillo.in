'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className="py-24 bg-beige">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl md:text-5xl serif font-bold text-charcoal mb-4">
              Trending Now
            </h2>
            <p className="text-charcoal/60">
              Discover what's capturing hearts this season
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 flex items-center justify-center bg-white text-charcoal rounded-full shadow-lg hover:bg-sage hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 flex items-center justify-center bg-white text-charcoal rounded-full shadow-lg hover:bg-sage hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-80"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

