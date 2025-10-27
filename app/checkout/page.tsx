'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import Button from '@/components/ui/Button';
import Image from 'next/image';

type Step = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const { cart, cartTotal } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const steps: { id: Step; label: string }[] = [
    { id: 'shipping', label: 'Shipping' },
    { id: 'payment', label: 'Payment' },
    { id: 'review', label: 'Review' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const shippingCost = 15;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  const handleNextStep = () => {
    if (currentStep === 'shipping') setCurrentStep('payment');
    else if (currentStep === 'payment') setCurrentStep('review');
  };

  const handlePrevStep = () => {
    if (currentStep === 'payment') setCurrentStep('shipping');
    else if (currentStep === 'review') setCurrentStep('payment');
  };

  const handleSubmitOrder = () => {
    alert('Order placed successfully! (This is a demo)');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl serif font-bold text-charcoal mb-4">Your cart is empty</h1>
          <Button onClick={() => (window.location.href = '/collections/all')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-light">
      <div className="mx-auto max-w-6xl" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div className="flex items-center w-full">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= currentStepIndex
                      ? 'bg-sage text-white'
                      : 'bg-white text-charcoal/40 border-2 border-charcoal/20'
                      }`}
                  >
                    {index < currentStepIndex ? <Check size={20} /> : index + 1}
                  </div>
                  <div
                    className={`flex-1 h-1 mx-4 ${index < currentStepIndex ? 'bg-sage' : 'bg-charcoal/20'
                      } ${index === steps.length - 1 ? 'hidden' : ''}`}
                  />
                </div>
                <span
                  className={`absolute mt-16 -ml-6 text-sm ${index <= currentStepIndex ? 'text-charcoal font-semibold' : 'text-charcoal/40'
                    }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Shipping Form */}
              {currentStep === 'shipping' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-2xl serif font-bold text-charcoal mb-6">
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                      }
                      className="col-span-1 p-3 border border-charcoal/20 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                      }
                      className="col-span-1 p-3 border border-charcoal/20 rounded-md"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, email: e.target.value })
                      }
                      className="col-span-2 p-3 border border-charcoal/20 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                      className="col-span-2 p-3 border border-charcoal/20 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, city: e.target.value })
                      }
                      className="col-span-1 p-3 border border-charcoal/20 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={shippingInfo.state}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, state: e.target.value })
                      }
                      className="col-span-1 p-3 border border-charcoal/20 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={shippingInfo.zipCode}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                      }
                      className="col-span-1 p-3 border border-charcoal/20 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={shippingInfo.country}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, country: e.target.value })
                      }
                      className="col-span-1 p-3 border border-charcoal/20 rounded-md"
                    />
                  </div>
                </motion.div>
              )}

              {/* Payment Form */}
              {currentStep === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-2xl serif font-bold text-charcoal mb-6">
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                      }
                      className="w-full p-3 border border-charcoal/20 rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Name on Card"
                      value={paymentInfo.cardName}
                      onChange={(e) =>
                        setPaymentInfo({ ...paymentInfo, cardName: e.target.value })
                      }
                      className="w-full p-3 border border-charcoal/20 rounded-md"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                        }
                        className="p-3 border border-charcoal/20 rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                        }
                        className="p-3 border border-charcoal/20 rounded-md"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Review */}
              {currentStep === 'review' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-2xl serif font-bold text-charcoal mb-6">Review Order</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-charcoal mb-2">Shipping Address</h3>
                      <p className="text-charcoal/70">
                        {shippingInfo.firstName} {shippingInfo.lastName}
                        <br />
                        {shippingInfo.address}
                        <br />
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                        <br />
                        {shippingInfo.country}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-charcoal mb-2">Payment Method</h3>
                      <p className="text-charcoal/70">
                        •••• •••• •••• {paymentInfo.cardNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep !== 'shipping' && (
                  <Button variant="secondary" onClick={handlePrevStep}>
                    Back
                  </Button>
                )}
                {currentStep !== 'review' ? (
                  <Button onClick={handleNextStep} className="flex-1">
                    Continue
                  </Button>
                ) : (
                  <Button onClick={handleSubmitOrder} className="flex-1">
                    Place Order
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-28">
              <h3 className="text-xl serif font-bold text-charcoal mb-4">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-charcoal">{item.product.name}</p>
                      <p className="text-xs text-charcoal/60">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-charcoal">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-charcoal border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

