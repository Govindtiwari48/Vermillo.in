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

    // Particle class with faster animation
    class Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor(x: number, y: number, targetX: number, targetY: number) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = 0;
        this.speedY = 0;
        this.opacity = 0;
      }

      update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        // Faster movement with higher acceleration
        this.speedX += dx * 0.0008;
        this.speedY += dy * 0.0008;
        this.speedX *= 0.92;
        this.speedY *= 0.92;
        this.x += this.speedX;
        this.y += this.speedY;

        // Fade in faster
        if (this.opacity < 1) {
          this.opacity += 0.015;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(200, 92, 62, ${this.opacity * 0.85})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create text particles
    const text = 'Wearable Art Defined';
    const fontSize = Math.min(window.innerWidth / 12, 90);
    ctx.font = `500 ${fontSize}px 'Cormorant Garamond', serif`;
    ctx.fillStyle = '#C85C3E';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textX = canvas.width / 2;
    const textY = canvas.height / 2 - 80;
    ctx.fillText(text, textX, textY);

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const particles: Particle[] = [];

    // Sample pixels to create particles - denser sampling
    const gap = 3;
    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const index = (y * canvas.width + x) * 4;
        const alpha = imageData.data[index + 3];

        if (alpha > 128) {
          const px = x;
          const py = y;
          // Start particles from closer position for faster assembly
          const angle = Math.random() * Math.PI * 2;
          const distance = 100 + Math.random() * 150;
          const particle = new Particle(
            px + Math.cos(angle) * distance,
            py + Math.sin(angle) * distance,
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

    // Start animation immediately
    setTimeout(() => {
      animate();
    }, 100);

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
      transition={{ duration: 0.3, delay: 0.2 }}
      className="absolute inset-0 z-10 pointer-events-none"
    />
  );
}
