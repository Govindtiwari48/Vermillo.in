'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/lib/mockData';

export default function FeaturedCollections() {
  // Calculate proper heights to ensure perfect alignment
  // On large screens: left image spans 2 rows, each row on right is 350px with 10px gap
  // Left image: 700px (350px * 2), Right grid: 350px height per item

  return (
    <section className="-mt-32 mb-[1cm]">
      <div className="mx-auto" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
          style={{ paddingTop: '28px', paddingBottom: '28px' }}
        >
          <h2 className="text-black uppercase tracking-[0.2em] !font-sans leading-tight" style={{ fontSize: '1.125rem', fontWeight: 800 }}>
            FEATURED COLLECTIONS
          </h2>
        </motion.div>

        {/* Main Grid Layout - Properly aligned structure */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Large Featured Image - Left Side (Spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-1"
          >
            <Link href="/collections">
              <motion.div
                className="group relative overflow-hidden"
                style={{
                  height: 'calc((350px + 1.25rem) * 2)',
                  minHeight: '600px'
                }}
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={collections[0].image}
                  alt={collections[0].name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority
                />
                {/* Text Overlay */}
                <div className="absolute inset-0 flex items-end justify-center pb-6">
                  <span
                    className="uppercase tracking-[0.2em] drop-shadow-lg"
                    style={{
                      color: '#ffffff',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 900,
                      fontSize: '0.875rem',
                      letterSpacing: '0.1em'
                    }}
                  >
                    {collections[0].name.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Right Side - 2x2 Grid (Spans 2 columns) */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-5 items-end">
            {collections.slice(1).map((collection, index) => (
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
                className="w-full h-full flex"
              >
                <Link href={`/collections/${collection.slug}`} className="block h-full w-full flex items-end">
                  <motion.div
                    className="group relative overflow-hidden h-[340px] sm:h-[380px] lg:h-[350px] w-full"
                    whileHover={{ scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    {/* Text Overlay */}
                    <div className="absolute inset-0 flex items-end justify-center pb-6">
                      <span
                        className="uppercase tracking-[0.2em] drop-shadow-lg"
                        style={{
                          color: '#ffffff',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 900,
                          fontSize: '0.875rem',
                          letterSpacing: '0.1em'
                        }}
                      >
                        {collection.name.toUpperCase()}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
