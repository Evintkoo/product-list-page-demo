/**
 * Data access layer for retrieving stock levels.
 * This repository handles the join between WarehouseStock and Warehouse 
 * to provide human-readable warehouse details alongside stock quantities.
 */

FUNCTION getStocksByProductId(productId: uuid):
    // Query the WarehouseStock table joined with Warehouse
    // Filter by the provided product_id
    // Return a list of objects containing:
    // - warehouse_name (from Warehouse.name)
    // - quantity_on_hand (from WarehouseStock.quantity_on_hand)
    // - last_updated (from WarehouseStock.last_updated)
    
    RETURN DB.query(
        SELECT 
            w.name AS warehouse_name, 
            ws.quantity_on_hand, 
            ws.last_updated
        FROM WarehouseStock ws
        JOIN Warehouse w ON ws.warehouse_id = w.id
        WHERE ws.product_id = productId
    )