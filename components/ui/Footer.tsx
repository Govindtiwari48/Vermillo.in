'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-deep-charcoal text-cream pt-20 pb-12">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="text-3xl serif font-medium mb-6 text-cream relative">
              Vermillo
              <span className="absolute -bottom-2 left-0 w-16 h-[2px] bg-gradient-to-r from-terracotta to-gold"></span>
            </h3>
            <p className="text-taupe text-base leading-relaxed mb-8 max-w-md">
              More than a brand; we're a celebration of human creativity. We bridge the gap
              between the artist's studio and your wardrobe.
            </p>
            <div className="flex space-x-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream/10 text-taupe hover:bg-terracotta hover:text-cream transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream/10 text-taupe hover:bg-terracotta hover:text-cream transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream/10 text-taupe hover:bg-terracotta hover:text-cream transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:hello@vermillo.com"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream/10 text-taupe hover:bg-terracotta hover:text-cream transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold mb-6 text-cream tracking-wider uppercase">Shop</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/collections/all" className="text-taupe hover:text-cream transition-colors text-sm">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/collections/art" className="text-taupe hover:text-cream transition-colors text-sm">
                  Art
                </Link>
              </li>
              <li>
                <Link href="/collections/clothing" className="text-taupe hover:text-cream transition-colors text-sm">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/collections/accessories" className="text-taupe hover:text-cream transition-colors text-sm">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold mb-6 text-cream tracking-wider uppercase">Help</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-taupe hover:text-cream transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-taupe hover:text-cream transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-taupe hover:text-cream transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-taupe hover:text-cream transition-colors text-sm">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold mb-6 text-cream tracking-wider uppercase">Stay Connected</h4>
            <p className="text-taupe text-sm mb-4">
              Subscribe to receive updates on new arrivals and special offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-cream/10 border border-cream/20 rounded-lg text-cream placeholder:text-taupe focus:outline-none focus:border-terracotta transition-colors text-sm"
              />
              <button className="px-6 py-3 bg-terracotta text-cream rounded-lg hover:bg-rust transition-colors font-medium text-sm">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center text-taupe text-sm gap-4">
          <p>© 2025 Vermillo. All rights reserved.</p>
          <div className="flex space-x-8">
            <Link href="/privacy" className="hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cream transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
