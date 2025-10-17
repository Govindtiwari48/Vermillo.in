'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ParticleText from './ParticleText';
import Button from '../ui/Button';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      >
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-beige via-white to-beige" />
        
        {/* Optional: Replace with video */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80')] bg-cover bg-center" />
        </div>
      </motion.div>

      {/* Particle Text Layer */}
      <ParticleText />

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="text-charcoal text-lg md:text-xl mb-8 text-center max-w-2xl px-4"
        >
          Discover curated collections of art, apparel, and accessories.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`,
          }}
        >
          <Link href="/collections/all">
            <Button size="lg" className="shadow-2xl hover:shadow-sage/50">
              Explore Collections
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-charcoal rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-charcoal rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

