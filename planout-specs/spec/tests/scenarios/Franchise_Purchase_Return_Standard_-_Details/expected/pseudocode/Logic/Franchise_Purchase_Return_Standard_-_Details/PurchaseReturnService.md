/**
 * Fetches the detailed information for a specific Franchise Purchase Return.
 * Orchestrates the retrieval of the header record and its associated line items.
 */
async function getPurchaseReturnDetails(purchaseReturnId) {
    // Fetch the main PurchaseReturn record
    const purchaseReturn = await db.PurchaseReturn.findUnique({
        where: { id: purchaseReturnId }
    });

    // Fetch all associated PurchaseReturnItems
    const items = await db.PurchaseReturnItem.findMany({
        where: { purchase_return_id: purchaseReturnId }
    });

    // Fetch related Franchise and PurchaseOrder names for display
    const franchise = await db.Franchise.findUnique({
        where: { id: purchaseReturn.franchise_id }
    });
    
    const purchaseOrder = await db.PurchaseOrder.findUnique({
        where: { id: purchaseReturn.purchase_order_id }
    });

    return {
        ...purchaseReturn,
        items,
        franchise_name: franchise.name,
        po_number: purchaseOrder.po_number,
        // Mapping additional fields requested in UI requirements
        notes: purchaseReturn.notes, <!-- MISSING_FIELD: PurchaseReturn.notes -->
        return_type: purchaseReturn.type, <!-- MISSING_FIELD: PurchaseReturn.type -->
        invoice_link: purchaseReturn.invoice_id, <!-- MISSING_FIELD: PurchaseReturn.invoice_id -->
        warehouse_link: purchaseReturn.warehouse_id, <!-- MISSING_FIELD: PurchaseReturn.warehouse_id -->
        supplier_link: purchaseReturn.supplier_id, <!-- MISSING_FIELD: PurchaseReturn.supplier_id -->
        journals_list: purchaseReturn.journal_entry_id, <!-- MISSING_FIELD: PurchaseReturn.journal_entry_id -->
        updated_at: purchaseReturn.updated_at, <!-- MISSING_FIELD: PurchaseReturn.updated_at -->
        sent_at: purchaseReturn.sent_at, <!-- MISSING_FIELD: PurchaseReturn.sent_at -->
        created_by: purchaseReturn.created_by, <!-- MISSING_FIELD: PurchaseReturn.created_by -->
        updated_by: purchaseReturn.updated_by <!-- MISSING_FIELD: PurchaseReturn.updated_by -->
    };
}