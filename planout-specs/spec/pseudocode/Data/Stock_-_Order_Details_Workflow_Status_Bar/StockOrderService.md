/**
 * Handles the state transition logic for Stock Orders.
 * These methods interact with the backend API to update the workflow status.
 */

FUNCTION cancelStockOrder(orderId: UUID): StockOrderResponse {
    // Sends PATCH request to /api/stock-orders/:id/cancel
    // Reverts the document state to the last persisted version
    RETURN API.patch(`/api/stock-orders/${orderId}/cancel`)
}

FUNCTION confirmStockOrder(orderId: UUID): StockOrderResponse {
    // Sends PATCH request to /api/stock-orders/:id/confirm
    // Advances the workflow status to the next logical stage
    RETURN API.patch(`/api/stock-orders/${orderId}/confirm`)
}