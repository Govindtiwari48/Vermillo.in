import { NextRequest, NextResponse } from 'next/server';
import { db, docToObject } from '@/lib/firebase';
import { Address, User } from '@/lib/types';

// Helper function to get user by email
async function getUserByEmail(email: string): Promise<User | null> {
  const usersRef = db.collection('users');
  const querySnapshot = await usersRef.where('email', '==', email.toLowerCase()).get();
  
  if (querySnapshot.empty) {
    return null;
  }
  
  return docToObject<User>(querySnapshot.docs[0]);
}

// Helper function to create user by email
async function createUserByEmail(email: string, phone: string, firstName: string, lastName: string): Promise<User> {
  const usersRef = db.collection('users');
  const newUserRef = usersRef.doc();
  const now = new Date();
  
  const user: User = {
    id: newUserRef.id,
    email: email.toLowerCase(),
    phone,
    firstName,
    lastName,
    createdAt: now,
    updatedAt: now,
  };
  
  await newUserRef.set(user);
  return user;
}

// GET - Get all addresses for a user
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

    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json({ addresses: [] });
    }

    const addressesRef = db.collection('addresses');
    const querySnapshot = await addressesRef
      .where('userId', '==', user.id)
      .orderBy('isDefault', 'desc')
      .orderBy('createdAt', 'desc')
      .get();

    const addresses = querySnapshot.docs.map((doc) => {
      const addr = docToObject<Address>(doc);
      return {
        id: addr.id,
        isDefault: addr.isDefault,
        firstName: addr.firstName,
        lastName: addr.lastName,
        email: addr.email,
        phone: addr.phone,
        address: addr.address,
        city: addr.city,
        state: addr.state,
        zipCode: addr.zipCode,
        country: addr.country,
      };
    });

    return NextResponse.json({
      success: true,
      addresses,
    });
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch addresses' },
      { status: 500 }
    );
  }
}

// POST - Create new address
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, ...addressData } = data;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await getUserByEmail(email);
    if (!user) {
      user = await createUserByEmail(
        email,
        addressData.phone || '',
        addressData.firstName || '',
        addressData.lastName || ''
      );
    }

    // If this is set as default, unset other defaults
    if (addressData.isDefault) {
      const addressesRef = db.collection('addresses');
      const querySnapshot = await addressesRef.where('userId', '==', user.id).get();
      
      const batch = db.batch();
      querySnapshot.docs.forEach((doc) => {
        batch.update(doc.ref, { isDefault: false });
      });
      await batch.commit();
    }

    // Create new address
    const addressesRef = db.collection('addresses');
    const newAddressRef = addressesRef.doc();
    const now = new Date();
    
    const address: Address = {
      id: newAddressRef.id,
      userId: user.id!,
      ...addressData,
      isDefault: addressData.isDefault || false,
      createdAt: now,
      updatedAt: now,
    };

    await newAddressRef.set(address);

    return NextResponse.json({
      success: true,
      address: {
        id: address.id,
        isDefault: address.isDefault,
        firstName: address.firstName,
        lastName: address.lastName,
        email: address.email,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
      },
    });
  } catch (error) {
    console.error('Error creating address:', error);
    return NextResponse.json(
      { error: 'Failed to create address' },
      { status: 500 }
    );
  }
}

// PUT - Update address
export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { addressId, email, ...updateData } = data;

    if (!addressId || !email) {
      return NextResponse.json(
        { error: 'Address ID and email are required' },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const addressRef = db.collection('addresses').doc(addressId);
    const addressDoc = await addressRef.get();

    if (!addressDoc.exists) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      );
    }

    const address = docToObject<Address>(addressDoc);

    if (address.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // If setting as default, unset other defaults
    if (updateData.isDefault) {
      const addressesRef = db.collection('addresses');
      const querySnapshot = await addressesRef.where('userId', '==', user.id).get();
      
      const batch = db.batch();
      querySnapshot.docs.forEach((doc) => {
        if (doc.id !== addressId) {
          batch.update(doc.ref, { isDefault: false });
        }
      });
      await batch.commit();
    }

    // Update address
    updateData.updatedAt = new Date();
    await addressRef.update(updateData);

    const updatedAddressDoc = await addressRef.get();
    const updatedAddress = docToObject<Address>(updatedAddressDoc);

    return NextResponse.json({
      success: true,
      address: {
        id: updatedAddress.id,
        isDefault: updatedAddress.isDefault,
        firstName: updatedAddress.firstName,
        lastName: updatedAddress.lastName,
        email: updatedAddress.email,
        phone: updatedAddress.phone,
        address: updatedAddress.address,
        city: updatedAddress.city,
        state: updatedAddress.state,
        zipCode: updatedAddress.zipCode,
        country: updatedAddress.country,
      },
    });
  } catch (error) {
    console.error('Error updating address:', error);
    return NextResponse.json(
      { error: 'Failed to update address' },
      { status: 500 }
    );
  }
}

// DELETE - Delete address
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const addressId = searchParams.get('addressId');
    const email = searchParams.get('email');

    if (!addressId || !email) {
      return NextResponse.json(
        { error: 'Address ID and email are required' },
        { status: 400 }
      );
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const addressRef = db.collection('addresses').doc(addressId);
    const addressDoc = await addressRef.get();

    if (!addressDoc.exists) {
      return NextResponse.json(
        { error: 'Address not found' },
        { status: 404 }
      );
    }

    const address = docToObject<Address>(addressDoc);

    if (address.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    await addressRef.delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting address:', error);
    return NextResponse.json(
      { error: 'Failed to delete address' },
      { status: 500 }
    );
  }
}
