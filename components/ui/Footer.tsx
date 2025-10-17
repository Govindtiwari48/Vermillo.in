'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl serif font-bold mb-4">The Artisan Collective</h3>
            <p className="text-beige mb-6 max-w-md">
              More than a brand; we're a celebration of human creativity. We bridge the gap
              between the artist's studio and your wardrobe.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige hover:text-sage transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige hover:text-sage transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige hover:text-sage transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/collections/all" className="text-beige hover:text-sage transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/collections/art" className="text-beige hover:text-sage transition-colors">
                  Art
                </Link>
              </li>
              <li>
                <Link href="/collections/clothing" className="text-beige hover:text-sage transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/collections/accessories" className="text-beige hover:text-sage transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-beige hover:text-sage transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-beige hover:text-sage transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-beige hover:text-sage transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-beige hover:text-sage transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-beige/20 pt-8 flex flex-col md:flex-row justify-between items-center text-beige text-sm">
          <p>© 2025 The Artisan Collective. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-sage transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-sage transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

