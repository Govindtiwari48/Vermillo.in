// Type definitions for Firebase Firestore collections

export interface User {
  id?: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Address {
  id?: string;
  userId: string;
  isDefault: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  size?: string;
  color?: string;
}

export interface Order {
  id?: string;
  orderId: string;
  userId: string | null;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  summary: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  paymentMethod: 'COD' | 'UPI' | 'CARD';
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentScreenshot?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Payment {
  id?: string;
  userId: string | null;
  orderId: string; // Reference to order document ID
  paymentMethod: 'COD' | 'UPI' | 'CARD';
  upiId?: string;
  paymentScreenshot?: string;
  cardLast4?: string;
  cardName?: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
