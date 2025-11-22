import { NextRequest, NextResponse } from 'next/server';
import { db, docToObject } from '@/lib/firebase';
import { Payment, Order, User } from '@/lib/types';

// Helper function to get user by email
async function getUserByEmail(email: string): Promise<User | null> {
  const usersRef = db.collection('users');
  const querySnapshot = await usersRef.where('email', '==', email.toLowerCase()).get();
  
  if (querySnapshot.empty) {
    return null;
  }
  
  return docToObject<User>(querySnapshot.docs[0]);
}

// POST - Save payment details
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      orderId,
      email,
      paymentMethod,
      upiId,
      paymentScreenshot,
      cardLast4,
      cardName,
      amount,
      transactionId,
    } = data;

    if (!orderId || !paymentMethod || !amount) {
      return NextResponse.json(
        { error: 'Order ID, payment method, and amount are required' },
        { status: 400 }
      );
    }

    // Find order by orderId (not document ID)
    const ordersRef = db.collection('orders');
    const querySnapshot = await ordersRef.where('orderId', '==', orderId).get();

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const orderDoc = querySnapshot.docs[0];
    const order = docToObject<Order>(orderDoc);

    // Find user if email provided
    let userId: string | null = null;
    if (email) {
      const user = await getUserByEmail(email);
      if (user) {
        userId = user.id!;
      }
    }

    // Create or update payment
    const paymentsRef = db.collection('payments');
    const paymentQuerySnapshot = await paymentsRef.where('orderId', '==', orderDoc.id).get();

    const now = new Date();
    let payment: Payment;

    if (paymentQuerySnapshot.empty) {
      // Create new payment
      const newPaymentRef = paymentsRef.doc();
      payment = {
        id: newPaymentRef.id,
        userId,
        orderId: orderDoc.id,
        paymentMethod,
        upiId: paymentMethod === 'UPI' ? upiId : undefined,
        paymentScreenshot: paymentMethod === 'UPI' ? paymentScreenshot : undefined,
        cardLast4: paymentMethod === 'CARD' ? cardLast4 : undefined,
        cardName: paymentMethod === 'CARD' ? cardName : undefined,
        amount,
        status: paymentMethod === 'COD' ? 'pending' : paymentScreenshot ? 'completed' : 'pending',
        transactionId,
        createdAt: now,
        updatedAt: now,
      };
      await newPaymentRef.set(payment);
    } else {
      // Update existing payment
      const paymentDoc = paymentQuerySnapshot.docs[0];
      payment = docToObject<Payment>(paymentDoc);
      
      payment.userId = userId;
      payment.paymentMethod = paymentMethod;
      payment.upiId = paymentMethod === 'UPI' ? upiId : undefined;
      payment.paymentScreenshot = paymentMethod === 'UPI' ? paymentScreenshot : undefined;
      payment.cardLast4 = paymentMethod === 'CARD' ? cardLast4 : undefined;
      payment.cardName = paymentMethod === 'CARD' ? cardName : undefined;
      payment.amount = amount;
      payment.status = paymentMethod === 'COD' ? 'pending' : paymentScreenshot ? 'completed' : 'pending';
      payment.transactionId = transactionId;
      payment.updatedAt = now;

      await paymentDoc.ref.update(payment);
    }

    // Update order payment status
    if (payment.status === 'completed') {
      order.paymentStatus = 'completed';
      order.orderStatus = 'confirmed';
      order.updatedAt = now;
      await orderDoc.ref.update(order);
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        paymentMethod: payment.paymentMethod,
        status: payment.status,
        amount: payment.amount,
      },
    });
  } catch (error) {
    console.error('Error saving payment:', error);
    return NextResponse.json(
      { error: 'Failed to save payment' },
      { status: 500 }
    );
  }
}

// GET - Get payment by order ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Find order by orderId
    const ordersRef = db.collection('orders');
    const querySnapshot = await ordersRef.where('orderId', '==', orderId).get();

    if (querySnapshot.empty) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const orderDoc = querySnapshot.docs[0];

    // Find payment by order document ID
    const paymentsRef = db.collection('payments');
    const paymentQuerySnapshot = await paymentsRef.where('orderId', '==', orderDoc.id).get();

    if (paymentQuerySnapshot.empty) {
      return NextResponse.json({ payment: null });
    }

    const payment = docToObject<Payment>(paymentQuerySnapshot.docs[0]);

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        paymentMethod: payment.paymentMethod,
        status: payment.status,
        amount: payment.amount,
        transactionId: payment.transactionId,
      },
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment' },
      { status: 500 }
    );
  }
}
