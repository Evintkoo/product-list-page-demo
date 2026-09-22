/**
 * Logic layer to handle business rules for order placement.
 */

FUNCTION placeOrder(orderId: UUID, companyId: UUID):
    // 1. Retrieve the order
    order = findOrderById(orderId, companyId)
    
    IF order IS NULL:
        THROW Error("NOT_FOUND")

    // 2. Validate state transition
    // Only orders in 'store_confirmed' state can be transitioned to 'placed'
    IF order.franchise_workflow_state != "store_confirmed":
        THROW Error("CONFLICT_INVALID_STATE")

    // 3. Persist the transition
    updatedOrder = transitionToPlaced(orderId)
    
    RETURN updatedOrder