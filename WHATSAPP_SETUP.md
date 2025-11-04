# WhatsApp Integration Quick Reference

## Setting Your WhatsApp Number

1. Open your `.env.local` file in the project root
2. Add or update this line:
   ```
   NEXT_PUBLIC_WHATSAPP_NUMBER=YOUR_NUMBER_HERE
   ```
3. Replace `YOUR_NUMBER_HERE` with your WhatsApp number in this format:
   - Remove all formatting (no `+`, spaces, dashes, or parentheses)
   - Include country code
   - Numbers only

## Format Examples

**International Format → Code Format**
- `+1 (234) 567-8900` → `12345678900`
- `+91 98765 43210` → `919876543210`
- `+44 20 7946 0958` → `442079460958`
- `+61 2 9876 5432` → `61298765432`

## How It Works

1. Customer completes checkout
2. Order is saved to Google Sheets
3. Customer is redirected to shipment/confirmation page
4. A pre-filled WhatsApp message is generated containing:
   - Customer information (name, email, phone)
   - Shipping address
   - All order items with quantities
   - Total amount
5. Customer clicks "Send Order via WhatsApp" button
6. WhatsApp opens with the message ready to send
7. Customer just needs to click "Send"

## Testing

1. Place a test order
2. On the shipment page, click "Send Order via WhatsApp"
3. Verify the message contains all order details
4. Verify the WhatsApp number is correct

## Troubleshooting

**Message not appearing:**
- Check `.env.local` has `NEXT_PUBLIC_WHATSAPP_NUMBER` set
- Restart your Next.js server after changing environment variables
- Verify the number format (numbers only, no formatting)

**Wrong WhatsApp number:**
- Double-check the format in `.env.local`
- Make sure there are no extra spaces or characters

**WhatsApp link not opening:**
- Verify the number format
- Test manually: `https://wa.me/YOUR_NUMBER?text=Hello`


