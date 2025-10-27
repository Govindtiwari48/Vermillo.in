'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Art',
    description: 'Unique pieces for your space',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&h=800',
    href: '/collections/art',
    color: 'terracotta',
  },
  {
    name: 'Clothing',
    description: 'Wearable artistry',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&h=800',
    href: '/collections/clothing',
    color: 'sage',
  },
  {
    name: 'Accessories',
    description: 'The perfect finishing touch',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=600&h=800',
    href: '/collections/accessories',
    color: 'gold',
  },
];

export default function ShopByCategory() {
  return (
    <section className="bg-gradient-light text-charcoal relative overflow-hidden">
      {/* Background pattern - lighter for white background */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-terracotta rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sage rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
          style={{ paddingTop: '28px', paddingBottom: '28px' }}
        >
          {/* <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-terracotta font-semibold tracking-[0.25em] uppercase mb-4 block"
          >
            Browse Collections
          </motion.span> */}
          <h2 className="text-black uppercase tracking-[0.2em] mb-4 !font-sans leading-tight" style={{ fontSize: '1.125rem', fontWeight: 800 }}>
            SHOP BY CATEGORY
          </h2>
          <p className="text-charcoal/65 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4 font-light">
            Explore our carefully curated categories designed for the discerning collector
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Link href={category.href}>
                <motion.div
                  className="group relative h-[350px] overflow-hidden rounded-2xl shadow-lg"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent group-hover:from-charcoal/90 group-hover:via-charcoal/60 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="self-start"
                    >
                      <span className={`bg-${category.color}/20 backdrop-blur-sm border border-${category.color}/30 text-cream text-xs px-3 py-1.5 rounded-full font-medium`}>
                        Collection
                      </span>
                    </motion.div>

                    {/* Bottom content */}
                    <div>
                      <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <h3 className="text-3xl serif font-semibold mb-2 group-hover:text-terracotta transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-cream/70 text-sm">
                          {category.description}
                        </p>
                      </motion.div>

                      <motion.div
                        className="flex items-center gap-3 text-cream group-hover:text-terracotta transition-colors"
                        whileHover={{ x: 10 }}
                      >
                        <span className="text-sm font-medium tracking-wide">Explore Now</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight size={20} strokeWidth={2} />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Decorative element */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ transform: 'translate(-50%, -50%)' }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 md:mt-20 lg:mt-24 pt-12 md:pt-16 border-t border-charcoal/10"
        >
          {[
            { label: 'Artisan Partners', value: '50+' },
            { label: 'Countries Shipped', value: '120+' },
            { label: 'Happy Customers', value: '10K+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl serif font-semibold text-terracotta mb-2">
                {stat.value}
              </div>
              <div className="text-charcoal/60 text-sm tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
