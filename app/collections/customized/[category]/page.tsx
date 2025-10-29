'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Grid3x3, List } from 'lucide-react';
import { customizedCategories } from '@/lib/customizedCollections';

export default function CategoryPage({ params }: { params: { category: string } }) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Find the category
    const category = useMemo(() => {
        return customizedCategories.find((cat) => cat.slug === params.category);
    }, [params.category]);

    if (!category) {
        return (
            <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-charcoal mb-4">Category Not Found</h1>
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

        return {
            id: `${category.id}-${index}`,
            name: displayName,
            image: image,
            price: Math.floor(Math.random() * 400) + 100, // Random price between 100-500
        };
    });

    return (
        <div className="min-h-screen bg-cream pt-28 pb-20">
            <div className="mx-auto" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
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
                            <h1 className="text-4xl md:text-5xl lg:text-6xl serif font-semibold text-charcoal mb-4">
                                {category.name}
                            </h1>
                            <p className="text-charcoal/70 text-lg max-w-2xl">
                                {category.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
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
                            <div className="text-charcoal/60 text-sm">
                                {items.length} {items.length === 1 ? 'item' : 'items'}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Items Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.5 }}
                            >
                                <Link href={`/products/${item.id}`}>
                                    <div className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg">
                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-charcoal mb-2 group-hover:text-terracotta transition-colors line-clamp-2">
                                                {item.name}
                                            </h3>
                                            <p className="text-xl font-bold text-charcoal">
                                                ${item.price}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map((item, index) => (
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
                                            <p className="text-2xl font-bold text-charcoal">
                                                ${item.price}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

