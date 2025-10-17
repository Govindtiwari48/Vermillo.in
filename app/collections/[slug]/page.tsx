'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { products } from '@/lib/mockData';
import { Product } from '@/lib/types';

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Get collection name from slug
  const collectionTitle = useMemo(() => {
    if (params.slug === 'all') return 'All Collections';
    if (params.slug === 'sculpture-garden') return 'The Sculpture Garden';
    if (params.slug === 'canvas-collection') return 'The Canvas Collection';
    if (params.slug === 'urban-minimalist') return 'Urban Minimalist';
    if (params.slug === 'artisan-accessories') return 'Artisan Accessories';
    return params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  }, [params.slug]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all' && params.slug !== 'all') {
      filtered = filtered.filter((p) => p.category === params.slug);
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy, priceRange, params.slug]);

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="bg-beige py-16">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl serif font-bold text-charcoal mb-4">
              {collectionTitle}
            </h1>
            <p className="text-charcoal/60 text-lg max-w-2xl mx-auto">
              Explore our carefully curated selection of {filteredProducts.length} pieces
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-12">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="sticky top-28 space-y-8">
              <div>
                <h3 className="font-semibold text-charcoal mb-4">Category</h3>
                <div className="space-y-2">
                  {['all', 'art', 'clothing', 'accessories'].map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-charcoal/80 capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-charcoal mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-charcoal/20 rounded-md bg-white"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              <div>
                <h3 className="font-semibold text-charcoal mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-charcoal/60">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-charcoal/20 rounded-md"
              >
                <SlidersHorizontal size={20} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-charcoal/60 text-lg">No products found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

