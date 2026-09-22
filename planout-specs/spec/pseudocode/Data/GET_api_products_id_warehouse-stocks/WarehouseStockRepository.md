/**
 * Data access layer for retrieving stock levels.
 * This repository handles the join between WarehouseStock and Warehouse 
 * to provide human-readable warehouse information alongside stock counts.
 */

FUNCTION getStocksByProductId(productId: uuid):
    // Query the WarehouseStock table joined with Warehouse
    // Filter by the provided product_id
    // Return a list of objects containing:
    // - warehouse_name (from Warehouse.name)
    // - quantity_on_hand (from WarehouseStock.quantity_on_hand)
    // - updated_at (from WarehouseStock.updated_at)
    
    RETURN DB.query(
        SELECT 
            w.name AS warehouse_name, 
            ws.quantity_on_hand, 
            ws.updated_at
        FROM WarehouseStock ws
        JOIN Warehouse w ON ws.warehouse_id = w.id
        WHERE ws.product_id = productId
    )