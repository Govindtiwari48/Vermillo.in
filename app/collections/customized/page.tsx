'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Grid3x3, List } from 'lucide-react';
import { customizedCategories, allImages } from '@/lib/customizedCollections';

export default function CustomizedCollectionPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
            let categoryId = 'all';
            if (image.includes('tode-bag')) categoryId = 'tode-bag';
            else if (image.includes('painted-clothes')) categoryId = 'art-wear';
            else if (image.includes('shoe')) categoryId = 'leather-shoe';
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

    return (
        <div className="min-h-screen bg-cream pt-28 pb-20">
            <div className="mx-auto" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl serif font-semibold text-charcoal mb-6">
                        Customized Collection
                    </h1>
                    <p className="text-charcoal/70 max-w-2xl mx-auto text-lg mb-8">
                        Explore our handcrafted collections, each piece carefully crafted with artistic vision
                    </p>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'all'
                                    ? 'bg-terracotta text-cream'
                                    : 'bg-white text-charcoal hover:bg-charcoal/5'
                                }`}
                        >
                            All Items ({allImages.length})
                        </button>
                        {customizedCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.id
                                        ? 'bg-terracotta text-cream'
                                        : 'bg-white text-charcoal hover:bg-charcoal/5'
                                    }`}
                            >
                                {category.name} ({category.images.length})
                            </button>
                        ))}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-8">
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
                </motion.div>

                {/* Items Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03, duration: 0.5 }}
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
                                            <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-terracotta transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-charcoal/60 mb-4">
                                                Handcrafted artisanal piece from our collection
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

                {/* Category Cards Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20"
                >
                    <h2 className="text-3xl serif font-semibold text-charcoal mb-8 text-center">
                        Browse by Category
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {customizedCategories.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <Link href={`/collections/customized/${category.slug}`}>
                                    <div className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                                        <div className="relative aspect-[3/4]">
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                                    <h3 className="text-2xl font-semibold text-white mb-2 flex items-center gap-2">
                                                        {category.name}
                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </h3>
                                                    <p className="text-white/90 text-sm mb-3">
                                                        {category.description}
                                                    </p>
                                                    <p className="text-white/80 text-xs">
                                                        {category.images.length} {category.images.length === 1 ? 'item' : 'items'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white p-5">
                                            <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-terracotta transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-charcoal/60 text-sm mb-3">
                                                {category.description}
                                            </p>
                                            <div className="flex items-center text-terracotta text-sm font-medium group-hover:gap-2 transition-all">
                                                <span>Explore Collection</span>
                                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

