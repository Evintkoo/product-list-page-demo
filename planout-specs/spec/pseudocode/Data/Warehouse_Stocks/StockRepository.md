/**
 * Node: [2ba8468d-60df-4acf-92b9-3c014b4498cf]
 * Description: Mapping rules for product stock query results.
 * Input: JSON response from Logic swimlane (via mapping rules node).
 */

function getWarehouseStockByProductId(productId: uuid) {
    // Happy Path: Query the database for stock levels joined with warehouse details
    const stocks = db.query(`
        SELECT 
            w.warehouse_code, 
            w.warehouse_name, 
            s.inventory_quantity, 
            s.available_quantity, 
            s.reserved_quantity, 
            s.in_transit_quantity, 
            s.min_quantity, 
            s.max_quantity, 
            s.average_cost, 
            s.total_cost
        FROM Stock s
        JOIN Warehouse w ON s.warehouse_id = w.id
        WHERE s.product_id = :productId
    `, { productId });

    // Calculate summary
    const total_quantity = stocks.reduce((sum, item) => sum + item.inventory_quantity, 0);

    // Return structured data for Logic layer mapping
    return {
        data: stocks,
        summary: { total_quantity }
    };
}

/**
 * Validation/Error States:
 * - If productId is invalid or not found, return empty array for stocks and 0 for total_quantity.
 * - Database connection failure throws a standard 500 error.
 * 
 * Side Effects: None (Read-only operation).
 */

// Notes covered:
// 1. (row index) -> No
// 2. warehouse_code -> Code
// 3. warehouse_name -> Warehouse
// 4. inventory_quantity -> Qty
// 5. available_quantity -> Qty Available
// 6. reserved_quantity -> Reserved
// 7. in_transit_quantity -> In Transit
// 8. min_quantity -> Min Qty
// 9. max_quantity -> Max Qty
// 10. average_cost -> Average Cost (Rp)
// 11. total_cost -> Total Cost (Rp)
// 12. total_quantity -> Total Qty (summary)