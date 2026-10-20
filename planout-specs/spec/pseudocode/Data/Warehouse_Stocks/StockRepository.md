/**
 * Fetches aggregated stock data for a specific product across all warehouses.
 * Joins ProductStock with Warehouse to provide human-readable names and codes.
 */
FUNCTION getStockLevelsByProduct(productId: uuid):
    QUERY:
        SELECT 
            w.warehouse_code,
            w.warehouse_name,
            ps.inventory_quantity,
            ps.available_quantity,
            ps.reserved_quantity,
            ps.in_transit_quantity,
            ps.min_quantity,
            ps.max_quantity,
            ps.average_cost,
            (ps.inventory_quantity * ps.average_cost) AS total_cost
        FROM ProductStock ps
        JOIN Warehouse w ON ps.warehouse_id = w.id
        WHERE ps.product_id = productId

    RETURN result_set