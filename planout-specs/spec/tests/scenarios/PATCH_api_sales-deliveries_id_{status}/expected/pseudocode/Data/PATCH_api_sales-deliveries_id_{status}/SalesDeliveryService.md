/**
 * Handles the business logic for transitioning a Sales Delivery status.
 * Operates within a database transaction to ensure data integrity.
 */
async function transitionDeliveryStatus(deliveryId: uuid, newStatus: string) {
  return await database.transaction(async (tx) => {
    // 1. Lock the Sales Delivery row for update
    const delivery = await tx.select('*')
      .from('SalesDelivery')
      .where({ id: deliveryId })
      .forUpdate()
      .first();

    if (!delivery) {
      throw new Error('NOT_FOUND');
    }

    // 2. Validate current state
    if (delivery.workflow_state !== 'draft') {
      throw new Error('CONFLICT');
    }

    // 3. Perform transition
    await tx('SalesDelivery')
      .where({ id: deliveryId })
      .update({ workflow_state: newStatus });

    // 4. Handle side effects for 'delivered' status
    if (newStatus === 'delivered') {
      // Lock parent Sales Order
      const salesOrder = await tx.select('*')
        .from('SalesOrder')
        .where({ id: delivery.sales_order_id })
        .forUpdate()
        .first();

      // Recompute Sales Order state based on business rules
      // (e.g., if all deliveries are done, mark order as closed)
      const updatedOrderState = calculateOrderState(salesOrder);
      
      await tx('SalesOrder')
        .where({ id: delivery.sales_order_id })
        .update({
          workflow_state: updatedOrderState.status,
          closed: updatedOrderState.isClosed
        });
    }

    return { id: deliveryId, workflow_state: newStatus };
  });
}