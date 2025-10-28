'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Heart } from 'lucide-react';
import Image from 'next/image';
import { products } from '@/lib/mockData';
import { useWishlist } from '@/lib/wishlistContext';

export default function TrendingProducts() {
  const trendingProducts = products.filter((p) => p.trending);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Duplicate products for seamless marquee effect
  const duplicatedProducts = [...trendingProducts, ...trendingProducts];

  // Calculate total width for seamless loop (width + gap)
  const itemWidth = 280; // w-[280px]
  const gap = 32; // gap-8 = 2rem = 32px
  const itemTotalWidth = itemWidth + gap;

  const handleWishlistToggle = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

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
            {duplicatedProducts.map((product, index) => {
              const isWishlisted = isInWishlist(product.id);

              return (
                <motion.div
                  key={`${product.id}-${index}`}
                  className="flex-shrink-0 w-[280px] h-[350px] relative overflow-hidden rounded-lg group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="280px"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Wishlist Heart Button - Always Visible */}
                  <motion.button
                    onClick={(e) => handleWishlistToggle(product, e)}
                    className="absolute top-3 right-3 z-20 p-2 rounded-full shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: isWishlisted ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
                      border: '2px solid rgba(255, 255, 255, 0.5)',
                      backdropFilter: 'blur(10px)',
                    }}
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={false}
                    animate={{
                      backgroundColor: isWishlisted ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={{
                        scale: isWishlisted ? [1, 1.3, 1] : 1,
                        rotate: isWishlisted ? [0, 15, -15, 0] : 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      <Heart
                        size={20}
                        className={`transition-all duration-300 ${isWishlisted
                          ? 'text-red-500 fill-red-500'
                          : 'text-gray-700 hover:text-red-500'
                          }`}
                        style={{
                          filter: isWishlisted ? 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.6))' : 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
                        }}
                      />
                    </motion.div>
                  </motion.button>

                  {/* Product Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
                      <h3 className="font-semibold text-sm text-gray-900 mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-terracotta">
                          ${product.price}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
