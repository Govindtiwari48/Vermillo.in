'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleText from './ParticleText';
import { Palette, Shirt, Gem } from 'lucide-react';

// ========================================
// HERO SLIDESHOW IMAGE CONFIGURATION
// ========================================
// To use your own images:
// 1. Place your images in the /public/images/ directory
// 2. Replace the empty strings below with the image paths
//    - Example: '/images/hero/ceramics.jpg'
// 3. Leave empty strings to use default Unsplash images
// 4. Customize titles and subtitles as needed
// ========================================

const HERO_IMAGE_CONFIG = [
  { customPath: '', defaultUrl: '/images/tode-bag/teeth_cock_tode.jpeg' },
  { customPath: '', defaultUrl: '/images/painting/autism-day-awareness-collage-style-with-people.jpg' },
  { customPath: '', defaultUrl: '/images/painted-clothes/close-up-hand-painting-with-brush.jpg' },
  { customPath: '', defaultUrl: '/images/shoe/pair-brown-shoes-with-black-leather-sole-word-bottom.jpg' },
  { customPath: '', defaultUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1920&q=80' },
];

// Helper function to get image path with fallback
const getImageUrl = (config: { customPath: string; defaultUrl: string }) => {
  return config.customPath || config.defaultUrl;
};

// Professional slideshow images - high-quality artisan/craft themed
const SLIDESHOW_IMAGES = [
  {
    url: getImageUrl(HERO_IMAGE_CONFIG[0]),
    title: 'Premium Tode Bag',
    subtitle: 'Handcrafted exclusive tode bag'
  },
  {
    url: getImageUrl(HERO_IMAGE_CONFIG[1]),
    title: 'Textile Arts',
    subtitle: 'Woven with precision and care'
  },
  {
    url: getImageUrl(HERO_IMAGE_CONFIG[2]),
    title: 'Fashion Forward',
    subtitle: 'Contemporary apparel design'
  },
  {
    url: getImageUrl(HERO_IMAGE_CONFIG[3]),
    title: 'Leather Craft',
    subtitle: 'Premium handmade accessories'
  },
  {
    url: getImageUrl(HERO_IMAGE_CONFIG[4]),
    title: 'Canvas Art',
    subtitle: 'Handcrafted canvas artwork'
  }
];

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  // Trigger logo animation completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoAnimationComplete(true);
      setIsLoading(false);
    }, 2000); // Logo moves after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (!logoAnimationComplete) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 2000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [logoAnimationComplete]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Professional Slideshow Background */}
      <AnimatePresence mode="wait">
        {logoAnimationComplete && (
          <div className="absolute inset-0 z-0">
            {SLIDESHOW_IMAGES.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  scale: currentSlide === index ? 1 : 1.1,
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: index === 3 ? '110%' : 'cover',
                  backgroundPosition: index === 3 ? 'center 20%' : 'center',
                  filter: 'brightness(0.85) contrast(1.05)',
                  zIndex: currentSlide === index ? 1 : 0,
                }}
              />
            ))}

            {/* Elegant gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-[2]" />
          </div>
        )}
      </AnimatePresence>

      {/* Initial Background (before logo animation) */}
      {!logoAnimationComplete && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1558769132-cb1aea3c8347?w=1920&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7) contrast(1.02)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </motion.div>
      )}

      {/* Animated Logo - Center to Navbar */}
      <AnimatePresence>
        {!logoAnimationComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              x: -window.innerWidth / 2 + 80, // Move to left navbar position
              y: -window.innerHeight / 2 + 40,
              scale: 0.3,
            }}
            transition={{
              opacity: { duration: 0.3, delay: 0 },
              x: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
              y: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
              scale: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
            }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl serif font-bold text-white tracking-[0.2em] uppercase drop-shadow-2xl">
              Vermillo
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slideshow Content Overlay */}
      <AnimatePresence mode="wait">
        {logoAnimationComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4"
          >
            {/* Slide Title and Subtitle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <h2 style={{ color: '#ffffff', marginBottom: '0.5cm', fontFamily: 'var(--font-sans)' }} className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-[0.2em] uppercase drop-shadow-2xl">
                  {SLIDESHOW_IMAGES[currentSlide].title}
                </h2>
                <p style={{ color: '#ffffff', marginTop: '0' }} className="text-sm md:text-base lg:text-lg font-extrabold tracking-[0.2em] uppercase drop-shadow-xl">
                  {SLIDESHOW_IMAGES[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Slide Progress Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-20 left-0 right-0 flex justify-center gap-3"
            >
              {SLIDESHOW_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="group relative"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className={`h-1 transition-all duration-500 rounded-full ${currentSlide === index
                      ? 'w-16 bg-white'
                      : 'w-8 bg-white/40 hover:bg-white/60'
                      }`}
                  >
                    {currentSlide === index && (
                      <motion.div
                        className="h-full bg-gradient-to-r from-white to-white/80 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Floating Elements */}
      {logoAnimationComplete && (
        <>
          <motion.div
            className="absolute top-40 left-20 z-10 hidden lg:block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
            }}
          >
            <div className="w-4 h-4 bg-white/60 rounded-full shadow-xl backdrop-blur-sm" />
          </motion.div>

          <motion.div
            className="absolute bottom-40 right-32 z-10 hidden lg:block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: `translate(${mousePosition.x * -0.7}px, ${mousePosition.y * -0.7}px)`,
            }}
          >
            <div className="w-3 h-3 bg-white/60 rounded-full shadow-xl backdrop-blur-sm" />
          </motion.div>
        </>
      )}

      {/* Professional Marquee Bar */}
      <AnimatePresence>
        {logoAnimationComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-t border-white/10 w-full"
          >
            <div className="overflow-hidden py-4">
              <div
                className="flex whitespace-nowrap flex-nowrap"
                style={{
                  animation: 'marquee 30s linear infinite',
                  width: 'max-content',
                }}
              >
                {/* Multiple iterations for seamless scroll */}
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-8 px-4">
                    <span className="text-white text-sm md:text-base font-semibold">
                      <span style={{ color: '#FF6600' }}>MADE IN INDIA </span>
                      <span className="text-white ml-2">FOR THE WORLD</span>
                    </span>
                    <span className="text-white text-sm md:text-base font-semibold">
                      <span style={{ color: '#FF6600' }}>FLAT 10%</span>
                      <span className="text-white ml-2">OFF ON FIRST PURCHASE</span>
                    </span>
                    <span className="text-white/60 text-xs md:text-sm">//</span>
                    <span className="text-white font-medium text-sm md:text-base">
                      FREE 7 DAY RETURNS
                    </span>
                    <span className="w-2 h-2 bg-white/40 rounded-full"></span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
