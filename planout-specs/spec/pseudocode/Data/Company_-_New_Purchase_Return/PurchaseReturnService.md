/**
 * Business logic layer for fetching dependencies required by the form.
 */

FUNCTION getInvoiceDetails(invoiceId):
    // Fetches invoice data to auto-populate PO, Deliveries, and Product list
    SET invoice = SELECT * FROM Invoice WHERE id = invoiceId
    SET items = SELECT * FROM InvoiceItem WHERE invoice_id = invoiceId
    
    RETURN {
        invoice: invoice,
        purchase_order: invoice.purchase_order,
        purchase_deliveries: invoice.deliveries,
        products: items.map(item => ({
            product: item.product,
            price: item.unit_price,
            qty: 0,
            reason: ""
        }))
    }

FUNCTION validateReturnSubmission(formData):
    // Ensure return type is strictly 'Return'
    IF formData.return_type != 'Return':
        THROW Error("Invalid return type")
    
    // Ensure quantities do not exceed original invoice quantities
    FOR EACH item IN formData.products:
        IF item.qty > item.original_invoice_qty:
            THROW Error("Return quantity exceeds invoice quantity for " + item.product.name)