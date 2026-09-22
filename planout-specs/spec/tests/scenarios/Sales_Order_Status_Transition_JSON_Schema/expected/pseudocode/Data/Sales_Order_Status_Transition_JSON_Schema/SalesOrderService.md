/**
 * Handles the business logic for transitioning a Sales Order status.
 * Ensures atomicity and state machine integrity.
 */
async function transitionSalesOrderStatus(
  salesOrderId: string,
  companyId: string,
  targetStatus: 'approved' | 'cancelled',
  userId: string
) {
  return await db.transaction(async (tx) => {
    // 1. Lock the record for update to prevent race conditions
    const order = await tx('sales_orders')
      .select('sales_order_id', 'workflow_state')
      .where({ sales_order_id: salesOrderId, company_id: companyId })
      .forUpdate()
      .first();

    if (!order) {
      throw new Error("Sales Order not found");
    }

    // 2. Validate state machine transitions
    const currentState = order.workflow_state;
    
    if (targetStatus === 'approved') {
      if (currentState !== 'draft') {
        throw new Error("Only 'draft' orders can be approved");
      }
    }

    if (targetStatus === 'cancelled') {
      if (!['draft', 'approved'].includes(currentState)) {
        throw new Error("Only 'draft' or 'approved' orders can be cancelled");
      }
    }

    // 3. Perform the update
    const updatePayload: any = {
      workflow_state: targetStatus,
      updater_id: userId,
      updated_at: new Date()
    };

    if (targetStatus === 'approved') {
      updatePayload.approved_at = new Date();
    }

    const [updatedOrder] = await tx('sales_orders')
      .where({ sales_order_id: salesOrderId })
      .update(updatePayload)
      .returning('*');

    return updatedOrder;
  });
}