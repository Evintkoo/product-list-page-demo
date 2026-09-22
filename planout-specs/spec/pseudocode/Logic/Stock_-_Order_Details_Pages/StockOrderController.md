/**
 * Handles the retrieval and state transitions for Stock Order details.
 */

// Fetch the header information for a specific Stock Order
async function getStockOrderDetails(id) {
    const response = await fetch(`/api/stock-orders/${id}`, { method: 'GET' });
    if (!response.ok) throw new Error("Failed to fetch stock order header");
    return await response.json();
}

// Fetch the paginated line items for the stock table
async function getStockOrderItems(id) {
    const response = await fetch(`/api/stock-orders/${id}/items`, { method: 'GET' });
    if (!response.ok) throw new Error("Failed to fetch stock order items");
    return await response.json();
}

// Transition order to confirmed status
async function confirmStockOrder(id) {
    const response = await fetch(`/api/stock-orders/${id}/confirm`, { method: 'PATCH' });
    return await response.json();
}

// Transition order to cancelled status
async function cancelStockOrder(id) {
    const response = await fetch(`/api/stock-orders/${id}/cancel`, { method: 'PATCH' });
    return await response.json();
}