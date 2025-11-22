# Firebase Setup Guide - Step by Step

This comprehensive guide will help you set up Firebase for authentication, Firestore database, and storage for your e-commerce website.

## Prerequisites
- A Google account (Gmail account)
- Basic understanding of web development
- Node.js and npm installed

---

## Step 1: Create Firebase Project

1. **Go to Firebase Console**: Visit https://console.firebase.google.com/
2. **Sign In**: Use your Google account to sign in
3. **Create Project**:
   - Click "Add project" or "Create a project"
   - Enter project name: `vermillo` (or your preferred name)
   - Click "Continue"
   - **Optional**: Disable Google Analytics (or enable if you want analytics)
   - Click "Create project"
   - Wait for project creation (30-60 seconds)
   - Click "Continue" when done

---

## Step 2: Enable Firestore Database

1. **Navigate to Firestore**:
   - In the left sidebar, click "Build" → "Firestore Database"
   - Click "Create database"

2. **Choose Security Rules**:
   - Select "Start in test mode" (for development)
   - Click "Next"
   - **Important**: We'll update security rules later for production

3. **Choose Location**:
   - Select a region closest to your users (e.g., `asia-south1` for India)
   - Click "Enable"
   - Wait for database creation (30-60 seconds)

4. **Security Rules** (Important for Production):
   - Go to "Rules" tab
   - For now, test mode is fine for development
   - For production, you'll need to set up proper rules

---

## Step 3: Enable Authentication

1. **Navigate to Authentication**:
   - In the left sidebar, click "Build" → "Authentication"
   - Click "Get started"

2. **Enable Sign-in Methods** (Optional - for future use):
   - Click "Sign-in method" tab
   - You can enable Email/Password, Google, etc. later
   - For now, we'll focus on database setup

---

## Step 4: Create Service Account (for Server-Side Access)

1. **Go to Project Settings**:
   - Click the gear icon ⚙️ next to "Project Overview"
   - Select "Project settings"

2. **Service Accounts Tab**:
   - Click "Service accounts" tab
   - Click "Generate new private key"
   - A dialog will appear: "Are you sure you want to generate a new private key?"
   - Click "Generate key"
   - A JSON file will be downloaded automatically

3. **Save the JSON File**:
   - **IMPORTANT**: Keep this file secure! Never commit it to git
   - The file contains sensitive credentials
   - Name it something like: `firebase-service-account.json`
   - Place it in your project root (but add it to `.gitignore`)

---

## Step 5: Get Firebase Configuration

1. **Still in Project Settings**:
   - Go to "Project settings" → "General" tab
   - Scroll down to "Your apps" section
   - Click the "Web" icon (</>) to add a web app

2. **Register App**:
   - Enter app nickname: `Vermillo Web`
   - Click "Register app"

3. **Copy Firebase Config**:
   - You'll see a config object like:
     ```javascript
     const firebaseConfig = {
       apiKey: "AIza...",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "123456789",
       appId: "1:123456789:web:abcdef"
     };
     ```
   - **Note these values** - we'll use the `projectId` for server-side

---

## Step 6: Extract Service Account Credentials

1. **Open the downloaded JSON file** (firebase-service-account.json)

2. **Extract these values**:
   ```json
   {
     "type": "service_account",
     "project_id": "your-project-id",
     "private_key_id": "abc123...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com",
     "client_id": "123456789",
     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
     "token_uri": "https://oauth2.googleapis.com/token",
     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
   }
   ```

3. **Copy each value** - you'll need them for `.env.local`

---

## Step 7: Configure Environment Variables

1. **Open `.env.local` file** in your project root

2. **Add Firebase Configuration**:
   ```env
   # Firebase Configuration (Server-Side)
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY_ID=abc123...
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_CLIENT_ID=123456789
   FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...
   ```

3. **Important Notes**:
   - Replace all values with your actual service account credentials
   - For `FIREBASE_PRIVATE_KEY`: Keep the quotes and `\n` characters
   - The private key should be on a single line with `\n` for line breaks
   - Example: `FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"`

4. **Keep existing variables**:
   ```env
   # Development only - Disable SSL verification for external image fetching
   NODE_TLS_REJECT_UNAUTHORIZED=0

   # Google Sheets Integration
   GOOGLE_APPS_SCRIPT_URL=your-google-sheets-url

   # WhatsApp Integration
   NEXT_PUBLIC_WHATSAPP_NUMBER=your-whatsapp-number

   # UPI Payment Integration
   NEXT_PUBLIC_UPI_ID=your-upi-id@paytm
   ```

5. **Save the file**

---

## Step 8: Add Firebase Service Account to .gitignore

1. **Open `.gitignore` file** (create if it doesn't exist)

2. **Add these lines**:
   ```
   # Firebase
   firebase-service-account.json
   .env.local
   .env
   ```

3. **Save the file**

---

## Step 9: Verify Installation

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Check for errors**:
   - Look for Firebase initialization errors in the terminal
   - If you see "Firebase Admin SDK credentials are missing", check your `.env.local` file

---

## Step 10: Test the Setup

1. **Test User Creation**:
   - Go through the checkout process
   - Create an order
   - Check Firebase Console → Firestore Database → `users` collection

2. **Verify Data**:
   - Go to Firebase Console → Firestore Database
   - You should see collections:
     - `users` - User information
     - `addresses` - Saved addresses
     - `orders` - All orders
     - `payments` - Payment details

3. **Check Data Structure**:
   - Click on any collection to see documents
   - Verify that data is being saved correctly

---

## Step 11: Set Up Firestore Security Rules (For Production)

1. **Go to Firestore Database** → **Rules** tab

2. **Update Rules** (for production):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users collection - users can read/write their own data
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Addresses - users can read/write their own addresses
       match /addresses/{addressId} {
         allow read, write: if request.auth != null && 
           resource.data.userId == request.auth.uid;
       }
       
       // Orders - users can read/write their own orders
       match /orders/{orderId} {
         allow read, write: if request.auth != null && 
           resource.data.userId == request.auth.uid;
       }
       
       // Payments - users can read their own payments
       match /payments/{paymentId} {
         allow read: if request.auth != null && 
           resource.data.userId == request.auth.uid;
         allow write: if false; // Only server can write payments
       }
     }
   }
   ```

3. **For Development** (temporary - only for testing):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true; // WARNING: Only for development!
       }
     }
   }
   ```
   **⚠️ WARNING**: This allows anyone to read/write. Only use for development!

4. **Click "Publish"**

---

## Step 12: Set Up Indexes (If Needed)

Firestore may require indexes for complex queries. If you see index errors:

1. **Click the error link** in the console
2. **Firebase will create the index automatically**
3. **Wait for index creation** (can take a few minutes)

Common indexes needed:
- `addresses`: `userId` (Ascending), `isDefault` (Descending), `createdAt` (Descending)
- `orders`: `orderId` (Ascending)
- `payments`: `orderId` (Ascending)

---

## Data Structure Overview

### Users Collection
```typescript
{
  id: string (auto-generated),
  email: string (lowercase),
  phone: string,
  firstName: string,
  lastName: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Addresses Collection
```typescript
{
  id: string (auto-generated),
  userId: string (reference to users),
  isDefault: boolean,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```typescript
{
  id: string (auto-generated),
  orderId: string (unique order identifier),
  userId: string | null,
  customer: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string
  },
  items: Array<OrderItem>,
  summary: {
    subtotal: number,
    shipping: number,
    tax: number,
    total: number
  },
  paymentMethod: 'COD' | 'UPI' | 'CARD',
  paymentStatus: 'pending' | 'completed' | 'failed',
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  paymentScreenshot?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Payments Collection
```typescript
{
  id: string (auto-generated),
  userId: string | null,
  orderId: string (reference to orders document ID),
  paymentMethod: 'COD' | 'UPI' | 'CARD',
  upiId?: string,
  paymentScreenshot?: string,
  cardLast4?: string,
  cardName?: string,
  amount: number,
  status: 'pending' | 'completed' | 'failed',
  transactionId?: string,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Troubleshooting

### Error: "Firebase Admin SDK credentials are missing"
- **Solution**: Check your `.env.local` file
- Ensure all Firebase environment variables are set
- Verify `FIREBASE_PRIVATE_KEY` has proper quotes and `\n` characters

### Error: "Permission denied" in Firestore
- **Solution**: Check Firestore security rules
- For development, use test mode rules
- For production, set up proper authentication-based rules

### Error: "Index required"
- **Solution**: Click the error link in the console
- Firebase will create the required index automatically
- Wait for index creation to complete

### Data not appearing in Firestore
- **Check**: 
  1. Firebase Console → Firestore Database
  2. Verify you're looking at the correct project
  3. Check browser console for errors
  4. Verify API routes are being called

### Private Key Format Issues
- **Problem**: Private key has line breaks
- **Solution**: Keep `\n` in the private key string
- Example: `"-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"`

---

## Free Tier Limitations

Firebase Free Tier (Spark Plan) includes:
- ✅ **1GB storage** (enough for ~10,000 orders)
- ✅ **10GB/month bandwidth**
- ✅ **50K reads/day**
- ✅ **20K writes/day**
- ✅ **20K deletes/day**
- ✅ **No time limit** (free forever)
- ✅ **No credit card required**

**Limitations**:
- Limited to 1GB storage
- Limited daily operations
- No automated backups (backup manually)

**Upgrade to Blaze Plan** (pay-as-you-go) when you need more:
- $0.06 per GB storage
- $0.18 per 100K reads
- $0.18 per 100K writes

---

## Security Best Practices

### For Development:
- ✅ Using environment variables (`.env.local`)
- ✅ `.env.local` is in `.gitignore`
- ✅ Service account JSON file is in `.gitignore`
- ⚠️ Using test mode Firestore rules (OK for development)

### For Production:
1. **Set Up Authentication**:
   - Enable Email/Password authentication
   - Implement proper user authentication in your app
   - Use Firebase Auth for user management

2. **Update Security Rules**:
   - Remove test mode rules
   - Implement proper authentication-based rules
   - Restrict access based on user ownership

3. **Environment Variables**:
   - Never commit `.env` files to git
   - Use platform-specific environment variable settings (Vercel, Netlify, etc.)
   - Rotate service account keys periodically

4. **Service Account**:
   - Keep service account JSON file secure
   - Never expose it in client-side code
   - Use environment variables instead

---

## Next Steps

1. ✅ Your Firebase is set up and connected
2. ✅ Firestore is storing user data, addresses, orders, and payments
3. ✅ API routes are using Firestore

### Optional Enhancements:

1. **Add Firebase Authentication**:
   - Enable Email/Password sign-in
   - Add Google Sign-in
   - Implement user authentication in your app

2. **Add Firebase Storage**:
   - For storing payment screenshots
   - For product images
   - For user avatars

3. **Add Real-time Updates**:
   - Use Firestore real-time listeners
   - Show live order status updates
   - Real-time notifications

4. **Add Cloud Functions**:
   - Automated order processing
   - Email notifications
   - Payment verification

5. **Create Admin Dashboard**:
   - View all orders
   - Update order status
   - Manage users

---

## Summary Checklist

- [ ] Created Firebase project
- [ ] Enabled Firestore Database
- [ ] Created service account and downloaded JSON
- [ ] Added Firebase environment variables to `.env.local`
- [ ] Added service account file to `.gitignore`
- [ ] Installed Firebase dependencies (`npm install`)
- [ ] Started development server (`npm run dev`)
- [ ] Tested checkout flow
- [ ] Verified data in Firestore Console
- [ ] Set up Firestore security rules
- [ ] Created necessary indexes (if needed)

---

## Support Resources

- **Firebase Documentation**: https://firebase.google.com/docs
- **Firestore Documentation**: https://firebase.google.com/docs/firestore
- **Firebase Console**: https://console.firebase.google.com/
- **Firebase Community**: https://firebase.google.com/support
- **Stack Overflow**: Tag `firebase` or `firestore`

---

**Congratulations! Your Firebase backend is now set up and ready to store user data, orders, and payment information! 🎉**

---

## Quick Reference: Environment Variables

Add these to your `.env.local`:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...
```

**Remember**: Never commit `.env.local` to git!

