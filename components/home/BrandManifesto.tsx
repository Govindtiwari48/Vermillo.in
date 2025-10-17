'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '../ui/Button';
import Link from 'next/link';

export default function BrandManifesto() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=800&q=80"
              alt="Artisan at work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-sage/20 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl serif font-bold text-charcoal leading-tight">
              Where Artistry Meets Everyday Life
            </h2>
            <div className="space-y-4 text-charcoal/70 text-lg leading-relaxed">
              <p>
                <strong className="text-charcoal">The Artisan Collective</strong> is more than
                a brand; it's a celebration of human creativity. We bridge the gap between the
                artist's studio and your wardrobe.
              </p>
              <p>
                Every piece in our collection tells a story—of skilled hands, thoughtful design,
                and materials sourced with care. We believe that what you wear and surround
                yourself with should inspire you daily.
              </p>
              <p>
                Our mission is to make exceptional craftsmanship accessible to those who value
                authenticity, quality, and timeless beauty. Each item is selected not just for
                its aesthetic appeal, but for its ability to enhance your life and express your
                unique identity.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Link href="/collections/all">
                <Button size="lg">Discover Our Story</Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

