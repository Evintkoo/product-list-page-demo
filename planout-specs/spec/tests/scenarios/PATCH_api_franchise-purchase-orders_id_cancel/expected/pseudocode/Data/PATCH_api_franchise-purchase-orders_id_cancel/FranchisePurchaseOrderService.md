/**
 * Validates if the current order state allows transition to 'cancelled'.
 * Allowed states: 'draft', 'store_confirmed'.
 */
function validateTransition(order: FranchisePurchaseOrder): void {
  const allowedStates = ['draft', 'store_confirmed'];
  
  if (!allowedStates.includes(order.franchise_workflow_state)) {
    throw new ConflictError(`Order cannot be cancelled from state: ${order.franchise_workflow_state}`);
  }
}

/**
 * Orchestrates the cancellation process.
 */
function cancelOrder(orderId: uuid, user: User): FranchisePurchaseOrder {
  // 1. Retrieve order
  const order = findOrderByIdAndCompany(orderId, user.company_id);
  
  if (!order) {
    throw new NotFoundError("Order not found or access denied.");
  }

  // 2. Validate state transition
  validateTransition(order);

  // 3. Perform update
  return updateOrderStateToCancelled(order.id);
}