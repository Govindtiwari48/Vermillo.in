'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-light-reverse text-charcoal pb-16">
      <div className="mx-auto" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="text-3xl serif font-semibold mb-8 text-charcoal relative">
              Vermillo
              <span className="absolute -bottom-2 left-0 w-16 h-[2px] bg-gradient-to-r from-terracotta to-gold"></span>
            </h3>
            <p className="text-charcoal/70 text-base leading-relaxed mb-10 max-w-md">
              More than a brand; we're a celebration of human creativity. We bridge the gap
              between the artist's studio and your wardrobe.
            </p>
            <div className="flex space-x-12">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-charcoal/10 text-charcoal/70 hover:bg-terracotta hover:text-cream transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Instagram"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-charcoal/10 text-charcoal/70 hover:bg-terracotta hover:text-cream transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Facebook"
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-charcoal/10 text-charcoal/70 hover:bg-terracotta hover:text-cream transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Twitter"
              >
                <Twitter size={18} strokeWidth={1.5} />
              </a>
              <a
                href="mailto:hello@vermillo.com"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-charcoal/10 text-charcoal/70 hover:bg-terracotta hover:text-cream transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Email"
              >
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold mb-8 text-charcoal tracking-wider uppercase">Shop</h4>
            <ul className="space-y-5">
              <li>
                <Link href="/collections/all" className="text-charcoal/70 hover:text-charcoal transition-colors text-sm">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/collections/art" className="text-charcoal/70 hover:text-charcoal transition-colors text-sm">
                  Art
                </Link>
              </li>
              <li>
                <Link href="/collections/clothing" className="text-charcoal/70 hover:text-charcoal transition-colors text-sm">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/collections/accessories" className="text-charcoal/70 hover:text-charcoal transition-colors text-sm">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold mb-8 text-charcoal tracking-wider uppercase">Help</h4>
            <ul className="space-y-5">
              <li>
                <Link href="/about" className="text-charcoal/70 hover:text-charcoal transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-charcoal/70 hover:text-charcoal transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-charcoal/70 hover:text-charcoal transition-colors text-sm">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-charcoal/70 hover:text-charcoal transition-colors text-sm">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-semibold mb-8 text-charcoal tracking-wider uppercase">Stay Connected</h4>
            <p className="text-charcoal/70 text-sm mb-6">
              Subscribe to receive updates on new arrivals and special offers.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-5 py-4 bg-white/50 border border-charcoal/20 rounded-lg text-charcoal placeholder:text-charcoal/50 focus:outline-none focus:border-terracotta transition-colors text-sm shadow-sm focus:shadow-md"
              />
              <button className="px-8 py-4 bg-terracotta text-cream rounded-lg hover:bg-rust transition-colors font-medium text-sm shadow-sm hover:shadow-md">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-charcoal/10 pt-10 flex flex-col md:flex-row justify-between items-center text-charcoal/70 text-sm gap-6">
          <p>© 2025 Vermillo. All rights reserved.</p>
          <div className="flex space-x-10">
            <Link href="/privacy" className="hover:text-charcoal transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-charcoal transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
