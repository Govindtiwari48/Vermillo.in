'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        className="group relative overflow-hidden bg-warm-white rounded-xl transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImage(0);
        }}
        whileHover={{ y: -6 }}
        style={{
          boxShadow: isHovered
            ? '0 20px 40px -12px rgba(42, 41, 37, 0.15)'
            : '0 4px 6px -1px rgba(42, 41, 37, 0.06)',
        }}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-soft-beige rounded-t-xl">
          <Image
            src={product.images[currentImage]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Secondary Image on Hover */}
          {product.images.length > 1 && (
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                  onMouseEnter={() => setCurrentImage(1)}
                >
                  <Image
                    src={product.images[1]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <AnimatePresence>
              {isHovered && (
                <>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleLike}
                    className={`w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-md transition-all ${isLiked
                      ? 'bg-terracotta text-cream'
                      : 'bg-cream/90 text-charcoal hover:bg-cream'
                      }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={18}
                      strokeWidth={1.5}
                      fill={isLiked ? 'currentColor' : 'none'}
                    />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                    onClick={handleQuickAdd}
                    className="w-11 h-11 flex items-center justify-center bg-terracotta text-cream rounded-full backdrop-blur-md hover:bg-rust transition-all"
                    aria-label="Quick add to bag"
                  >
                    <ShoppingBag size={18} strokeWidth={1.5} />
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.trending && (
              <span className="bg-terracotta text-cream text-xs px-3 py-1.5 rounded-full font-medium shadow-md">
                Trending
              </span>
            )}
            {product.featured && (
              <span className="bg-gold text-deep-charcoal text-xs px-3 py-1.5 rounded-full font-medium shadow-md">
                Featured
              </span>
            )}
            {!product.inStock && (
              <span className="bg-charcoal text-cream text-xs px-3 py-1.5 rounded-full font-medium shadow-md">
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="mb-3">
            <span className="text-xs text-charcoal/50 uppercase tracking-wider font-semibold">
              {product.category}
            </span>
          </div>
          <h3 className="serif text-xl font-medium text-charcoal mb-3 group-hover:text-terracotta transition-colors leading-snug">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xl font-semibold text-charcoal">${product.price}</p>
            {product.material && (
              <span className="text-xs text-charcoal/45 font-medium">
                {product.material}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-2 mt-5">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="w-6 h-6 rounded-full border-2 border-charcoal/10 hover:border-terracotta transition-colors cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <div className="w-6 h-6 rounded-full border-2 border-charcoal/10 flex items-center justify-center text-[10px] text-charcoal/50">
                  +{product.colors.length - 4}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
