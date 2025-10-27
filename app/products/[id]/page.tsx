'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { products } from '@/lib/mockData';
import { useCart } from '@/lib/cartContext';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/products/ProductCard';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string>('description');
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-2xl text-charcoal">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const recommendedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-light">
      <div className="mx-auto" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                style={
                  isZooming
                    ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      transform: 'scale(2)',
                    }
                    : {}
                }
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-gray-100 rounded-md overflow-hidden ${selectedImage === index ? 'ring-2 ring-sage' : ''
                    }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl serif font-bold text-charcoal mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-charcoal">${product.price}</p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-3">
                  Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 rounded-md transition-all ${selectedSize === size
                        ? 'border-sage bg-sage text-white'
                        : 'border-charcoal/20 hover:border-sage'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-3">
                  Color: {selectedColor || 'Select a color'}
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === color.name
                        ? 'border-sage scale-110'
                        : 'border-charcoal/20 hover:scale-110'
                        }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-charcoal/20 rounded-md hover:border-sage"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-charcoal w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border-2 border-charcoal/20 rounded-md hover:border-sage"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock || addedToCart}
              className="w-full"
              size="lg"
            >
              <AnimatePresence mode="wait">
                {addedToCart ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={20} /> Added to Cart
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {product.inStock ? 'Add to Bag' : 'Out of Stock'}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            {/* Accordion Sections */}
            <div className="space-y-4 pt-6 border-t">
              {/* Description */}
              <div className="border-b pb-4">
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === 'description' ? '' : 'description')
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-charcoal">Description</span>
                  {expandedSection === 'description' ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSection === 'description' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 text-charcoal/70"
                    >
                      <p>{product.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Materials & Care */}
              <div className="border-b pb-4">
                <button
                  onClick={() =>
                    setExpandedSection(expandedSection === 'materials' ? '' : 'materials')
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-charcoal">Materials & Care</span>
                  {expandedSection === 'materials' ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSection === 'materials' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 text-charcoal/70"
                    >
                      <p>Material: {product.material}</p>
                      <p className="mt-2">
                        Handle with care. Professional cleaning recommended.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* You Might Also Like */}
        {recommendedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl serif font-bold text-charcoal mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

