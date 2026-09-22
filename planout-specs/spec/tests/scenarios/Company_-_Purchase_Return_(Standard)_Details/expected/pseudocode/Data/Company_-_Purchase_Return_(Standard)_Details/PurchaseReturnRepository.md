/**
 * Fetches the complete Purchase Return record including items and workflow status.
 * Maps the database schema to the Detail Response JSON structure.
 */
function getPurchaseReturnDetails(id: UUID) {
    const purchaseReturn = db.PurchaseReturn.findUnique({
        where: { id },
        include: {
            items: true,
            purchaseDeliveries: true, // Linked via join table
            journals: true            // Linked via join table
        }
    });

    return {
        document_number: purchaseReturn.document_number,
        reference_number: purchaseReturn.reference_number,
        type: purchaseReturn.type,
        purchase_order_id: purchaseReturn.purchase_order_id,
        purchase_delivery_ids: purchaseReturn.purchaseDeliveries.map(pd => pd.id),
        invoice_id: purchaseReturn.invoice_id,
        ap_payment_id: purchaseReturn.ap_payment_id,
        status: purchaseReturn.status,
        amounts: {
            subtotal: purchaseReturn.subtotal,
            discount: purchaseReturn.discount,
            net_subtotal: purchaseReturn.net_subtotal,
            tax: purchaseReturn.tax,
            total: purchaseReturn.total,
            allocated_credit_amount: purchaseReturn.allocated_credit_amount
        },
        items: purchaseReturn.items.map((item, index) => ({
            row_number: index + 1,
            sku: item.sku,
            product_name: item.product_name,
            remaining_qty: item.remaining_qty,
            warehouse_qty: item.warehouse_qty,
            return_qty: item.return_qty,
            supplier_confirmed_qty: item.supplier_confirmed_qty,
            confirmed_qty: item.confirmed_qty,
            price: item.price,
            type: item.type,
            reason: item.reason
        })),
        totals: {
            remaining_qty: sum(purchaseReturn.items.map(i => i.remaining_qty)),
            warehouse_qty: sum(purchaseReturn.items.map(i => i.warehouse_qty)),
            return_qty: sum(purchaseReturn.items.map(i => i.return_qty)),
            supplier_confirmed_qty: sum(purchaseReturn.items.map(i => i.supplier_confirmed_qty)),
            confirmed_qty: sum(purchaseReturn.items.map(i => i.confirmed_qty))
        },
        audit: {
            created_at: purchaseReturn.created_at,
            sent_at: purchaseReturn.sent_at,
            approved_at: purchaseReturn.approved_at,
            created_by: purchaseReturn.created_by,
            updated_by: purchaseReturn.updated_by,
            updated_at: purchaseReturn.updated_at
        }
    };
}

/**
 * Fetches minimal data required for the Approval workflow step.
 */
function getPurchaseReturnApprovalData(id: UUID) {
    return db.PurchaseReturn.findUnique({
        where: { id },
        select: {
            id: true,
            document_number: true,
            status: true,
            total: true,
            approved_at: true
        }
    });
}