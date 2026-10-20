/**
 * Controller to handle retrieval of stock levels per warehouse for a specific product.
 */
function getWarehouseStocksByProduct(productId) {
    // 1. Fetch stock records joined with warehouse details
    // Query: SELECT ProductStock.*, Warehouse.warehouse_code, Warehouse.warehouse_name 
    //        FROM ProductStock 
    //        JOIN Warehouse ON ProductStock.warehouse_id = Warehouse.id 
    //        WHERE ProductStock.product_id = :productId
    const stocks = database.query("SELECT_STOCKS_BY_PRODUCT", { productId });

    // 2. Calculate derived fields for the UI
    const processedStocks = stocks.map((stock, index) => {
        return {
            no: index + 1,
            warehouse_code: stock.warehouse_code,
            warehouse_name: stock.warehouse_name,
            inventory_quantity: stock.inventory_quantity,
            available_quantity: stock.available_quantity,
            reserved_quantity: stock.reserved_quantity,
            in_transit_quantity: stock.in_transit_quantity,
            min_quantity: stock.min_quantity,
            max_quantity: stock.max_quantity,
            average_cost: stock.average_cost,
            // Calculate total cost: inventory_quantity * average_cost
            total_cost: stock.inventory_quantity * stock.average_cost <!-- MISSING_FIELD: ProductStock.total_cost -->
        };
    });

    // 3. Calculate summary totals
    const totalQuantity = processedStocks.reduce((sum, item) => sum + item.inventory_quantity, 0); <!-- MISSING_FIELD: ProductStock.total_quantity -->

    return {
        data: processedStocks,
        summary: {
            total_quantity: totalQuantity
        }
    };
}