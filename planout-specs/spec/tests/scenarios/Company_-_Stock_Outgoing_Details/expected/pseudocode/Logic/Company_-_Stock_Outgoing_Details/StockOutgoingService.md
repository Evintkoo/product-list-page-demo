/**
 * Fetches the full Stock Outgoing document including header and line items.
 * @param {string} id - The UUID of the StockOutgoing record.
 */
async function getStockOutgoingDetails(id) {
    const response = await fetch(`/api/stock-outgoings/${id}`);
    if (!response.ok) throw new Error("Failed to fetch stock outgoing details");
    return await response.json();
}

/**
 * Handles workflow state transitions for the Stock Outgoing document.
 * @param {string} id - The UUID of the StockOutgoing record.
 * @param {string} action - The action to perform ('confirm', 'cancel', 'reset').
 */
async function updateWorkflowState(id, action) {
    const response = await fetch(`/api/stock-outgoings/${id}/${action}`, {
        method: 'PATCH'
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Workflow action failed");
    }
    
    return await response.json();
}