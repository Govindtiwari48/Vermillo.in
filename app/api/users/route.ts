import { NextRequest, NextResponse } from 'next/server';
import { db, docToObject } from '@/lib/firebase';
import { User } from '@/lib/types';

// POST - Create or update user
export async function POST(request: NextRequest) {
  try {
    const { email, phone, firstName, lastName } = await request.json();

    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Email and phone are required' },
        { status: 400 }
      );
    }

    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('email', '==', email.toLowerCase()).get();

    let user: User;
    const now = new Date();

    if (querySnapshot.empty) {
      // Create new user
      const newUserRef = usersRef.doc();
      user = {
        id: newUserRef.id,
        email: email.toLowerCase(),
        phone,
        firstName: firstName || '',
        lastName: lastName || '',
        createdAt: now,
        updatedAt: now,
      };
      await newUserRef.set(user);
    } else {
      // Update existing user
      const userDoc = querySnapshot.docs[0];
      user = docToObject<User>(userDoc);
      
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (phone) user.phone = phone;
      user.updatedAt = now;

      await userDoc.ref.update(user);
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error('Error in user API:', error);
    return NextResponse.json(
      { error: 'Failed to process user request' },
      { status: 500 }
    );
  }
}

// GET - Get user by email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const usersRef = db.collection('users');
    const querySnapshot = await usersRef.where('email', '==', email.toLowerCase()).get();

    if (querySnapshot.empty) {
      return NextResponse.json({ user: null });
    }

    const user = docToObject<User>(querySnapshot.docs[0]);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error('Error in user API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
