/**
 * Logic to aggregate and map API response data for the UI components.
 */
export const mapFranchisePurchaseOrderData = (data: FranchisePurchaseOrderResponse) => {
  // Calculate summary totals for the table footer
  const summary = data.items.reduce((acc, item) => ({
    totalOrderQty: acc.totalOrderQty + item.order_qty,
    totalSentQty: acc.totalSentQty + item.sent_qty,
    totalReceivedQty: acc.totalReceivedQty + item.received_qty,
    totalOrderAmount: acc.totalOrderAmount + item.order_amount,
    totalSentAmount: acc.totalSentAmount + item.sent_amount,
    totalReceiveAmount: acc.totalReceiveAmount + item.receive_amount,
  }), {
    totalOrderQty: 0,
    totalSentQty: 0,
    totalReceivedQty: 0,
    totalOrderAmount: 0,
    totalSentAmount: 0,
    totalReceiveAmount: 0
  });

  return {
    headerDetails: {
      documentNo: data.ref_code,
      referenceNumber: data.supplier_ref_code,
      fromWarehouse: data.warehouse_name,
      deliverTo: data.store_name,
      fromSupplier: data.supplier_name,
      createdBy: data.creator_name,
      updatedBy: data.updater_name,
      notes: data.notes,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      dueDate: data.due_at,
      sentAt: data.sent_at,
      receivedAt: data.received_at,
      journal: "N/A" // Static placeholder as per requirements
    },
    workflow: {
      state: data.workflow_state
    },
    items: data.items,
    summary
  };
};