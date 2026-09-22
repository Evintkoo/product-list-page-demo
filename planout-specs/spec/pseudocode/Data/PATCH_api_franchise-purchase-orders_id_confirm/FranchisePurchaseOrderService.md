/**
 * Orchestrates the transition of a purchase order to 'store_confirmed'.
 */
FUNCTION confirmPurchaseOrder(orderId: UUID, currentUser: User):
    // 1. Fetch the order
    order = findOrderByIdAndCompany(orderId, currentUser.company_id)
    
    IF order IS NULL:
        THROW Error("Order not found or access denied", 404)
    
    // 2. Validate state transition
    IF order.franchise_workflow_state != 'draft':
        THROW Error("Invalid state transition", 409)
    
    // 3. Perform update
    updatedOrder = updateWorkflowState(orderId, 'store_confirmed')
    
    RETURN updatedOrder