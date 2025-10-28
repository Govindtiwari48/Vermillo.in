'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '../ui/Button';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function BrandManifesto() {
  const values = [
    'Handpicked by artisans',
    'Sustainable materials',
    'Limited editions',
    'Global shipping',
  ];

  return (
    <section className="bg-gradient-light relative overflow-hidden mb-[1cm]">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-200/30 -z-0"></div>

      <div className="mx-auto relative z-10" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative h-[700px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/painting/Hand_Drawing_raj.jpeg"
                alt="Artisan at work"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                quality={90}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent"></div>

              {/* Floating badge */}
              {/* <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="absolute top-8 right-8 bg-cream px-6 py-4 rounded-2xl shadow-xl"
              >
                <div className="text-terracotta text-3xl font-bold serif">500+</div>
                <div className="text-charcoal/60 text-sm mt-1">Curated Items</div>
              </motion.div> */}
            </div>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-8 -left-8 w-64 h-64 bg-terracotta/10 rounded-full blur-3xl -z-10"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8 md:space-y-10"
          >
            <div className="text-center" style={{ paddingTop: '28px', paddingBottom: '28px' }}>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-sm text-terracotta font-semibold tracking-[0.25em] uppercase mb-4 block"
              >
                Our Philosophy
              </motion.span>
              <h2 className="text-black uppercase tracking-[0.2em] !font-sans leading-tight" style={{ fontSize: '1.125rem', fontWeight: 800 }}>
                WHERE ARTISTRY MEETS EVERYDAY LIFE
              </h2>
            </div>

            <div className="space-y-7 md:space-y-8 text-charcoal/70 text-base md:text-lg leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-light"
              >
                <strong className="text-charcoal font-semibold">Vermillo</strong> is more than
                a brand; it's a celebration of human creativity. We bridge the gap between the
                artist's studio and your wardrobe.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-light"
              >
                Every piece in our collection tells a story—of skilled hands, thoughtful design,
                and materials sourced with care. We believe that what you wear and surround
                yourself with should inspire you daily.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="font-light"
              >
                Our mission is to make exceptional craftsmanship accessible to those who value
                authenticity, quality, and timeless beauty.
              </motion.p>
            </div>

            {/* Values */}
            <motion.div
              className="grid grid-cols-2 gap-5 pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-terracotta/10 flex items-center justify-center flex-shrink-0">
                    <Check className="text-terracotta" size={14} strokeWidth={3} />
                  </div>
                  <span className="text-charcoal/80 text-base">{value}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex gap-5 pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link href="/collections/all">
                <Button size="lg">Discover Our Story</Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
