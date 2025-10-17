'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    name: 'Art',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    href: '/collections/art',
  },
  {
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    href: '/collections/clothing',
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    href: '/collections/accessories',
  },
];

export default function ShopByCategory() {
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
            Shop by Category
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto">
            Explore our carefully curated categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={category.href}>
                <div className="group relative h-96 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/60 transition-colors duration-300" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-4xl serif font-bold text-white group-hover:scale-110 transition-transform duration-300">
                      {category.name}
                    </h3>
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

