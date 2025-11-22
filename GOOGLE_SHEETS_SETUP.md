# Google Sheets Integration Setup Guide

This guide will walk you through setting up Google Sheets to automatically save all order data from your e-commerce store.

## Prerequisites

- A Google account
- Access to Google Sheets
- Your Next.js application running

## Step-by-Step Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **Blank** to create a new spreadsheet
3. Name it something like "Vermillo Orders" or "Store Orders"
4. **Copy the Spreadsheet ID from the URL**:
   - The URL will look like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
   - Copy the part between `/d/` and `/edit`

### Step 2: Set Up Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. A new tab will open with a blank script editor
3. Delete all the default code
4. Copy the entire contents of `google-apps-script.js` file from this project
5. Paste it into the Apps Script editor
6. **Important**: Replace `YOUR_SPREADSHEET_ID_HERE` on line 23 with the Spreadsheet ID you copied in Step 1
7. Click **Save** (Ctrl+S or Cmd+S) and name your project (e.g., "Order Management")

### Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Order Management API" (or any description)
   - **Execute as**: Me (your account)
   - **Who has access**: **Anyone** (important for API access)
5. Click **Deploy**
6. **Authorize the application**:
   - You'll be prompted to authorize the script
   - Click **Review Permissions**
   - Choose your Google account
   - Click **Advanced** → **Go to [Your Project Name] (unsafe)**
   - Click **Allow** to grant permissions
7. **Copy the Web App URL** - This is important! It will look like:
   ```
   https://script.google.com/macros/s/AKfycbyxxxxxxxxxxxxxxxxx/exec
   ```

### Step 4: Configure Your Next.js App

1. In your project root, create or edit the `.env.local` file:
   ```env
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_URL/exec
   NEXT_PUBLIC_WHATSAPP_NUMBER=1234567890
   ```

2. **Replace the URLs**:
   - `GOOGLE_APPS_SCRIPT_URL`: Paste the Web App URL from Step 3
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Enter your WhatsApp number in format: country code + number (no +, no spaces, no dashes)
     - Example: For +1 (234) 567-8900, use `12345678900`
     - Example: For +91 98765 43210, use `919876543210`

3. Save the file

### Step 5: Test the Setup

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. Place a test order through your checkout page

3. Check your Google Sheet - you should see the order data appear automatically

### Step 6: Test the Script Manually (Optional)

1. In Apps Script editor, you'll see a function called `testSetup`
2. Select it from the function dropdown at the top
3. Click **Run**
4. Authorize if prompted
5. Check the Execution log for any errors
6. Check your Google Sheet - you should see a test row

## WhatsApp Number Setup

### Finding Your WhatsApp Number

1. Open WhatsApp on your phone
2. Go to **Settings** → **Profile**
3. Your phone number is displayed in international format
4. Remove all formatting:
   - Remove the `+` sign
   - Remove spaces, dashes, and parentheses
   - Keep only digits

**Examples:**
- `+1 (234) 567-8900` → `12345678900`
- `+91 98765 43210` → `919876543210`
- `+44 20 7946 0958` → `442079460958`

## Troubleshooting

### Orders not appearing in Google Sheets

1. **Check the Spreadsheet ID**: Make sure you updated it in the Apps Script code
2. **Check Web App URL**: Verify the URL in `.env.local` matches the deployed Web App URL
3. **Check permissions**: Make sure the Web App is set to "Anyone" access
4. **Check server logs**: Look for errors in your Next.js console
5. **Check Apps Script logs**: 
   - In Apps Script editor, go to **Executions** (clock icon)
   - Check for any errors

### WhatsApp link not working

1. **Verify number format**: Must be numbers only, no special characters
2. **Test the URL manually**: 
   ```
   https://wa.me/YOUR_NUMBER?text=Hello
   ```
3. **Check environment variable**: Make sure `NEXT_PUBLIC_WHATSAPP_NUMBER` is set correctly

### CORS Errors

If you see CORS errors:
1. Make sure the Web App deployment has "Anyone" access
2. Redeploy the Web App after changing permissions

### Permission Errors

If you see permission errors:
1. In Apps Script, go to **Executions**
2. Click on the failed execution
3. Click **Review Permissions**
4. Grant all requested permissions

## Security Notes

- The Web App URL is public, but only your Next.js app knows about it
- Consider using environment variables in production
- The Google Sheet should be accessible only to authorized personnel
- Consider adding additional validation in the Apps Script if needed

## Data Structure

Each order will create one or more rows in your Google Sheet:
- One row per product/item in the order
- All customer and order details are included in each row
- The "Primary Item" column marks the first item of each order

## Sheet Columns

The Google Sheet will automatically have these columns:
1. Timestamp
2. Order ID
3. First Name
4. Last Name
5. Email
6. Phone
7. Address
8. Product ID
9. Product Name
10. Quantity
11. Price
12. Item Total
13. Size
14. Color
15. Subtotal
16. Shipping
17. Tax
18. Total
19. Primary Item

## Updating the Script

If you need to update the script:
1. Make changes in Apps Script editor
2. Click **Save**
3. Click **Deploy** → **Manage deployments**
4. Click the edit icon (pencil) next to your deployment
5. Change version to **New version**
6. Click **Deploy**

The Web App URL will remain the same - no need to update `.env.local`.

## Support

If you encounter issues:
1. Check the Apps Script execution logs
2. Check your Next.js server logs
3. Verify all environment variables are set correctly
4. Test with the `testSetup` function in Apps Script


