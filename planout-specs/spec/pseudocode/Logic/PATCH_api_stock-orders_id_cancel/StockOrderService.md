/**
 * Logic to handle the cancellation of a Stock Order.
 * Ensures atomicity by wrapping the update and history logging in a transaction.
 */
FUNCTION cancelStockOrder(orderId, currentCompanyId, currentUserId):
    // 1. Fetch the existing StockOrder
    SET order = DATABASE.StockOrder.FIND_BY_ID(orderId)

    // 2. Validate existence and ownership
    IF order IS NULL OR order.company_id != currentCompanyId:
        THROW Error("404: Stock Order not found")

    // 3. Validate state transition (Only 'draft' or 'confirmed' can be cancelled)
    // <!-- MISSING_FIELD: StockOrder.workflow_state_values -->
    IF order.workflow_state NOT IN ["draft", "confirmed"]:
        THROW Error("409: Stock Order cannot be cancelled in its current state")

    // 4. Perform update within a database transaction
    START TRANSACTION:
        // Update the StockOrder record
        SET order.workflow_state = "cancelled"
        SET order.updater_id = currentUserId
        SET order.updated_at = CURRENT_TIMESTAMP
        
        DATABASE.StockOrder.UPDATE(order)

        // Log the transition in history
        CREATE NEW StockOrderWorkflowHistory:
            SET id = GENERATE_UUID()
            SET stock_order_id = order.id
            SET workflow_state = "cancelled"
            SET changed_at = CURRENT_TIMESTAMP
            SET updater_id = currentUserId
        
        DATABASE.StockOrderWorkflowHistory.INSERT(new_history_record)
    COMMIT TRANSACTION

    RETURN {
        "id": order.id,
        "workflow_state": order.workflow_state,
        "updated_at": order.updated_at
    }