'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleText from './ParticleText';
import { Palette, Shirt, Gem } from 'lucide-react';

const HERO_VIDEOS = [
  'https://assets.mixkit.co/videos/preview/mixkit-person-arranging-a-vase-with-flowers-2795-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-person-working-with-clay-10583-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-person-sewing-clothes-2794-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-person-making-jewelry-2796-large.mp4',
];

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleVideo = () => {
    if (videoElement) {
      if (isVideoPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      >
        {/* Hero Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558769132-cb1aea3c8347?w=1920&h=1080&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.8) contrast(1.05)'
          }}
        />

        {/* Gradient overlay - lighter */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/30" />

        {/* Vignette effect - lighter */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-charcoal/20" />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute inset-0 opacity-20 z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-terracotta/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-sage/20 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Particle Text Layer */}
      <ParticleText />

      {/* Content Layer */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">

        {/* Brand Name Below Particle Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{
            transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`,
          }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl serif font-light text-cream tracking-[0.3em] uppercase text-center">
            Vermillo
          </h2>
        </motion.div>

        {/* Featured Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute bottom-32 left-0 right-0 flex justify-center gap-16 text-sm"
        >
          {[
            { name: 'Curated Art', count: '120+ pieces', icon: Palette },
            { name: 'Apparel', count: '85+ items', icon: Shirt },
            { name: 'Accessories', count: '45+ pieces', icon: Gem },
          ].map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2 + index * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="text-center hidden sm:block group cursor-pointer"
            >
              <div className="text-cream/80 mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                <category.icon size={24} />
              </div>
              <div className="text-cream font-medium tracking-wide">{category.name}</div>
              <div className="text-cream/60 text-xs mt-1">{category.count}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>


      {/* Floating Elements */}
      <motion.div
        className="absolute top-40 left-20 z-10 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transform: `translate(${mousePosition.x * -0.8}px, ${mousePosition.y * -0.8}px)`,
        }}
      >
        <div className="w-3 h-3 bg-gold rounded-full shadow-lg" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-32 z-10 hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 2.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
        }}
      >
        <div className="w-2 h-2 bg-sage rounded-full shadow-lg" />
      </motion.div>
    </section>
  );
}
