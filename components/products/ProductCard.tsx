'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/cartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        className="group relative overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImage(0);
        }}
        whileHover={{ y: -8 }}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-beige">
          <Image
            src={product.images[currentImage]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Secondary Image on Hover */}
          {product.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
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

          {/* Quick Add Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            onClick={handleQuickAdd}
            className="absolute bottom-4 right-4 bg-white text-charcoal p-3 rounded-full shadow-lg hover:bg-sage hover:text-white transition-colors"
            aria-label="Quick add to bag"
          >
            <ShoppingBag size={20} />
          </motion.button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.trending && (
              <span className="bg-sienna text-white text-xs px-3 py-1 rounded-full">
                Trending
              </span>
            )}
            {!product.inStock && (
              <span className="bg-charcoal text-white text-xs px-3 py-1 rounded-full">
                Sold Out
              </span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-charcoal mb-1 group-hover:text-sage transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-charcoal/60 mb-2">{product.category}</p>
          <p className="text-lg font-semibold text-charcoal">${product.price}</p>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-2 mt-3">
              {product.colors.map((color) => (
                <div
                  key={color.name}
                  className="w-5 h-5 rounded-full border-2 border-charcoal/20"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

