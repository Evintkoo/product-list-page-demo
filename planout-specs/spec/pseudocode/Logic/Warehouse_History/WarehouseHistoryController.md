/**
 * Logic to handle the retrieval of stock history for a specific product.
 * Triggered on page load.
 */
function getProductWarehouseHistory(productId) {
    // 1. Fetch history records from the database filtered by product_id
    const historyRecords = Database.WarehouseStockHistory.findMany({
        where: { product_id: productId },
        orderBy: { created_at: 'desc' }
    });

    // 2. Map the database entities to the API response format
    return historyRecords.map(record => ({
        id: record.id,
        createdAt: record.created_at,
        warehouseId: record.warehouse_id,
        type: record.change_type,
        quantityChanged: record.quantity_delta,
        notes: null, // <!-- MISSING_FIELD: WarehouseStockHistory.notes -->
        createdBy: record.user_id
    }));
}