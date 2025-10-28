'use client';

import { motion } from 'framer-motion';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/lib/wishlistContext';
import { useCart } from '@/lib/cartContext';

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = (product: any) => {
        addToCart(product, 1);
    };

    if (wishlist.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-light pt-24 pb-16">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Heart size={40} className="text-gray-400" />
                        </div>
                        <h1 className="text-3xl serif font-semibold text-gray-900 mb-4">
                            Your Wishlist is Empty
                        </h1>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Start adding items you love to your wishlist. They'll appear here for easy access.
                        </p>
                        <Link
                            href="/collections/all"
                            className="inline-flex items-center gap-2 bg-terracotta text-white px-6 py-3 rounded-lg hover:bg-rust transition-colors"
                        >
                            <ShoppingBag size={20} />
                            Start Shopping
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-light pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-4xl serif font-semibold text-gray-900 mb-2">
                                My Wishlist
                            </h1>
                            <p className="text-gray-600">
                                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
                            </p>
                        </div>
                        <button
                            onClick={clearWishlist}
                            className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            Clear All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishlist.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />

                                    {/* Remove from wishlist button */}
                                    <button
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 transition-colors group/btn"
                                    >
                                        <Heart
                                            size={18}
                                            className="text-red-500 fill-red-500 group-hover/btn:scale-110 transition-transform"
                                        />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-2xl font-bold text-terracotta">
                                            ${product.price}
                                        </span>
                                        <span className="text-xs text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-1 rounded">
                                            {product.category}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full bg-terracotta text-white py-3 rounded-lg hover:bg-rust transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingBag size={18} />
                                        Add to Cart
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
