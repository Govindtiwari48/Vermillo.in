'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, MessageCircle, ArrowRight } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ShipmentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const whatsappUrl = searchParams.get('whatsappUrl');
  const [isWhatsAppReady, setIsWhatsAppReady] = useState(false);

  useEffect(() => {
    if (whatsappUrl) {
      setIsWhatsAppReady(true);
    }
  }, [whatsappUrl]);

  const handleWhatsAppClick = () => {
    if (whatsappUrl) {
      window.open(decodeURIComponent(whatsappUrl), '_blank');
    }
  };

  if (!orderId) {
    return (
      <div className="min-h-screen pt-6 md:pt-8 flex items-center justify-center bg-gradient-light">
        <div className="text-center">
          <p className="text-3xl serif font-bold text-charcoal mb-4">Order Not Found</p>
          <Button onClick={() => router.push('/collections/all')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 bg-gradient-light">
      <div className="mx-auto max-w-4xl pt-6 md:pt-12" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
        {/* Success Icon and Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl serif font-bold text-charcoal mb-3">
            Order Confirmed!
          </h1>
          <p className="text-charcoal/70 text-lg mb-2">
            Thank you for your order. We've received it and will process it shortly.
          </p>
          <p className="text-sm text-charcoal/60">
            Order ID: <span className="font-mono font-semibold">{orderId}</span>
          </p>
        </motion.div>

        {/* WhatsApp CTA Card */}
        {isWhatsAppReady && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-terracotta/20"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <MessageCircle className="text-green-600" size={32} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl serif font-bold text-charcoal mb-2">
                  Continue on WhatsApp
                </h2>
                <p className="text-charcoal/70 mb-4">
                  Your order details have been prepared. Click the button below to send them via WhatsApp for final confirmation.
                </p>
                <Button
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="w-full md:w-auto"
                >
                  <MessageCircle size={20} />
                  Send Order via WhatsApp
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
        >
          <h2 className="text-2xl serif font-bold text-charcoal mb-6">What Happens Next?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <span className="text-terracotta font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Order Confirmation</h3>
                <p className="text-charcoal/70 text-sm">
                  You'll receive an email confirmation shortly with all the details of your order.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <span className="text-terracotta font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Processing</h3>
                <p className="text-charcoal/70 text-sm">
                  Our team will review your order and prepare it for shipment. This typically takes 1-2 business days.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <span className="text-terracotta font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Shipping</h3>
                <p className="text-charcoal/70 text-sm">
                  Once your order ships, you'll receive a tracking number via email to monitor your package.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <span className="text-terracotta font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Delivery</h3>
                <p className="text-charcoal/70 text-sm">
                  Your order will arrive at your doorstep within 5-7 business days, depending on your location.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-soft-beige/30 rounded-xl p-6 md:p-8 mb-8"
        >
          <h2 className="text-xl serif font-bold text-charcoal mb-4">Need Help?</h2>
          <p className="text-charcoal/70 mb-4">
            If you have any questions about your order or need to make changes, please don't hesitate to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="px-4 py-2 bg-white border border-charcoal/20 rounded-lg text-charcoal hover:bg-charcoal/5 transition-colors text-sm font-medium text-center"
            >
              Contact Support
            </Link>
            <Link
              href="/collections/all"
              className="px-4 py-2 bg-terracotta text-cream rounded-lg hover:bg-rust transition-colors text-sm font-medium text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>

        {/* Order Details Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <h2 className="text-xl serif font-bold text-charcoal mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-charcoal/70 pb-4 border-b">
              <Package size={20} />
              <span className="flex-1">Order Number</span>
              <span className="font-mono font-semibold text-charcoal">{orderId}</span>
            </div>
            <p className="text-sm text-charcoal/60">
              A detailed confirmation email has been sent to your registered email address with complete order information.
            </p>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            href="/"
            className="text-terracotta hover:text-rust transition-colors font-medium inline-flex items-center gap-2"
          >
            <ArrowRight size={16} className="rotate-180" />
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

