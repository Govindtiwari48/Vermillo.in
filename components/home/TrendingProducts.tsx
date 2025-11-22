'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Heart } from 'lucide-react';
import Image from 'next/image';
import { products } from '@/lib/mockData';
import { useWishlist } from '@/lib/wishlistContext';
import { useEffect, useRef } from 'react';

// Helper function to format category names for display
const formatCategory = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'painting': 'Painting',
    'sketch': 'Sketch',
    'bag': 'BAG',
    'shoe': 'Shoes',
    'art-wear': 'Art Wear'
  };
  return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
};

export default function TrendingProducts() {
  const trendingProducts = products.filter((p) => p.trending);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Duplicate products for seamless marquee effect
  const duplicatedProducts = [...trendingProducts, ...trendingProducts];

  // Calculate total width for seamless loop (width + gap)
  const itemWidth = 280; // w-[280px]
  const gap = 32; // gap-8 = 2rem = 32px
  const itemTotalWidth = itemWidth + gap;

  // Refs and state for scrollable marquee
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isUserScrollingRef = useRef(false);
  const lastScrollLeftRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastUserInteractionTime = useRef<number>(0);
  const isDraggingRef = useRef(false);

  // Auto-scroll animation
  useEffect(() => {
    const container = scrollContainerRef.current;
    const content = scrollContentRef.current;
    if (!container || !content) return;

    let animationId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;
    let isRunning = false;
    let currentPosition = 0;
    let lastTime = performance.now();
    let scrollableWidth = 0;

    // Listen for resume event to sync position
    const handleResumeAutoScroll = () => {
      if (container) {
        // Sync current animation position with scroll container position when resuming
        currentPosition = container.scrollLeft;
        lastScrollLeftRef.current = container.scrollLeft;
        lastTime = performance.now();
      }
    };

    container.addEventListener('resumeautoscroll', handleResumeAutoScroll);

    const startAnimation = () => {
      if (!container || !content || isRunning) return;

      // Ensure content width is measured and container is ready
      const contentWidth = content.scrollWidth;
      const containerWidth = container.clientWidth;

      if (contentWidth === 0 || containerWidth === 0) {
        timeoutId = setTimeout(startAnimation, 50);
        return;
      }

      isRunning = true;

      // Calculate the scrollable width (half of total since we duplicate)
      scrollableWidth = contentWidth / 2;

      // Initialize scroll position - use current position if available
      const initialPosition = container.scrollLeft || 0;
      lastScrollLeftRef.current = initialPosition;
      isUserScrollingRef.current = false;

      lastTime = performance.now();
      currentPosition = initialPosition;

      const animateScroll = (currentTime: number) => {
        if (!container || !content) {
          if (animationId) {
            animationId = requestAnimationFrame(animateScroll);
          }
          return;
        }

        // Skip if user is scrolling - sync with their position and wait
        if (isUserScrollingRef.current) {
          // Update current position to match where user scrolled to
          currentPosition = container.scrollLeft;
          lastTime = currentTime;
          animationId = requestAnimationFrame(animateScroll);
          return;
        }

        // Calculate smooth delta time - allow up to 100ms for smooth animation
        const rawDeltaTime = currentTime - lastTime;
        lastTime = currentTime;

        // Cap delta time only for very large gaps (prevents jumps when tab becomes active)
        // Allow normal frame times (16-33ms) to pass through for smooth 60fps animation
        const deltaTime = Math.min(rawDeltaTime, 100);

        // Smooth scrolling - complete cycle in ~10 seconds for dynamic effect (half speed)
        // Original was 5 seconds, so half speed = 10 seconds
        const targetCycleTime = 10000; // 10 seconds per cycle (exactly half of original 5 seconds)
        const speed = scrollableWidth / targetCycleTime;

        // Ensure minimum speed for very small content (reduced proportionally)
        const finalSpeed = Math.max(speed, 0.3); // Reduced minimum to allow slower speeds

        // Update position continuously with time-based movement
        currentPosition += (finalSpeed * deltaTime);

        // Seamless infinite loop - handle wrapping precisely
        // Use modulo for perfect continuity without visible jumps
        if (scrollableWidth > 0) {
          if (currentPosition >= scrollableWidth) {
            currentPosition = currentPosition % scrollableWidth;
          }
          // Also handle negative values (shouldn't happen, but safety check)
          if (currentPosition < 0) {
            currentPosition = 0;
          }
        }

        // Update scroll position continuously with sub-pixel precision
        // Always update to ensure smooth, continuous movement
        container.scrollLeft = currentPosition;
        lastScrollLeftRef.current = currentPosition;

        // Continue animation loop immediately
        animationId = requestAnimationFrame(animateScroll);
        animationFrameRef.current = animationId;
      };

      // Start the animation
      animationId = requestAnimationFrame(animateScroll);
      animationFrameRef.current = animationId;
    };

    // Start immediately - use requestAnimationFrame for better timing
    // Double-check DOM readiness after one frame
    requestAnimationFrame(() => {
      if (container && content && content.scrollWidth > 0) {
        startAnimation();
      } else {
        timeoutId = setTimeout(startAnimation, 50);
      }
    });

    return () => {
      isRunning = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (container) {
        container.removeEventListener('resumeautoscroll', handleResumeAutoScroll);
      }
    };
  }, [trendingProducts.length]);

  // Handle user scroll detection - improved logic for free manual scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollCheckInterval: NodeJS.Timeout | null = null;

    const pauseAutoScroll = () => {
      isUserScrollingRef.current = true;
      isDraggingRef.current = true;
      lastUserInteractionTime.current = Date.now();
      lastScrollLeftRef.current = container.scrollLeft;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Resume auto-scroll after user stops interacting for 1.5 seconds
      scrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
        isDraggingRef.current = false;
        // Sync the animation position with current scroll position
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        // Trigger a recalculation of the animation position
        const event = new Event('resumeautoscroll');
        container.dispatchEvent(event);
      }, 1500);
    };

    // Detect manual scrolling by checking if scroll position changed significantly
    const handleScroll = () => {
      const currentScrollLeft = container.scrollLeft;
      const scrollDelta = Math.abs(currentScrollLeft - lastScrollLeftRef.current);

      // If scroll change is significant (more than 2px), it's likely user interaction
      if (scrollDelta > 2) {
        pauseAutoScroll();
      }

      lastScrollLeftRef.current = currentScrollLeft;
    };

    // Handle user interactions
    const handleMouseDown = () => {
      isDraggingRef.current = true;
      pauseAutoScroll();
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      // Give a moment for any remaining scroll events
      setTimeout(() => {
        if (!isDraggingRef.current) {
          pauseAutoScroll();
        }
      }, 100);
    };

    const handleTouchStart = () => {
      isDraggingRef.current = true;
      pauseAutoScroll();
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
      setTimeout(() => {
        if (!isDraggingRef.current) {
          pauseAutoScroll();
        }
      }, 100);
    };

    const handleWheel = (e: WheelEvent) => {
      // User is actively scrolling with wheel
      pauseAutoScroll();
    };

    // Monitor scroll position to detect manual scrolling
    scrollCheckInterval = setInterval(() => {
      if (!container) return;

      const currentScrollLeft = container.scrollLeft;
      const scrollDelta = Math.abs(currentScrollLeft - lastScrollLeftRef.current);

      // If position changed significantly and we're not in auto-scroll mode, it's user action
      if (scrollDelta > 1 && isUserScrollingRef.current === false && !isDraggingRef.current) {
        // This might be a lag in detection, pause auto-scroll
        pauseAutoScroll();
      }
    }, 50); // Check every 50ms

    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp); // In case mouse leaves while dragging
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    container.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (scrollCheckInterval) {
        clearInterval(scrollCheckInterval);
      }
    };
  }, []);

  const handleWishlistToggle = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <section className="bg-gradient-light relative overflow-hidden mb-[1cm]">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-sage/5 rounded-full blur-3xl"></div>

      <div className="mx-auto relative z-10" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
        <div className="text-center" style={{ paddingTop: '28px', paddingBottom: '28px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-black uppercase tracking-[0.2em] !font-sans leading-tight"
            style={{ fontSize: '1.125rem', fontWeight: 800 }}
          >
            TRENDING NOW
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center mb-12 md:mb-16"
        >
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
              <TrendingUp className="text-terracotta" size={20} />
            </div>
            <span className="text-sm font-semibold tracking-[0.25em] uppercase">
              What's <span style={{ color: '#ff6347' }}>Hot</span>
            </span>
          </motion.div>
          <p className="text-charcoal/65 text-base md:text-lg max-w-2xl leading-relaxed font-light text-center">
            Discover what's capturing hearts this season — our most coveted pieces
          </p>
        </motion.div>

        {/* Marquee Container - Scrollable with Auto-scroll */}
        <div className="relative overflow-hidden py-8">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide py-4 cursor-grab active:cursor-grabbing w-full"
            style={{
              scrollBehavior: 'auto',
              WebkitOverflowScrolling: 'touch',
              willChange: 'scroll-position',
              transform: 'translateZ(0)', // Force GPU acceleration
              backfaceVisibility: 'hidden', // Optimize rendering
              WebkitBackfaceVisibility: 'hidden',
              perspective: '1000px', // Enable hardware acceleration
              WebkitPerspective: '1000px',
            }}
          >
            <div
              ref={scrollContentRef}
              className="flex gap-8 inline-flex"
              style={{
                minWidth: 'max-content',
                width: 'max-content',
              }}
            >
              {duplicatedProducts.map((product, index) => {
                const isWishlisted = isInWishlist(product.id);

                return (
                  <motion.div
                    key={`${product.id}-${index}`}
                    className="flex-shrink-0 w-[280px] h-[350px] relative overflow-hidden rounded-lg group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="280px"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Wishlist Heart Button - Always Visible */}
                    <motion.button
                      onClick={(e) => handleWishlistToggle(product, e)}
                      className="absolute top-3 right-3 z-20 p-2 rounded-full shadow-lg transition-all duration-300"
                      style={{
                        backgroundColor: isWishlisted ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
                        border: '2px solid rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(10px)',
                      }}
                      whileHover={{
                        scale: 1.15,
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={false}
                      animate={{
                        backgroundColor: isWishlisted ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        animate={{
                          scale: isWishlisted ? [1, 1.3, 1] : 1,
                          rotate: isWishlisted ? [0, 15, -15, 0] : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut"
                        }}
                      >
                        <Heart
                          size={20}
                          className={`transition-all duration-300 ${isWishlisted
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-700 hover:text-red-500'
                            }`}
                          style={{
                            filter: isWishlisted ? 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.6))' : 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
                          }}
                        />
                      </motion.div>
                    </motion.button>

                    {/* Product Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ padding: '20px' }}>
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg" style={{ padding: '20px 24px' }}>
                        <h3 className="font-medium text-gray-900 mb-2 leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.01em', fontSize: '0.7rem' }}>
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.01em' }}>
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-terracotta">
                            ${product.price}
                          </span>
                          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                            {formatCategory(product.category)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
