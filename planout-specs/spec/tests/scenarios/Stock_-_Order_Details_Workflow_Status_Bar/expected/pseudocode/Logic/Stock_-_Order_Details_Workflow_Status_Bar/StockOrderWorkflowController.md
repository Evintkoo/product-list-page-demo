/**
 * Handles the workflow state transitions for Stock Orders.
 * Interacts with the StockOrder entity to update status and returns a StockOrderResponse.
 */

function handleCancelOrder(orderId) {
    // 1. Validate that the StockOrder exists
    const order = database.find("StockOrder", { id: orderId });
    
    if (!order) {
        throw new Error("Order not found");
    }

    // 2. Perform transition logic
    // Update StockOrder.status to 'CANCELLED'
    // Update StockOrder.updated_at to current timestamp
    // Increment StockOrder.version <!-- MISSING_FIELD: StockOrder.version -->
    
    database.update("StockOrder", { id: orderId }, { 
        status: "CANCELLED",
        updated_at: getCurrentTimestamp()
    });

    // 3. Return response matching StockOrderResponse schema
    return {
        id: orderId,
        status: "CANCELLED",
        message: "Stock order has been successfully cancelled.",
        timestamp: getCurrentTimestamp()
    };
}

function handleConfirmOrder(orderId) {
    // 1. Validate that the StockOrder exists
    const order = database.find("StockOrder", { id: orderId });
    
    if (!order) {
        throw new Error("Order not found");
    }

    // 2. Perform transition logic
    // Update StockOrder.status to the next logical stage (e.g., 'CONFIRMED')
    // Update StockOrder.updated_at to current timestamp
    
    database.update("StockOrder", { id: orderId }, { 
        status: "CONFIRMED",
        updated_at: getCurrentTimestamp()
    });

    // 3. Return response matching StockOrderResponse schema
    return {
        id: orderId,
        status: "CONFIRMED",
        message: "Stock order has been successfully confirmed.",
        timestamp: getCurrentTimestamp()
    };
}