'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import Button from '../ui/Button';

export default function CartSidebar() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, toggleCart } =
    useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl serif font-bold text-charcoal">
                Shopping Bag ({cartCount})
              </h2>
              <button
                onClick={toggleCart}
                className="text-charcoal hover:text-sage transition-colors"
                aria-label="Close cart"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={64} className="text-beige mb-4" />
                  <p className="text-charcoal/60 mb-4">Your cart is empty</p>
                  <Button onClick={toggleCart}>Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-24 h-32 flex-shrink-0 bg-beige rounded-md overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-charcoal">{item.product.name}</h3>
                            <p className="text-sm text-charcoal/60">
                              ${item.product.price}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-charcoal/40 hover:text-sienna transition-colors"
                            aria-label="Remove item"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        {/* Options */}
                        {(item.selectedSize || item.selectedColor) && (
                          <div className="text-sm text-charcoal/60 mb-2">
                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                            {item.selectedSize && item.selectedColor && <span> • </span>}
                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          </div>
                        )}

                        {/* Quantity */}
                        <div className="flex items-center gap-3 mt-auto">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-charcoal/20 rounded hover:bg-beige transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-charcoal font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-charcoal/20 rounded hover:bg-beige transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-charcoal">Subtotal</span>
                  <span className="font-bold text-charcoal">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-charcoal/60">
                  Shipping and taxes calculated at checkout
                </p>
                <Link href="/checkout" onClick={toggleCart}>
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                <button
                  onClick={toggleCart}
                  className="w-full text-center text-charcoal hover:text-sage transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

