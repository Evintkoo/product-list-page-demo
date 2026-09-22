/**
 * Orchestrates the page load and user interactions.
 */

async function onPageLoad(orderId) {
    // 1. Initialize data
    const [header, items] = await Promise.all([
        getStockOrderDetails(orderId),
        getStockOrderItems(orderId)
    ]);

    // 2. Render header details
    renderHeader(header);

    // 3. Map and render table
    const tableData = mapItemsToTable(items);
    renderTable(tableData);
}

async function handleConfirmAction(orderId) {
    const updatedOrder = await confirmStockOrder(orderId);
    updateUIStatus(updatedOrder.status);
}

async function handleCancelAction(orderId) {
    // Prompt user for confirmation before calling API
    if (confirm("Are you sure you want to cancel this order?")) {
        const updatedOrder = await cancelStockOrder(orderId);
        updateUIStatus(updatedOrder.status);
    }
}