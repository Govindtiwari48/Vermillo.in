# Troubleshooting Guide

## Issue 1: WhatsApp Number Not Working

### Symptoms
- WhatsApp button shows default number (1234567890)
- Your number from `.env` is not being used

### Solutions

1. **Check Environment Variable Format**
   - ✅ Correct: `NEXT_PUBLIC_WHATSAPP_NUMBER=91936941502`
   - ❌ Wrong: `NEXT_PUBLIC_WHATSAPP_NUMBER=+91936941502` (has + sign)
   - ❌ Wrong: `NEXT_PUBLIC_WHATSAPP_NUMBER=+91 936941502` (has spaces)

2. **Restart Your Development Server**
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart
   npm run dev
   ```
   ⚠️ **Important**: Next.js only reads environment variables when the server starts. You MUST restart after changing `.env` files.

3. **Check File Location**
   - Use `.env.local` (recommended for local development)
   - Or `.env` (also works)
   - Make sure the file is in the project root (same level as `package.json`)

4. **Verify Variable Name**
   - Must start with `NEXT_PUBLIC_` to be available in client-side code
   - Exact name: `NEXT_PUBLIC_WHATSAPP_NUMBER`

5. **Check for Typos**
   - No quotes around the value
   - No spaces around the `=` sign
   - No trailing spaces

## Issue 2: Orders Not Appearing in Google Sheets

### Symptoms
- Test function works in Google Apps Script
- Orders placed through website don't appear in sheet
- No errors shown to user

### Step-by-Step Debugging

#### Step 1: Check Server Logs
When you place an order, check your terminal/console where `npm run dev` is running. You should see:
- `📦 Processing order: ORD-...`
- `🔗 Script URL exists: true`
- `📤 Sending data to Google Sheets: {...}`
- `📥 Response status: 200`
- `✅ Successfully saved to Google Sheets: {...}`

If you see errors, they will be logged with ❌ emoji.

#### Step 2: Verify Environment Variable
Check that `GOOGLE_APPS_SCRIPT_URL` is set in `.env.local`:

```bash
# In your terminal, run:
cat .env.local | grep GOOGLE_APPS_SCRIPT_URL
```

You should see your URL. If not:
1. Add it to `.env.local`
2. Restart the server

#### Step 3: Verify Google Apps Script URL Format
The URL should look like:
```
https://script.google.com/macros/s/AKfycby.../exec
```

NOT:
```
https://script.google.com/macros/s/AKfycby.../dev  ❌ (wrong - has /dev)
```

#### Step 4: Check Google Apps Script Deployment Settings
1. Go to Google Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Verify:
   - ✅ **Execute as**: Me
   - ✅ **Who has access**: Anyone (or "Anyone with Google account")
   - ✅ **Version**: Latest version (or a specific version)

#### Step 5: Test the URL Directly
Open a new terminal and test:

```bash
curl -X POST "YOUR_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2024-01-01T00:00:00.000Z",
    "orderId": "TEST-123",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "address": "123 Test St",
    "items": [{
      "productId": "TEST-001",
      "productName": "Test Product",
      "quantity": 1,
      "price": 10.00,
      "total": 10.00,
      "size": "M",
      "color": "Black"
    }],
    "subtotal": 10.00,
    "shipping": 15.00,
    "tax": 0.80,
    "total": 25.80
  }'
```

If this works, the issue is with the Next.js app. If it doesn't, the issue is with Google Apps Script.

#### Step 6: Check Google Apps Script Execution Logs
1. In Google Apps Script editor
2. Click **Executions** (clock icon on left)
3. Look for recent executions
4. Click on failed executions to see error details

Common errors:
- **Permission denied**: Redeploy and set "Who has access" to "Anyone"
- **Invalid SPREADSHEET_ID**: Check the ID in your script
- **Sheet not found**: Make sure the sheet name matches

#### Step 7: Verify CORS Settings
Google Apps Script Web Apps should handle CORS automatically if:
- ✅ Deployed as Web App (not API)
- ✅ "Who has access" is set correctly
- ✅ Using POST method

#### Step 8: Check Network Tab (Browser DevTools)
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Place an order
4. Look for request to `/api/orders`
5. Check:
   - Status code (should be 200)
   - Response body
   - Any error messages

## Common Fixes

### Fix 1: Restart Server After Changing .env
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Fix 2: Redeploy Google Apps Script
1. In Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click edit (pencil icon)
4. Change version to **New version**
5. Click **Deploy**
6. Copy the new URL (if it changed)
7. Update `.env.local`

### Fix 3: Check Spreadsheet ID
1. Open your Google Sheet
2. Look at URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
3. Copy the ID between `/d/` and `/edit`
4. Update `SPREADSHEET_ID` in `google-apps-script.js`
5. Save and redeploy

### Fix 4: Verify Sheet Name
1. Check sheet name in Google Sheets (tab name at bottom)
2. Update `SHEET_NAME` in `google-apps-script.js` if different
3. Default is `'Orders'`

## Still Not Working?

1. **Check all console logs** - Both server and browser
2. **Test with curl** - See Step 5 above
3. **Verify spreadsheet permissions** - Make sure your Google account has access
4. **Check Google Apps Script quotas** - You might have hit daily limits
5. **Try testSetup() function** - Run it in Apps Script to verify the script works

## Quick Checklist

Before asking for help, verify:
- [ ] Restarted server after changing `.env` files
- [ ] WhatsApp number has no `+`, spaces, or dashes
- [ ] `GOOGLE_APPS_SCRIPT_URL` is set in `.env.local`
- [ ] URL format is correct (ends with `/exec`)
- [ ] Google Apps Script is deployed as Web App
- [ ] "Who has access" is set to "Anyone"
- [ ] Spreadsheet ID is correct in the script
- [ ] Checked server console logs for errors
- [ ] Checked browser console for errors
- [ ] Tested the URL directly with curl


