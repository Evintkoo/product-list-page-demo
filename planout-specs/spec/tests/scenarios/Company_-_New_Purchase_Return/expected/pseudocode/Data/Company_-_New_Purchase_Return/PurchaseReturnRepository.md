/**
 * Handles data persistence and retrieval for Purchase Returns.
 * Maps the UI form structure to the underlying database entities.
 */

FUNCTION createPurchaseReturn(formData):
    // 1. Generate unique document number (e.g., PR-YYYYMMDD-XXXX)
    SET docNumber = generateSequence("PURCHASE_RETURN_SEQ")
    
    // 2. Persist Header
    SET returnRecord = INSERT INTO PurchaseReturn (
        document_number, reference_number, return_type, supplier_id, 
        warehouse_id, invoice_id, purchase_order_id, notes, 
        subtotal, discount, tax, total
    ) VALUES (
        docNumber, formData.reference_number, formData.return_type, formData.supplier.id,
        formData.warehouse.id, formData.invoice.id, formData.purchase_order.id, formData.notes,
        formData.subtotal, formData.discount, formData.tax, formData.total
    )

    // 3. Persist Line Items
    FOR EACH item IN formData.products:
        INSERT INTO PurchaseReturnItem (
            purchase_return_id, product_id, price, qty, reason
        ) VALUES (
            returnRecord.id, item.product.id, item.price, item.qty, item.reason
        )
    
    RETURN returnRecord