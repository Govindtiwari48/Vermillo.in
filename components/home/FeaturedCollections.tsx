'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/lib/mockData';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedCollections() {
  return (
    <section className="py-28 md:py-36 lg:py-44 bg-warm-white">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 md:mb-24 lg:mb-28"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-terracotta font-semibold tracking-[0.25em] uppercase mb-8 block"
          >
            Curated Selections
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl serif font-normal text-charcoal mb-8 md:mb-10">
            Featured Collections
          </h2>
          <p className="text-charcoal/65 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4 font-light">
            Explore our carefully curated selections of artisanal pieces, each telling a unique story
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-10">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
            >
              <Link href={`/collections/${collection.slug}`}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  whileHover={{ y: -8 }}
                >
                  <div className={`relative ${index === 0 ? 'h-[700px]' : 'h-[340px]'} overflow-hidden`}>
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div
                        className="flex items-start justify-between mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <div className="flex-1">
                          <h3 className={`serif font-medium mb-3 text-cream ${index === 0 ? 'text-4xl' : 'text-2xl'}`}>
                            {collection.name}
                          </h3>
                          <p className="text-cream/80 mb-6 leading-relaxed">
                            {collection.description}
                          </p>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 45 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                          className="w-12 h-12 flex items-center justify-center bg-cream/10 backdrop-blur-md rounded-full border border-cream/20 group-hover:bg-terracotta group-hover:border-terracotta transition-all"
                        >
                          <ArrowUpRight className="text-cream" size={20} />
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="inline-flex items-center gap-2 text-cream/90 text-sm font-medium group-hover:text-terracotta transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span>Explore Collection</span>
                        <span className="w-8 h-[1.5px] bg-current transition-all group-hover:w-12"></span>
                      </motion.div>
                    </div>

                    {/* Badge */}
                    {index === 0 && (
                      <div className="absolute top-8 left-8">
                        <span className="bg-gold text-deep-charcoal text-xs px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm">
                          New Arrival
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20 md:mt-24"
        >
          <Link href="/collections/all">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border-2 border-terracotta text-terracotta rounded-xl hover:bg-terracotta hover:text-cream transition-all duration-300 font-medium"
            >
              View All Collections
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
