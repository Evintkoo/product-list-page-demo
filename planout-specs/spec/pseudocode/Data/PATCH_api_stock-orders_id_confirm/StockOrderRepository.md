/**
 * Fetches a stock order by ID and verifies company ownership.
 * Returns null if not found or if company_id mismatch.
 */
FUNCTION findStockOrderById(orderId: UUID, companyId: UUID):
  RETURN StockOrder.find({ id: orderId, company_id: companyId })

/**
 * Performs the atomic confirmation of a stock order.
 * Updates the order state and logs the transition in history.
 */
TRANSACTION confirmStockOrder(orderId: UUID, userId: UUID):
  // 1. Fetch current state
  SET order = StockOrder.find(orderId)
  
  // 2. Validate state (Conflict check)
  IF order.workflow_state != 'draft':
    THROW ConflictError("Stock Order is not in draft state")
  
  // 3. Update StockOrder
  SET updatedOrder = StockOrder.update(orderId, {
    workflow_state: 'confirmed',
    confirmed_at: CURRENT_TIMESTAMP,
    updater_id: userId,
    updated_at: CURRENT_TIMESTAMP
  })
  
  // 4. Insert into Workflow History
  INSERT INTO StockOrderWorkflowHistory (
    id: GENERATE_UUID(),
    stock_order_id: orderId,
    from_state: 'draft',
    to_state: 'confirmed',
    created_at: CURRENT_TIMESTAMP,
    actor_id: userId
  )
  
  RETURN updatedOrder