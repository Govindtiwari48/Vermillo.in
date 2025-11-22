'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Grid3x3, List, ShoppingBag, Heart, Zap } from 'lucide-react';
import { customizedCategories, allImages } from '@/lib/customizedCollections';
import { useCart } from '@/lib/cartContext';
import { useWishlist } from '@/lib/wishlistContext';
import { Product } from '@/lib/types';

export default function CustomizedCollectionPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
    const router = useRouter();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    // Filter images based on selected category
    const filteredImages = useMemo(() => {
        if (selectedCategory === 'all') {
            return allImages;
        }
        const category = customizedCategories.find((cat) => cat.id === selectedCategory);
        return category ? category.images : allImages;
    }, [selectedCategory]);

    // Generate items from images
    const items = useMemo(() => {
        return filteredImages.map((image, index) => {
            const fileName = image.split('/').pop()?.split('.')[0] || `Item ${index + 1}`;
            const displayName = fileName
                .split(/[-_]/)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            // Determine category from image path
            let categoryId: 'painting' | 'sketch' | 'bag' | 'shoe' | 'art-wear' = 'bag';
            if (image.includes('tode-bag')) categoryId = 'bag';
            else if (image.includes('painted-clothes')) categoryId = 'art-wear';
            else if (image.includes('shoe')) categoryId = 'shoe';
            else if (image.includes('painting')) categoryId = 'painting';
            else if (image.includes('sketch')) categoryId = 'sketch';

            return {
                id: `${categoryId}-${index}`,
                name: displayName,
                image: image,
                price: Math.floor(Math.random() * 400) + 100,
                category: categoryId,
            };
        });
    }, [filteredImages]);

    // Convert item to Product for cart/wishlist
    const itemToProduct = (item: typeof items[0]): Product => {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            description: `Handcrafted ${item.name} from our collection`,
            category: item.category,
            images: [item.image],
            inStock: true,
        };
    };

    const handleLike = (e: React.MouseEvent, item: typeof items[0]) => {
        e.preventDefault();
        e.stopPropagation();
        const product = itemToProduct(item);
        if (isInWishlist(item.id)) {
            removeFromWishlist(item.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (e: React.MouseEvent, item: typeof items[0]) => {
        e.preventDefault();
        e.stopPropagation();
        const product = itemToProduct(item);
        addToCart(product, 1);
    };

    const handleBuyNow = (e: React.MouseEvent, item: typeof items[0]) => {
        e.preventDefault();
        e.stopPropagation();
        const product = itemToProduct(item);
        addToCart(product, 1);
        router.push('/checkout');
    };

    return (
        <div className="min-h-screen bg-cream pb-8">
            <div className="mx-auto pt-6 md:pt-8" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    {/* Title removed as requested */}
                    <div className="w-full flex justify-center">
                        {/* <p className="text-charcoal/70 max-w-3xl mx-auto text-lg leading-relaxed mb-10 text-center">
                            Explore our handcrafted collections, each piece carefully crafted with artistic vision
                        </p> */}
                    </div>
                    {/* Spacer: same-sized container to create additional empty space */}
                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-18 md:mb-20" aria-hidden="true">
                        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm opacity-0 pointer-events-none">
                            <Grid3x3 size={20} />
                            <List size={20} />
                        </div>
                        <div className="text-charcoal/60 text-sm md:ml-6 opacity-0">0 items</div>
                    </div>
                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 sm:gap-x-12 sm:gap-y-7 md:gap-x-14 md:gap-y-8 lg:gap-x-16 lg:gap-y-10 xl:gap-y-12 mb-16">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all'
                                ? 'bg-terracotta text-cream shadow-md'
                                : 'bg-white text-charcoal hover:bg-charcoal/5 shadow-sm'
                                }`}
                        >
                            All Items ({allImages.length})
                        </button>
                        {customizedCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${selectedCategory === category.id
                                    ? 'bg-terracotta text-cream shadow-md'
                                    : 'bg-white text-charcoal hover:bg-charcoal/5 shadow-sm'
                                    }`}
                            >
                                {category.name} ({category.images.length})
                            </button>
                        ))}
                    </div>
                    {/* Spacer: same-sized container to create additional empty space */}
                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-18 md:mb-20" aria-hidden="true">
                        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm opacity-0 pointer-events-none">
                            <Grid3x3 size={20} />
                            <List size={20} />
                        </div>
                        <div className="text-charcoal/60 text-sm md:ml-6 opacity-0">0 items</div>
                    </div>
                    {/* View Mode Toggle */}
                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-18 md:mb-20">
                        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded transition-colors ${viewMode === 'grid'
                                    ? 'bg-terracotta text-cream'
                                    : 'text-charcoal/60 hover:text-terracotta'
                                    }`}
                                aria-label="Grid view"
                            >
                                <Grid3x3 size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded transition-colors ${viewMode === 'list'
                                    ? 'bg-terracotta text-cream'
                                    : 'text-charcoal/60 hover:text-terracotta'
                                    }`}
                                aria-label="List view"
                            >
                                <List size={20} />
                            </button>
                        </div>
                        <div className="text-charcoal/60 text-sm md:ml-6">
                            {items.length} {items.length === 1 ? 'item' : 'items'}
                        </div>
                    </div>

                    {/* Spacer: same-sized container to create additional empty space */}
                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-18 md:mb-20" aria-hidden="true">
                        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm opacity-0 pointer-events-none">
                            <Grid3x3 size={20} />
                            <List size={20} />
                        </div>
                        <div className="text-charcoal/60 text-sm md:ml-6 opacity-0">0 items</div>
                    </div>
                </motion.div>

                {/* Items Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 lg:gap-x-6 lg:gap-y-10 mt-12">
                        {items.map((item, index) => {
                            const isLiked = isInWishlist(item.id);
                            const isHovered = hoveredItemId === item.id;
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03, duration: 0.5 }}
                                    onMouseEnter={() => setHoveredItemId(item.id)}
                                    onMouseLeave={() => setHoveredItemId(null)}
                                >
                                    <Link href={`/products/${item.id}`}>
                                        <div className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg h-full flex flex-col">
                                            <div className="relative aspect-[5/6] overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                                
                                                {/* Action Buttons - Desktop */}
                                                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                                                    {isHovered && (
                                                        <>
                                                            <motion.button
                                                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                                                transition={{ duration: 0.2 }}
                                                                onClick={(e) => handleLike(e, item)}
                                                                className={`w-11 h-11 flex items-center justify-center rounded-full backdrop-blur-md transition-all ${
                                                                    isLiked
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
                                                                onClick={(e) => handleAddToCart(e, item)}
                                                                className="w-11 h-11 flex items-center justify-center bg-terracotta text-cream rounded-full backdrop-blur-md hover:bg-rust transition-all"
                                                                aria-label="Add to cart"
                                                            >
                                                                <ShoppingBag size={18} strokeWidth={1.5} />
                                                            </motion.button>
                                                            <motion.button
                                                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                                                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                                                transition={{ duration: 0.2, delay: 0.1 }}
                                                                onClick={(e) => handleBuyNow(e, item)}
                                                                className="w-11 h-11 flex items-center justify-center bg-sage text-cream rounded-full backdrop-blur-md hover:bg-sage/90 transition-all"
                                                                aria-label="Buy now"
                                                            >
                                                                <Zap size={18} strokeWidth={1.5} />
                                                            </motion.button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="px-2.5 pb-2.5 flex flex-col" style={{ paddingTop: '0.875rem' }}>
                                                <h3 className="font-medium text-gray-900 leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.01em', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm font-bold text-terracotta" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.01em' }}>
                                                    ${item.price}
                                                </p>
                                                
                                                {/* Action Buttons - Mobile */}
                                                <div className="flex gap-2 lg:hidden mt-2">
                                                    <button
                                                        onClick={(e) => handleLike(e, item)}
                                                        className={`flex-1 px-3 py-1.5 rounded-lg transition-all text-xs font-medium flex items-center justify-center gap-1 ${
                                                            isLiked
                                                                ? 'bg-terracotta text-cream'
                                                                : 'bg-cream text-charcoal border border-charcoal/20 hover:bg-charcoal/5'
                                                        }`}
                                                    >
                                                        <Heart size={14} strokeWidth={1.5} fill={isLiked ? 'currentColor' : 'none'} />
                                                        Like
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleAddToCart(e, item)}
                                                        className="flex-1 px-3 py-1.5 bg-terracotta text-cream rounded-lg hover:bg-rust transition-all text-xs font-medium flex items-center justify-center gap-1"
                                                    >
                                                        <ShoppingBag size={14} strokeWidth={1.5} />
                                                        Cart
                                                    </button>
                                                    <button
                                                        onClick={(e) => handleBuyNow(e, item)}
                                                        className="flex-1 px-3 py-1.5 bg-sage text-cream rounded-lg hover:bg-sage/90 transition-all text-xs font-medium flex items-center justify-center gap-1"
                                                    >
                                                        <Zap size={14} strokeWidth={1.5} />
                                                        Buy
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="space-y-6 mt-10">
                        {items.map((item, index) => {
                            const isLiked = isInWishlist(item.id);
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.02, duration: 0.5 }}
                                >
                                    <Link href={`/products/${item.id}`}>
                                        <div className="group flex gap-6 bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden">
                                            <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                    sizes="200px"
                                                />
                                            </div>
                                            <div className="flex-1 p-6 flex flex-col justify-center">
                                                <h3 className="font-medium text-gray-900 mb-2 leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.01em', fontSize: '0.8rem' }}>
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.01em' }}>
                                                    Handcrafted artisanal piece from our collection
                                                </p>
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-sm font-bold text-terracotta" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.01em' }}>
                                                        ${item.price}
                                                    </p>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={(e) => handleLike(e, item)}
                                                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                                                                isLiked
                                                                    ? 'bg-terracotta text-cream'
                                                                    : 'bg-cream text-charcoal border border-charcoal/20 hover:bg-charcoal/5'
                                                            }`}
                                                            aria-label="Add to wishlist"
                                                        >
                                                            <Heart size={18} strokeWidth={1.5} fill={isLiked ? 'currentColor' : 'none'} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleAddToCart(e, item)}
                                                            className="w-10 h-10 flex items-center justify-center bg-terracotta text-cream rounded-full hover:bg-rust transition-all"
                                                            aria-label="Add to cart"
                                                        >
                                                            <ShoppingBag size={18} strokeWidth={1.5} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => handleBuyNow(e, item)}
                                                            className="w-10 h-10 flex items-center justify-center bg-sage text-cream rounded-full hover:bg-sage/90 transition-all"
                                                            aria-label="Buy now"
                                                        >
                                                            <Zap size={18} strokeWidth={1.5} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleLike(e, item);
                                                        }}
                                                        className={`flex-1 px-4 py-2 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2 ${
                                                            isLiked
                                                                ? 'bg-terracotta text-cream'
                                                                : 'bg-cream text-charcoal border border-charcoal/20 hover:bg-charcoal/5'
                                                        }`}
                                                    >
                                                        <Heart size={16} strokeWidth={1.5} fill={isLiked ? 'currentColor' : 'none'} />
                                                        {isLiked ? 'Liked' : 'Like'}
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleAddToCart(e, item);
                                                        }}
                                                        className="flex-1 px-4 py-2 bg-terracotta text-cream rounded-lg hover:bg-rust transition-all text-sm font-medium flex items-center justify-center gap-2"
                                                    >
                                                        <ShoppingBag size={16} strokeWidth={1.5} />
                                                        Add to Cart
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleBuyNow(e, item);
                                                        }}
                                                        className="flex-1 px-4 py-2 bg-sage text-cream rounded-lg hover:bg-sage/90 transition-all text-sm font-medium flex items-center justify-center gap-2"
                                                    >
                                                        <Zap size={16} strokeWidth={1.5} />
                                                        Buy Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* Removed All Products and Browse by Category sections as requested */}
            </div>
        </div>
    );
}

