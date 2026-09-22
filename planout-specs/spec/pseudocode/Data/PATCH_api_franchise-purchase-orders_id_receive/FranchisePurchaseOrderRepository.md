/**
 * Fetches the order and its lines in a single transaction context.
 * Ensures the order belongs to the authenticated franchise/company.
 */
function getOrderWithLines(orderId: uuid, franchiseId: uuid) {
  return db.FranchisePurchaseOrder.findFirst({
    where: { id: orderId, franchise_id: franchiseId },
    include: { lines: true }
  });
}

/**
 * Atomically updates the order state and creates inventory movements.
 */
function receiveOrderTransaction(orderId: uuid, lines: Array<{product_id: uuid, receive_qty: integer}>) {
  return db.transaction(async (tx) => {
    // 1. Update order state
    const order = await tx.FranchisePurchaseOrder.update({
      where: { id: orderId },
      data: { franchise_workflow_state: 'store_received', updated_at: now() }
    });

    // 2. Update lines and create inventory movements
    for (const line of lines) {
      await tx.FranchisePurchaseOrderLine.update({
        where: { franchise_purchase_order_id: orderId, product_id: line.product_id },
        data: { receive_qty: line.receive_qty }
      });

      await tx.InventoryMovement.create({
        data: {
          product_id: line.product_id,
          franchise_id: order.franchise_id,
          quantity_change: line.receive_qty,
          movement_type: 'PURCHASE_RECEIPT',
          created_at: now()
        }
      });
    }
    
    return order;
  });
}