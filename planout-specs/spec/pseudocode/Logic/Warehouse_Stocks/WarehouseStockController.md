/**
 * Node: 064b2464-9b6e-4d80-8903-59126889263d
 * Triggered by: Page load (Frontend)
 * Action: GET /products/:id/warehouse-stocks
 */
async function getWarehouseStocksByProduct(req, res) {
    const { id: productId } = req.params;
    
    // Fetch stock records joined with warehouse details
    const stocks = await db.Stock.findMany({
        where: { product_id: productId },
        include: { Warehouse: true }
    });

    // Calculate total_quantity (summary) for the response
    const responseData = stocks.map((stock, index) => ({
        row_index: index + 1,
        warehouse_code: stock.Warehouse.warehouse_code,
        warehouse_name: stock.Warehouse.warehouse_name,
        inventory_quantity: stock.inventory_quantity,
        available_quantity: stock.available_quantity,
        reserved_quantity: stock.reserved_quantity,
        in_transit_quantity: stock.in_transit_quantity,
        min_quantity: stock.min_quantity,
        max_quantity: stock.max_quantity,
        average_cost: stock.average_cost,
        total_cost: stock.total_cost,
        total_quantity: stocks.reduce((sum, s) => sum + s.inventory_quantity, 0)
    }));

    return res.status(200).json(responseData);
}

/**
 * Node: e8d5c57f-57b2-4837-a0f5-b3b28e28af2f
 * Logic: Mapping rules for UI presentation
 */
// The mapping logic transforms the database entities into the UI table structure:
// 1. row index -> No
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

/**
 * Node: aaa41a99-999d-4a44-9fc9-1eea2f7478bc
 * Logic: Query result handling
 */
// Receives the processed dataset from the controller and provides it to the 
// Frontend swimlane for rendering in the stock table.

// Notes covered:
// - 064b2464-9b6e-4d80-8903-59126889263d: Page load, GET /api/products/:id/warehouse-stocks
// - e8d5c57f-57b2-4837-a0f5-b3b28e28af2f: Mapping rules 1-12 (row index, warehouse_code, warehouse_name, inventory_quantity, available_quantity, reserved_quantity, in_transit_quantity, min_quantity, max_quantity, average_cost, total_cost, total_quantity)
// - aaa41a99-999d-4a44-9fc9-1eea2f7478bc: Query result by productid handling