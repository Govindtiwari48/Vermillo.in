'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ParticleText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor(x: number, y: number, targetX: number, targetY: number) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.size = Math.random() * 2 + 1;
        this.speedX = 0;
        this.speedY = 0;
      }

      update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        this.speedX += dx * 0.0002;
        this.speedY += dy * 0.0002;
        this.speedX *= 0.95;
        this.speedY *= 0.95;
        this.x += this.speedX;
        this.y += this.speedY;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(85, 107, 47, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create text particles
    const text = 'Wearable Art. Redefined.';
    const fontSize = Math.min(window.innerWidth / 15, 80);
    ctx.font = `bold ${fontSize}px 'Playfair Display', serif`;
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textX = canvas.width / 2;
    const textY = canvas.height / 2;
    ctx.fillText(text, textX, textY);

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const particles: Particle[] = [];

    // Sample pixels to create particles
    const gap = 4;
    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const index = (y * canvas.width + x) * 4;
        const alpha = imageData.data[index + 3];
        
        if (alpha > 128) {
          const px = x;
          const py = y;
          const particle = new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            px,
            py
          );
          particles.push(particle);
        }
      }
    }

    // Clear canvas for animation
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    // Start animation after a short delay
    setTimeout(() => {
      animate();
    }, 300);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute inset-0 z-10 pointer-events-none"
    />
  );
}

