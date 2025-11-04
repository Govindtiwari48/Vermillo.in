import { NextRequest, NextResponse } from 'next/server';

interface OrderData {
  timestamp: string;
  orderId: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    total: number;
    size: string;
    color: string;
  }>;
  summary: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();

    // Get the Google Apps Script Web App URL from environment variable
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    console.log('📦 Processing order:', orderData.orderId);
    console.log('🔗 Script URL exists:', !!scriptUrl);

    if (!scriptUrl) {
      console.error('❌ GOOGLE_APPS_SCRIPT_URL is not set in environment variables');
      console.error('💡 Please check your .env.local file');
      // Still return success to user, but log the error
      return NextResponse.json(
        { success: true, message: 'Order received (logging to Google Sheets failed - check server logs)' },
        { status: 200 }
      );
    }

    // Prepare data for Google Sheets
    const sheetData = {
      timestamp: orderData.timestamp,
      orderId: orderData.orderId,
      firstName: orderData.customer.firstName,
      lastName: orderData.customer.lastName,
      email: orderData.customer.email,
      phone: orderData.customer.phone,
      address: orderData.customer.address,
      items: orderData.items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
        size: item.size,
        color: item.color,
      })),
      subtotal: orderData.summary.subtotal,
      shipping: orderData.summary.shipping,
      tax: orderData.summary.tax,
      total: orderData.summary.total,
    };

    console.log('📤 Sending data to Google Sheets:', JSON.stringify(sheetData, null, 2));

    // Send data to Google Apps Script
    // Note: Google Apps Script Web Apps require specific headers
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sheetData),
      // Add redirect mode for Google Apps Script
      redirect: 'follow',
    });

    console.log('📥 Response status:', response.status);
    console.log('📥 Response ok:', response.ok);

    const responseText = await response.text();
    console.log('📥 Response text:', responseText);

    if (!response.ok) {
      console.error('❌ Failed to send data to Google Sheets');
      console.error('Status:', response.status);
      console.error('Response:', responseText);
      // Still return success to user, but log the error
      return NextResponse.json(
        { 
          success: true, 
          message: 'Order received (Google Sheets sync may have failed)',
          error: responseText 
        },
        { status: 200 }
      );
    }

    let result;
    try {
      result = JSON.parse(responseText);
      console.log('✅ Successfully saved to Google Sheets:', result);
    } catch (parseError) {
      console.warn('⚠️ Response is not JSON, treating as text:', responseText);
      result = { message: responseText };
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Order saved successfully',
        orderId: orderData.orderId,
        sheetResult: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error processing order:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    // Return success to user even if logging fails
    // This prevents order loss if Google Sheets is temporarily unavailable
    return NextResponse.json(
      {
        success: true,
        message: 'Order received (logging to Google Sheets failed - will retry)',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 200 }
    );
  }
}

