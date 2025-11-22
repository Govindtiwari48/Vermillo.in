/**
 * Google Apps Script Code for Order Management
 * 
 * This script receives order data from your Next.js app and saves it to Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets and create a new spreadsheet
 * 2. Name it "Vermillo Orders" (or your preferred name)
 * 3. Go to Extensions > Apps Script
 * 4. Delete the default code and paste this entire file
 * 5. Update the SPREADSHEET_ID variable below with your spreadsheet ID
 * 6. Update the SHEET_NAME if you want a different sheet name (default is "Orders")
 * 7. Click Save (Ctrl/Cmd + S) and give your project a name
 * 8. Click Deploy > New deployment
 * 9. Select type: Web app
 * 10. Set Execute as: Me
 * 11. Set Who has access: Anyone (or Anyone with Google account if you prefer)
 * 12. Click Deploy
 * 13. Copy the Web App URL and add it to your .env.local file as GOOGLE_APPS_SCRIPT_URL
 * 14. Click "Authorize access" when prompted and grant necessary permissions
 * 
 * SPREADSHEET ID:
 * - Open your Google Sheet
 * - Look at the URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
 * - Copy the SPREADSHEET_ID part
 */

// ==================== CONFIGURATION ====================
const SPREADSHEET_ID = '1GLyFdtldZJeTQpd2FWsrN7WUZOws0MeT55heFe9QQ8I'; // Replace with your spreadsheet ID
const SHEET_NAME = 'Orders'; // Change if you want a different sheet name

// ==================== MAIN FUNCTION ====================
/**
 * This function is called when a POST request is sent to the Web App URL
 */
function doPost(e) {
    try {
        // Parse the incoming data
        const data = JSON.parse(e.postData.contents);

        // Open the spreadsheet
        const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
        let sheet = spreadsheet.getSheetByName(SHEET_NAME);

        // Create the sheet if it doesn't exist
        if (!sheet) {
            sheet = spreadsheet.insertSheet(SHEET_NAME);
            // Set up headers
            setHeaders(sheet);
        }

        // Check if headers exist, if not, add them
        if (sheet.getLastRow() === 0) {
            setHeaders(sheet);
        }

        // Process items (each item gets its own row)
        const rows = [];

        if (data.items && Array.isArray(data.items)) {
            data.items.forEach((item, index) => {
                const row = [
                    data.timestamp || new Date().toISOString(),
                    data.orderId || 'N/A',
                    data.firstName || '',
                    data.lastName || '',
                    data.email || '',
                    data.phone || '',
                    data.address || '',
                    item.productId || '',
                    item.productName || '',
                    item.quantity || 0,
                    item.price || 0,
                    item.total || 0,
                    item.size || 'N/A',
                    item.color || 'N/A',
                    data.subtotal || 0,
                    data.shipping || 0,
                    data.tax || 0,
                    data.total || 0,
                    index === 0 ? 'Yes' : 'No' // Mark first item as primary
                ];
                rows.push(row);
            });
        } else {
            // If no items array, create a single row
            const row = [
                data.timestamp || new Date().toISOString(),
                data.orderId || 'N/A',
                data.firstName || '',
                data.lastName || '',
                data.email || '',
                data.phone || '',
                data.address || '',
                'N/A',
                'N/A',
                0,
                0,
                0,
                'N/A',
                'N/A',
                data.subtotal || 0,
                data.shipping || 0,
                data.tax || 0,
                data.total || 0,
                'Yes'
            ];
            rows.push(row);
        }

        // Add the data rows
        if (rows.length > 0) {
            sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);

            // Format the new rows
            const startRow = sheet.getLastRow() - rows.length + 1;
            formatRow(sheet, startRow, rows.length);
        }

        // Return success response
        return ContentService.createTextOutput(JSON.stringify({
            success: true,
            message: 'Order saved successfully',
            rowsAdded: rows.length
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Log error and return error response
        Logger.log('Error: ' + error.toString());
        return ContentService.createTextOutput(JSON.stringify({
            success: false,
            error: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Sets up the header row in the sheet
 */
function setHeaders(sheet) {
    const headers = [
        'Timestamp',
        'Order ID',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Address',
        'Product ID',
        'Product Name',
        'Quantity',
        'Price',
        'Item Total',
        'Size',
        'Color',
        'Subtotal',
        'Shipping',
        'Tax',
        'Total',
        'Primary Item'
    ];

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#3D3D3D');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontSize(11);

    // Freeze header row
    sheet.setFrozenRows(1);

    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
}

/**
 * Formats a data row
 */
function formatRow(sheet, startRow, numRows) {
    const range = sheet.getRange(startRow, 1, numRows, 19);

    // Set borders
    range.setBorder(true, true, true, true, true, true);

    // Format number columns
    sheet.getRange(startRow, 10, numRows, 1).setNumberFormat('#,##0'); // Quantity
    sheet.getRange(startRow, 11, numRows, 1).setNumberFormat('$#,##0.00'); // Price
    sheet.getRange(startRow, 12, numRows, 1).setNumberFormat('$#,##0.00'); // Item Total
    sheet.getRange(startRow, 15, numRows, 4).setNumberFormat('$#,##0.00'); // Financial columns

    // Format date column
    sheet.getRange(startRow, 1, numRows, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');

    // Alternate row colors for readability
    for (let i = 0; i < numRows; i++) {
        const row = startRow + i;
        if (row % 2 === 0) {
            sheet.getRange(row, 1, 1, 19).setBackground('#FAFAFA');
        } else {
            sheet.getRange(row, 1, 1, 19).setBackground('#FFFFFF');
        }
    }
}

/**
 * Test function - can be run manually to verify setup
 */
function testSetup() {
    const testData = {
        timestamp: new Date().toISOString(),
        orderId: 'TEST-' + Date.now(),
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '+1234567890',
        address: '123 Test St, Test City, TS 12345, Test Country',
        items: [
            {
                productId: 'TEST-001',
                productName: 'Test Product',
                quantity: 2,
                price: 29.99,
                total: 59.98,
                size: 'M',
                color: 'Black'
            }
        ],
        subtotal: 59.98,
        shipping: 15.00,
        tax: 4.80,
        total: 79.78
    };

    const mockEvent = {
        postData: {
            contents: JSON.stringify(testData)
        }
    };

    const result = doPost(mockEvent);
    Logger.log(result.getContent());
}


