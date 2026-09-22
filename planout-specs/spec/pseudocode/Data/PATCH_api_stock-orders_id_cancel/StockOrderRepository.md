/**
 * Performs the atomic cancellation of a stock order.
 * Ensures the state transition is valid and history is recorded.
 */
function cancelStockOrder(stockOrderId: uuid, currentCompanyId: uuid, userId: uuid) {
  BEGIN TRANSACTION;

  // 1. Fetch and lock the record for update
  const order = SELECT * FROM StockOrder 
                WHERE id = stockOrderId 
                AND company_id = currentCompanyId 
                FOR UPDATE;

  // 2. Validate existence
  IF order IS NULL THEN
    THROW NotFoundError("Stock Order not found");
  END IF;

  // 3. Validate state (Only 'draft' or 'confirmed' can be cancelled)
  IF order.workflow_state NOT IN ('draft', 'confirmed') THEN
    THROW ConflictError("Stock Order cannot be cancelled in its current state");
  END IF;

  // 4. Update the Stock Order
  UPDATE StockOrder
  SET 
    workflow_state = 'cancelled',
    updater_id = userId,
    updated_at = CURRENT_TIMESTAMP
  WHERE id = stockOrderId;

  // 5. Insert into history
  INSERT INTO StockOrderWorkflowHistory (
    id, 
    stock_order_id, 
    workflow_state, 
    changed_at, 
    updater_id
  ) VALUES (
    GENERATE_UUID(), 
    stockOrderId, 
    'cancelled', 
    CURRENT_TIMESTAMP, 
    userId
  );

  COMMIT;

  RETURN SELECT * FROM StockOrder WHERE id = stockOrderId;
}