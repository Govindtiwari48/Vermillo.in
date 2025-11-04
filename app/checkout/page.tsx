'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Phone, MapPin, Mail, User, CreditCard, Package, AlertCircle } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Step = 'shipping' | 'payment' | 'review';

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('shipping');
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const steps: { id: Step; label: string; icon: typeof User }[] = [
    { id: 'shipping', label: 'Shipping', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Package },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const shippingCost = 15;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  const validateShipping = (): boolean => {
    const newErrors: FormErrors = {};

    if (!shippingInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(shippingInfo.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!shippingInfo.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: FormErrors = {};

    if (!paymentInfo.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{13,19}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!paymentInfo.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!paymentInfo.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Invalid format (MM/YY)';
    }
    if (!paymentInfo.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 'shipping') {
      if (validateShipping()) {
        setCurrentStep('payment');
        setErrors({});
      }
    } else if (currentStep === 'payment') {
      if (validatePayment()) {
        setCurrentStep('review');
        setErrors({});
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'payment') setCurrentStep('shipping');
    else if (currentStep === 'review') setCurrentStep('payment');
    setErrors({});
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const generateWhatsAppMessage = (): string => {
    const orderItems = cart.map((item) => {
      const itemTotal = (item.product.price * item.quantity).toFixed(2);
      return `• ${item.product.name} (Qty: ${item.quantity}) - $${itemTotal}`;
    }).join('\n');

    return `*Order Details*\n\n` +
      `*Customer Information:*\n` +
      `Name: ${shippingInfo.firstName} ${shippingInfo.lastName}\n` +
      `Email: ${shippingInfo.email}\n` +
      `Phone: ${shippingInfo.phone}\n\n` +
      `*Shipping Address:*\n` +
      `${shippingInfo.address}\n` +
      `${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}\n` +
      `${shippingInfo.country}\n\n` +
      `*Order Items:*\n${orderItems}\n\n` +
      `*Order Summary:*\n` +
      `Subtotal: $${cartTotal.toFixed(2)}\n` +
      `Shipping: $${shippingCost.toFixed(2)}\n` +
      `Tax: $${tax.toFixed(2)}\n` +
      `*Total: $${total.toFixed(2)}*`;
  };

  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      // Store order data in Google Sheets
      const orderData = {
        timestamp: new Date().toISOString(),
        orderId: `ORD-${Date.now()}`,
        customer: {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}, ${shippingInfo.country}`,
        },
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          total: item.product.price * item.quantity,
          size: item.selectedSize || 'N/A',
          color: item.selectedColor || 'N/A',
        })),
        summary: {
          subtotal: cartTotal,
          shipping: shippingCost,
          tax: tax,
          total: total,
        },
      };

      // Save to Google Sheets
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      // Generate WhatsApp URL
      const whatsappMessage = encodeURIComponent(generateWhatsAppMessage());
      // Replace with your WhatsApp number (format: country code + number without + or 0)
      // Example: 1234567890 for +1 (234) 567-890
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

      // Clear cart
      clearCart();

      // Redirect to shipment page with order details
      const orderId = orderData.orderId;
      router.push(`/shipment?orderId=${orderId}&whatsappUrl=${encodeURIComponent(whatsappUrl)}`);
    } catch (error) {
      console.error('Error submitting order:', error);
      setErrors({ submit: 'Failed to process order. Please try again.' });
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-6 md:pt-8 flex items-center justify-center bg-gradient-light">
        <div className="text-center">
          <Package className="mx-auto mb-4 text-charcoal/40" size={64} />
          <p className="text-3xl serif font-bold text-charcoal mb-4">Your cart is empty</p>
          <p className="text-charcoal/70 mb-6">Add some items to your cart to continue shopping</p>
          <Button onClick={() => router.push('/collections/all')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 bg-gradient-light">
      <div className="mx-auto max-w-7xl pt-6 md:pt-12" style={{ paddingLeft: '0.25cm', paddingRight: '0.25cm' }}>
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl serif font-bold text-charcoal mb-2">Checkout</h1>
          <p className="text-charcoal/70 text-lg">Complete your order with confidence</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStepIndex;
              const isCompleted = index < currentStepIndex;

              return (
                <div key={step.id} className="flex-1 flex items-center">
                  <div className="flex items-center w-full">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-terracotta text-cream shadow-lg scale-110'
                          : 'bg-white text-charcoal/40 border-2 border-charcoal/20'
                      }`}
                    >
                      {isCompleted ? <Check size={24} /> : <Icon size={20} />}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                          isCompleted ? 'bg-terracotta' : 'bg-charcoal/20'
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`absolute mt-16 text-sm font-medium transition-colors ${
                      isActive ? 'text-charcoal' : 'text-charcoal/40'
                    }`}
                    style={{ transform: 'translateX(-50%)', left: '50%' }}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              {/* Shipping Form */}
              {currentStep === 'shipping' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="text-terracotta" size={24} />
                    <h2 className="text-2xl serif font-bold text-charcoal">Shipping Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={shippingInfo.firstName}
                        onChange={(e) => {
                          setShippingInfo({ ...shippingInfo, firstName: e.target.value });
                          if (errors.firstName) setErrors({ ...errors, firstName: '' });
                        }}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.firstName
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={shippingInfo.lastName}
                        onChange={(e) => {
                          setShippingInfo({ ...shippingInfo, lastName: e.target.value });
                          if (errors.lastName) setErrors({ ...errors, lastName: '' });
                        }}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.lastName
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        value={shippingInfo.email}
                        onChange={(e) => {
                          setShippingInfo({ ...shippingInfo, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (234) 567-8900"
                        value={shippingInfo.phone}
                        onChange={(e) => {
                          setShippingInfo({ ...shippingInfo, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Street address"
                        value={shippingInfo.address}
                        onChange={(e) => {
                          setShippingInfo({ ...shippingInfo, address: e.target.value });
                          if (errors.address) setErrors({ ...errors, address: '' });
                        }}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.address
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                        }`}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="City"
                        value={shippingInfo.city}
                        onChange={(e) => {
                          setShippingInfo({ ...shippingInfo, city: e.target.value });
                          if (errors.city) setErrors({ ...errors, city: '' });
                        }}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.city
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="State"
                        value={shippingInfo.state}
                        onChange={(e) => {
                          setShippingInfo({ ...shippingInfo, state: e.target.value });
                          if (errors.state) setErrors({ ...errors, state: '' });
                        }}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.state
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                        }`}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.state}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={shippingInfo.zipCode}
                        onChange={(e) => {
                          setShippingInfo({ ...shippingInfo, zipCode: e.target.value });
                          if (errors.zipCode) setErrors({ ...errors, zipCode: '' });
                        }}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.zipCode
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                        }`}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.zipCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Country"
                        value={shippingInfo.country}
                        onChange={(e) => {
                          setShippingInfo({ ...shippingInfo, country: e.target.value });
                          if (errors.country) setErrors({ ...errors, country: '' });
                        }}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.country
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                        }`}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.country}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payment Form */}
              {currentStep === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="text-terracotta" size={24} />
                    <h2 className="text-2xl serif font-bold text-charcoal">Payment Information</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          setPaymentInfo({ ...paymentInfo, cardNumber: formatted });
                          if (errors.cardNumber) setErrors({ ...errors, cardNumber: '' });
                        }}
                        maxLength={19}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.cardNumber
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Name on Card <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={paymentInfo.cardName}
                        onChange={(e) => {
                          setPaymentInfo({ ...paymentInfo, cardName: e.target.value });
                          if (errors.cardName) setErrors({ ...errors, cardName: '' });
                        }}
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.cardName
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                        }`}
                      />
                      {errors.cardName && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {errors.cardName}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value);
                            setPaymentInfo({ ...paymentInfo, expiryDate: formatted });
                            if (errors.expiryDate) setErrors({ ...errors, expiryDate: '' });
                          }}
                          maxLength={5}
                          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            errors.expiryDate
                              ? 'border-red-500 focus:ring-red-500/20'
                              : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                          }`}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {errors.expiryDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                            setPaymentInfo({ ...paymentInfo, cvv: value });
                            if (errors.cvv) setErrors({ ...errors, cvv: '' });
                          }}
                          maxLength={4}
                          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                            errors.cvv
                              ? 'border-red-500 focus:ring-red-500/20'
                              : 'border-charcoal/20 focus:ring-terracotta/20 focus:border-terracotta'
                          }`}
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {errors.cvv}
                          </p>
                        )}
                      </div>
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
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="text-terracotta" size={24} />
                    <h2 className="text-2xl serif font-bold text-charcoal">Review Your Order</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-soft-beige/30 p-4 rounded-lg">
                      <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                        <User size={18} />
                        Shipping Address
                      </h3>
                      <p className="text-charcoal/80 leading-relaxed">
                        {shippingInfo.firstName} {shippingInfo.lastName}
                        <br />
                        {shippingInfo.address}
                        <br />
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                        <br />
                        {shippingInfo.country}
                        <br />
                        <span className="flex items-center gap-2 mt-2">
                          <Phone size={14} />
                          {shippingInfo.phone}
                        </span>
                        <span className="flex items-center gap-2">
                          <Mail size={14} />
                          {shippingInfo.email}
                        </span>
                      </p>
                    </div>

                    <div className="bg-soft-beige/30 p-4 rounded-lg">
                      <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                        <CreditCard size={18} />
                        Payment Method
                      </h3>
                      <p className="text-charcoal/80">
                        •••• •••• •••• {paymentInfo.cardNumber.slice(-4)}
                        <br />
                        {paymentInfo.cardName}
                      </p>
                    </div>

                    <div className="bg-soft-beige/30 p-4 rounded-lg">
                      <h3 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                        <Package size={18} />
                        Order Items
                      </h3>
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex gap-3">
                            <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
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
                              <p className="text-xs text-charcoal/60">
                                Qty: {item.quantity}
                                {item.selectedSize && ` • Size: ${item.selectedSize}`}
                                {item.selectedColor && ` • Color: ${item.selectedColor}`}
                              </p>
                              <p className="text-sm font-semibold text-charcoal mt-1">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
                      <AlertCircle size={16} />
                      {errors.submit}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep !== 'shipping' && (
                  <Button variant="secondary" onClick={handlePrevStep} disabled={isSubmitting}>
                    Back
                  </Button>
                )}
                {currentStep !== 'review' ? (
                  <Button onClick={handleNextStep} className="flex-1">
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitOrder}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-28">
              <h3 className="text-xl serif font-bold text-charcoal mb-6 pb-4 border-b">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 pb-4 border-b last:border-0">
                    <div className="relative w-20 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-charcoal truncate">{item.product.name}</p>
                      <p className="text-xs text-charcoal/60 mt-1">
                        Qty: {item.quantity}
                        {item.selectedSize && ` • ${item.selectedSize}`}
                        {item.selectedColor && ` • ${item.selectedColor}`}
                      </p>
                      <p className="text-sm font-semibold text-charcoal mt-2">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
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
                <div className="flex justify-between text-xl font-bold text-charcoal border-t pt-3 mt-2">
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
