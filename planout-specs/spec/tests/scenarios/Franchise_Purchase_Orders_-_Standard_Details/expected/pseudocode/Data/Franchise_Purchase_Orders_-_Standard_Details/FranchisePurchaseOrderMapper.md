/**
 * Maps the FranchisePurchaseOrder entity to the UI Detail View labels.
 */
function mapOrderToDetailsView(order: FranchisePurchaseOrder) {
    return {
        "Document No": order.ref_code,
        "Reference Number": order.supplier_ref_code,
        "From Direct Supplier": order.supplier_name,
        "Deliver To": order.store_name,
        "Created By": order.creator_name,
        "Updated By": order.updater_name,
        "Notes": order.notes,
        "Created At": order.created_at,
        "Updated At": order.updated_at,
        "Due Date": order.due_at,
        "Placed At": order.placed_at,
        "Received Date": order.received_at,
        "Journal": order.journal_ref_code,
        "SubTotal": order.subtotal,
        "Total Discount": order.discount_total,
        "Net Subtotal": order.net_subtotal,
        "Tax": order.tax_total,
        "Total": order.total
    };
}

/**
 * Maps the FranchisePurchaseOrderItem entity to the UI Line Table columns.
 */
function mapItemsToTableView(items: List<FranchisePurchaseOrderItem>) {
    return items.map(item => ({
        "No": item.line_no,
        "SKU": item.sku,
        "Product": item.product_name,
        "Product Code": item.product_code,
        "Order": item.quantity,
        "Receive": item.received_quantity,
        "Supply Price Exc. Tax (Rp)": item.supply_price,
        "Discount": item.discount,
        "Order Amount": item.order_amount,
        "Receive Amount (Rp)": item.receive_amount
    }));
}