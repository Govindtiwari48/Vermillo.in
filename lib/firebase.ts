import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
// This is used for server-side operations (API routes)

if (!getApps().length) {
  const serviceAccount = {
    type: 'service_account',
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  };

  // Validate required environment variables
  if (
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_PRIVATE_KEY ||
    !process.env.FIREBASE_CLIENT_EMAIL
  ) {
    throw new Error(
      'Firebase Admin SDK credentials are missing. Please check your .env.local file.'
    );
  }

  try {
    initializeApp({
      credential: cert(serviceAccount as any),
    });
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
}

// Get Firestore instance
export const db = getFirestore();

// Helper function to convert Firestore timestamp to Date
export const convertTimestamp = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  if (timestamp?.seconds) {
    return new Date(timestamp.seconds * 1000);
  }
  return timestamp as Date;
};

// Helper function to convert Firestore document to object
export const docToObject = <T>(doc: FirebaseFirestore.DocumentSnapshot): T => {
  const data = doc.data();
  if (!data) {
    throw new Error('Document data is undefined');
  }
  
  // Convert timestamps to Date objects
  const converted: any = {
    id: doc.id,
    ...data,
  };
  
  if (data.createdAt) {
    converted.createdAt = convertTimestamp(data.createdAt);
  }
  if (data.updatedAt) {
    converted.updatedAt = convertTimestamp(data.updatedAt);
  }
  
  return converted as T;
};



