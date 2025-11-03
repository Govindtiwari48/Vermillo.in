'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Truck,
  RotateCcw,
  Shield,
  Heart,
  Share2,
  ShoppingBag,
  Minus,
  Plus
} from 'lucide-react';
import { products } from '@/lib/mockData';
import { customizedCategories } from '@/lib/customizedCollections';
import { useCart } from '@/lib/cartContext';
import { useWishlist } from '@/lib/wishlistContext';
import { Product } from '@/lib/types';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/products/ProductCard';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Find product - either from mockData or dynamically generated from categories
  const product = useMemo(() => {
    // First, try to find in the products array
    let foundProduct = products.find((p) => p.id === params.id);
    
    if (foundProduct) {
      return foundProduct;
    }

    // If not found, check if it's a dynamically generated item from category pages
    // Format: categoryId-index (e.g., "tode-bag-0", "painting-3", "bag-0")
    const idParts = params.id.split('-');
    if (idParts.length >= 2) {
      // Try to find category by matching different parts of the ID
      // Handle cases like "tode-bag-0" where categoryId is "tode-bag"
      // Also handle "bag-0" by checking both id and slug
      let category: typeof customizedCategories[0] | undefined;
      let index: number | undefined;

      // Try full match first (e.g., "tode-bag-0" -> category "tode-bag")
      for (let i = idParts.length - 1; i >= 1; i--) {
        const potentialCategoryId = idParts.slice(0, i).join('-');
        const potentialIndex = parseInt(idParts.slice(i).join('-'));
        
        if (!isNaN(potentialIndex)) {
          // Try matching by id first
          category = customizedCategories.find((cat) => cat.id === potentialCategoryId);
          // If not found and it's a single word like "bag", try matching by slug or by category type
          if (!category && i === 1) {
            // Handle case where categoryId might be just "bag" instead of "tode-bag"
            if (potentialCategoryId === 'bag') {
              category = customizedCategories.find((cat) => cat.id === 'tode-bag');
            }
          }
          
          if (category && category.images[potentialIndex]) {
            index = potentialIndex;
            break;
          }
        }
      }

      if (category && index !== undefined && category.images[index]) {
        const image = category.images[index];
        const fileName = image.split('/').pop()?.split('.')[0] || `Item ${index + 1}`;
        const displayName = fileName
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Map category id to Product category type
        let categoryType: 'painting' | 'sketch' | 'bag' | 'shoe' | 'art-wear' = 'bag';
        if (category.id === 'painting') categoryType = 'painting';
        else if (category.id === 'sketch') categoryType = 'sketch';
        else if (category.id === 'tode-bag') categoryType = 'bag';
        else if (category.id === 'leather-shoe') categoryType = 'shoe';
        else if (category.id === 'art-wear') categoryType = 'art-wear';

        // Generate price based on category and index for consistency
        const basePrices: Record<string, number> = {
          'painting': 350,
          'sketch': 225,
          'bag': 470,
          'shoe': 420,
          'art-wear': 368
        };
        const price = (basePrices[categoryType] || 300) + (index * 25);

        // Create product object
        const dynamicProduct: Product = {
          id: params.id,
          name: displayName,
          price: price,
          description: `Handcrafted ${displayName} from our ${category.name} collection. Each piece is individually created by skilled artisans, showcasing unique artistic expression and exceptional craftsmanship. This one-of-a-kind item represents the perfect blend of artistic vision and functional design, making it a distinctive addition to any collection.`,
          category: categoryType,
          images: [image],
          inStock: true,
        };

        return dynamicProduct;
      }
    }

    return null;
  }, [params.id]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string>('description');
  const [addedToCart, setAddedToCart] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen pt-6 md:pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl serif font-semibold text-charcoal mb-4">Product not found</p>
          <Link href="/collections" className="text-sage hover:text-terracotta underline">
            Browse Collections
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if ((product.sizes && product.sizes.length > 0 && !selectedSize) || 
        (product.colors && product.colors.length > 0 && !selectedColor)) {
      return;
    }
    addToCart(product, quantity, selectedSize || undefined, selectedColor || undefined);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
    } else {
      addToWishlist(product);
      setIsWishlisted(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Get recommended products from the same category
  const recommendedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  const formatCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'painting': 'Original Painting',
      'sketch': 'Hand-Drawn Sketch',
      'bag': 'Handcrafted Bag',
      'shoe': 'Premium Footwear',
      'art-wear': 'Artistic Wear'
    };
    return categoryMap[category] || category;
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const openFullscreen = (index: number) => {
    setFullscreenImageIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const nextFullscreenImage = () => {
    setFullscreenImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevFullscreenImage = () => {
    setFullscreenImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <>
      <div className="min-h-screen pb-16 bg-gradient-light">
        {/* Breadcrumb */}
        <div className="container mx-auto pt-6 md:pt-8 px-4 md:px-8">
          <nav className="text-sm text-charcoal/60 mb-6">
            <Link href="/" className="hover:text-charcoal">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/collections" className="hover:text-charcoal">Collections</Link>
            <span className="mx-2">/</span>
            <Link 
              href={`/collections/customized/${product.category}`} 
              className="hover:text-charcoal capitalize"
            >
              {formatCategory(product.category)}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
            {/* Left: Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-warm-white rounded-lg overflow-hidden group">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover cursor-pointer"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    onClick={() => openFullscreen(selectedImage)}
                  />
                </motion.div>

                {/* Navigation Arrows - Only show if multiple images */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={20} className="text-charcoal" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                      aria-label="Next image"
                    >
                      <ChevronRight size={20} className="text-charcoal" />
                    </button>
                  </>
                )}

                {/* Fullscreen Button */}
                {product.images.length > 1 && (
                  <button
                    onClick={() => openFullscreen(selectedImage)}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                    aria-label="View fullscreen"
                  >
                    <ChevronRight size={20} className="text-charcoal rotate-45" />
                  </button>
                )}

                {/* Image Counter */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium text-charcoal opacity-0 group-hover:opacity-100 transition-opacity">
                    {selectedImage + 1} / {product.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square bg-warm-white rounded-md overflow-hidden transition-all ${
                        selectedImage === index 
                          ? 'ring-2 ring-terracotta scale-105' 
                          : 'opacity-70 hover:opacity-100 hover:scale-105'
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
              )}
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6 lg:pt-8">
              {/* Category & Status Badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs uppercase tracking-wider text-charcoal/50 font-semibold">
                  {formatCategory(product.category)}
                </span>
                {product.featured && (
                  <span className="px-3 py-1 bg-gold text-deep-charcoal text-xs rounded-full font-medium">
                    Featured
                  </span>
                )}
                {product.trending && (
                  <span className="px-3 py-1 bg-terracotta text-cream text-xs rounded-full font-medium">
                    Trending
                  </span>
                )}
                {!product.inStock && (
                  <span className="px-3 py-1 bg-charcoal text-cream text-xs rounded-full font-medium">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Product Title */}
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl serif font-bold text-charcoal mb-4 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-4">
                  <p className="text-3xl md:text-4xl font-bold text-charcoal">${product.price}</p>
                  {product.material && (
                    <span className="text-sm text-charcoal/50">{product.material}</span>
                  )}
                </div>
              </div>

              {/* Description Preview */}
              <div className="prose prose-sm max-w-none">
                <p className="text-charcoal/70 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-3">
                    Size {selectedSize && <span className="text-terracotta">({selectedSize})</span>}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border-2 rounded-md transition-all font-medium min-w-[60px] ${
                          selectedSize === size
                            ? 'border-terracotta bg-terracotta text-cream'
                            : 'border-charcoal/20 hover:border-terracotta/50 bg-white'
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
                    Color {selectedColor && <span className="text-terracotta">({selectedColor})</span>}
                  </label>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === color.name
                            ? 'border-terracotta scale-110 shadow-lg'
                            : 'border-charcoal/20 hover:scale-110'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {selectedColor === color.name && (
                          <Check size={20} className="text-white drop-shadow-lg" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center border-2 border-charcoal/20 rounded-md hover:border-terracotta hover:bg-terracotta/5 transition-all"
                    disabled={quantity === 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-xl font-semibold text-charcoal w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center border-2 border-charcoal/20 rounded-md hover:border-terracotta hover:bg-terracotta/5 transition-all"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
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
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag size={20} />
                        {product.inStock ? 'Add to Bag' : 'Out of Stock'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>

                <div className="flex gap-3">
                  <button
                    onClick={handleWishlistToggle}
                    className={`flex-1 px-6 py-3 border-2 rounded-md transition-all font-medium flex items-center justify-center gap-2 ${
                      isInWishlist(product.id)
                        ? 'border-terracotta bg-terracotta text-cream'
                        : 'border-charcoal/20 hover:border-terracotta/50 bg-white'
                    }`}
                  >
                    <Heart 
                      size={20} 
                      fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                    />
                    {isInWishlist(product.id) ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 px-6 py-3 border-2 border-charcoal/20 rounded-md hover:border-terracotta/50 bg-white transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <Share2 size={20} />
                    Share
                  </button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-charcoal/10">
                <div className="text-center">
                  <Truck size={24} className="mx-auto mb-2 text-terracotta" />
                  <p className="text-xs font-medium text-charcoal">Free Shipping</p>
                  <p className="text-xs text-charcoal/50">On orders $200+</p>
                </div>
                <div className="text-center">
                  <RotateCcw size={24} className="mx-auto mb-2 text-terracotta" />
                  <p className="text-xs font-medium text-charcoal">Easy Returns</p>
                  <p className="text-xs text-charcoal/50">30-day policy</p>
                </div>
                <div className="text-center">
                  <Shield size={24} className="mx-auto mb-2 text-terracotta" />
                  <p className="text-xs font-medium text-charcoal">Secure Payment</p>
                  <p className="text-xs text-charcoal/50">Protected checkout</p>
                </div>
              </div>

              {/* Accordion Sections */}
              <div className="space-y-2 pt-6 border-t border-charcoal/10">
                {/* Description */}
                <div className="border-b border-charcoal/5 pb-4">
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === 'description' ? '' : 'description')
                    }
                    className="w-full flex items-center justify-between text-left py-2"
                  >
                    <span className="font-semibold text-charcoal">Product Description</span>
                    {expandedSection === 'description' ? (
                      <ChevronUp size={20} className="text-charcoal/50" />
                    ) : (
                      <ChevronDown size={20} className="text-charcoal/50" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'description' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 text-charcoal/70 prose prose-sm max-w-none"
                      >
                        <p className="leading-relaxed">{product.description}</p>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>Category:</strong> {formatCategory(product.category)}</p>
                          {product.material && (
                            <p><strong>Material:</strong> {product.material}</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Materials & Care */}
                <div className="border-b border-charcoal/5 pb-4">
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === 'materials' ? '' : 'materials')
                    }
                    className="w-full flex items-center justify-between text-left py-2"
                  >
                    <span className="font-semibold text-charcoal">Materials & Care</span>
                    {expandedSection === 'materials' ? (
                      <ChevronUp size={20} className="text-charcoal/50" />
                    ) : (
                      <ChevronDown size={20} className="text-charcoal/50" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'materials' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 text-charcoal/70 space-y-2 text-sm"
                      >
                        {product.material && (
                          <p><strong>Material:</strong> {product.material}</p>
                        )}
                        <p className="mt-3">
                          <strong>Care Instructions:</strong> Handle with care. For paintings and sketches, 
                          keep away from direct sunlight and moisture. For bags and shoes, professional cleaning 
                          recommended. For art-wear, gentle hand wash or dry clean only.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Shipping & Returns */}
                <div className="border-b border-charcoal/5 pb-4">
                  <button
                    onClick={() =>
                      setExpandedSection(expandedSection === 'shipping' ? '' : 'shipping')
                    }
                    className="w-full flex items-center justify-between text-left py-2"
                  >
                    <span className="font-semibold text-charcoal">Shipping & Returns</span>
                    {expandedSection === 'shipping' ? (
                      <ChevronUp size={20} className="text-charcoal/50" />
                    ) : (
                      <ChevronDown size={20} className="text-charcoal/50" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedSection === 'shipping' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 text-charcoal/70 space-y-3 text-sm"
                      >
                        <div>
                          <strong>Shipping:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Free shipping on orders over $200</li>
                            <li>Standard shipping: 5-7 business days</li>
                            <li>Express shipping: 2-3 business days</li>
                            <li>Items are carefully packaged for safe delivery</li>
                          </ul>
                        </div>
                        <div>
                          <strong>Returns:</strong>
                          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>30-day return policy for unused items</li>
                            <li>Original packaging required</li>
                            <li>Return shipping costs apply</li>
                            <li>Custom or personalized items are final sale</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* You Might Also Like */}
          {recommendedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl md:text-4xl serif font-bold text-charcoal mb-8 text-center">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeFullscreen}
          >
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              aria-label="Close fullscreen"
            >
              <X size={24} className="text-white" />
            </button>

            {product.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevFullscreenImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextFullscreenImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>
              </>
            )}

            <div className="relative w-full h-full max-w-7xl max-h-[90vh] p-8" onClick={(e) => e.stopPropagation()}>
              <Image
                src={product.images[fullscreenImageIndex]}
                alt={`${product.name} - Image ${fullscreenImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white z-10">
                {fullscreenImageIndex + 1} / {product.images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
