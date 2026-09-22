/**
 * Fetches the header details for a specific Franchise Purchase Order.
 * Maps the FranchisePurchaseOrder entity fields to the UI labels.
 */
async function getFranchisePurchaseOrder(id: string) {
  const response = await fetch(`/api/franchise-purchase-orders/${id}`);
  const data = await response.json();
  
  return {
    documentNo: data.ref_code,
    referenceNumber: data.supplier_ref_code,
    fromDirectSupplier: data.supplier_name,
    deliverTo: data.store_name,
    createdBy: data.creator_name,
    updatedBy: data.updater_name,
    notes: data.notes,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    dueDate: data.due_at,
    placedAt: data.placed_at,
    receivedDate: data.received_at,
    journal: data.journal_ref_code,
    subTotal: data.subtotal,
    totalDiscount: data.discount_total,
    netSubtotal: data.net_subtotal,
    tax: data.tax_total,
    total: data.total
  };
}

/**
 * Fetches the line items for a specific Franchise Purchase Order.
 * Maps the FranchisePurchaseOrderItem entity fields to the table columns.
 */
async function getFranchisePurchaseOrderItems(id: string) {
  const response = await fetch(`/api/franchise-purchase-orders/${id}/items`);
  const data = await response.json(); // Expecting a paginated list
  
  return data.map((item: any) => ({
    no: item.line_no,
    sku: item.sku,
    product: item.product_name,
    productCode: item.product_code,
    order: item.quantity,
    receive: item.received_quantity,
    supplyPriceExcTax: item.supply_price,
    discount: item.discount,
    orderAmount: item.order_amount,
    receiveAmount: item.receive_amount
  }));
}