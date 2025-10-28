'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { products } from '@/lib/mockData';

export default function TrendingProducts() {
  const trendingProducts = products.filter((p) => p.trending);

  // Duplicate products for seamless marquee effect
  const duplicatedProducts = [...trendingProducts, ...trendingProducts];

  // Calculate total width for seamless loop (width + gap)
  const itemWidth = 280; // w-[280px]
  const gap = 32; // gap-8 = 2rem = 32px
  const itemTotalWidth = itemWidth + gap;

  return (
    <section className="bg-gradient-light relative overflow-hidden mb-[1cm]">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl"></div>

      <div className="mx-auto relative z-10" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
        <div className="text-center" style={{ paddingTop: '28px', paddingBottom: '28px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-black uppercase tracking-[0.2em] !font-sans leading-tight"
            style={{ fontSize: '1.125rem', fontWeight: 800 }}
          >
            TRENDING NOW
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center mb-12 md:mb-16"
        >
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
              <TrendingUp className="text-terracotta" size={20} />
            </div>
            <span className="text-sm font-semibold tracking-[0.25em] uppercase">
              What's <span style={{ color: '#ff6347' }}>Hot</span>
            </span>
          </motion.div>
          <p className="text-charcoal/65 text-base md:text-lg max-w-2xl leading-relaxed font-light text-center">
            Discover what's capturing hearts this season — our most coveted pieces
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden py-8">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -(itemTotalWidth * trendingProducts.length)]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60, // Slow speed - 60 seconds for one complete cycle
                ease: "linear",
              },
            }}
          >
            {duplicatedProducts.map((product, index) => (
              <motion.div
                key={`${product.id}-${index}`}
                className="flex-shrink-0 w-[280px] h-[350px] relative overflow-hidden rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
