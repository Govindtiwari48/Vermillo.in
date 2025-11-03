'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Grid3x3, List, ShoppingBag, Heart, Zap } from 'lucide-react';
import { customizedCategories } from '@/lib/customizedCollections';
import { useCart } from '@/lib/cartContext';
import { useWishlist } from '@/lib/wishlistContext';
import { Product } from '@/lib/types';

export default function CategoryPage({ params }: { params: { category: string } }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
    const router = useRouter();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    // Find the category
    const category = useMemo(() => {
        return customizedCategories.find((cat) => cat.slug === params.category);
    }, [params.category]);

    if (!category) {
        return (
            <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-4xl font-bold text-charcoal mb-4">Category Not Found</p>
                    <Link href="/collections/customized" className="text-terracotta hover:underline">
                        Return to Collections
                    </Link>
                </div>
            </div>
        );
    }

    // Generate a product-like structure for each image
    const items = category.images.map((image, index) => {
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

        return {
            id: `${category.id}-${index}`,
            name: displayName,
            image: image,
            price: Math.floor(Math.random() * 400) + 100, // Random price between 100-500
            category: categoryType,
        };
    });

    // Convert item to Product for cart/wishlist
    const itemToProduct = (item: typeof items[0]): Product => {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            description: `Handcrafted ${item.name} from our ${category.name} collection`,
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
        <div className="min-h-screen bg-cream pb-24">
            <div className="mx-auto pt-6 md:pt-8" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <Link
                        href="/collections/customized"
                        className="inline-flex items-center gap-2 text-charcoal/70 hover:text-terracotta transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Collections</span>
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            {/* Category title removed as requested */}
                            <p className="text-charcoal/70 text-lg max-w-3xl leading-relaxed">
                                {category.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
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
                            <div className="text-charcoal/60 text-sm md:ml-2">
                                {items.length} {items.length === 1 ? 'item' : 'items'}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Items Grid/List */}
                {viewMode === 'grid' ? (
                    <>
                        <div className="w-full h-[0.5cm]"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14 lg:gap-x-10 lg:gap-y-16 mt-0">
                            {items.map((item, index) => {
                                const isLiked = isInWishlist(item.id);
                                const isHovered = hoveredItemId === item.id;
                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.5 }}
                                        onMouseEnter={() => setHoveredItemId(item.id)}
                                        onMouseLeave={() => setHoveredItemId(null)}
                                    >
                                        <Link href={`/products/${item.id}`}>
                                            <div className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg h-full flex flex-col">
                                                <div className="relative aspect-[3/4] overflow-hidden">
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
                                                <div className="p-4 flex-1 flex flex-col">
                                                    <h3 className="font-semibold text-charcoal mb-2 group-hover:text-terracotta transition-colors line-clamp-2 min-h-[2.5rem]">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-xl font-bold text-charcoal mt-auto mb-2">
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
                    </>
                ) : (
                    <div className="space-y-4">
                        {items.map((item, index) => {
                            const isLiked = isInWishlist(item.id);
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03, duration: 0.5 }}
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
                                                <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-terracotta transition-colors">
                                                    {item.name}
                                                </h3>
                                                <p className="text-charcoal/60 mb-4">
                                                    {category.description}
                                                </p>
                                                <div className="flex items-center justify-between mb-4">
                                                    <p className="text-2xl font-bold text-charcoal">
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
            </div>
        </div>
    );
}

