'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/lib/mockData';

export default function FeaturedCollections() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl serif font-bold text-charcoal mb-4">
            Featured Collections
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto">
            Explore our curated selections of artisanal pieces, each telling a unique story
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <Link href={`/collections/${collection.slug}`}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className={`relative ${index === 0 ? 'h-[600px]' : 'h-[300px]'} overflow-hidden`}>
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className={`serif font-bold mb-2 ${index === 0 ? 'text-3xl' : 'text-2xl'}`}>
                        {collection.name}
                      </h3>
                      <p className="text-white/90 mb-4">{collection.description}</p>
                      <span className="inline-block border-b-2 border-white pb-1 group-hover:border-sage transition-colors">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

