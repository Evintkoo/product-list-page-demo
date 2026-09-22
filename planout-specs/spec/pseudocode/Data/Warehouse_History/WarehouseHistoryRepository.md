/**
 * Data access layer for Warehouse Stock History.
 * Handles persistence of stock movements and retrieval of audit trails.
 */

// Function to record a new stock movement entry
// Triggered whenever stock levels are adjusted via orders, transfers, or manual adjustments
FUNCTION recordStockMovement(movementData):
    INSERT INTO WarehouseStockHistory (
        id,
        product_id,
        warehouse_id,
        change_type,
        quantity_delta,
        previous_quantity,
        new_quantity,
        reference_id,
        created_at,
        user_id
    ) VALUES (
        GENERATE_UUID(),
        movementData.product_id,
        movementData.warehouse_id,
        movementData.change_type,
        movementData.quantity_delta,
        movementData.previous_quantity,
        movementData.new_quantity,
        movementData.reference_id,
        CURRENT_TIMESTAMP,
        movementData.user_id
    )

// Function to retrieve history for a specific product across warehouses
// Used by the UI to render the "Warehouse History" audit log
FUNCTION getHistoryByProduct(productId, filters):
    SELECT 
        h.*, 
        w.name AS warehouse_name
    FROM WarehouseStockHistory h
    JOIN Warehouse w ON h.warehouse_id = w.id
    WHERE h.product_id = productId
    ORDER BY h.created_at DESC
    LIMIT filters.limit OFFSET filters.offset

// Function to retrieve history for a specific warehouse
// Used for warehouse-level stock auditing
FUNCTION getHistoryByWarehouse(warehouseId, filters):
    SELECT 
        h.*, 
        p.sku AS product_sku
    FROM WarehouseStockHistory h
    JOIN Product p ON h.product_id = p.id
    WHERE h.warehouse_id = warehouseId
    ORDER BY h.created_at DESC
    LIMIT filters.limit OFFSET filters.offset