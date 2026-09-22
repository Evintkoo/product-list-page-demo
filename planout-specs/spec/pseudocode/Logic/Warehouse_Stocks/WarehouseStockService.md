/**
 * Fetches stock levels for a specific product across all warehouses.
 * @param {string} productId - The ID of the product to query.
 */
async function getWarehouseStocksByProduct(productId) {
    // 1. Query ProductStock joined with Warehouse where product_id matches
    const stocks = await db.ProductStock.findMany({
        where: { product_id: productId },
        include: { Warehouse: true }
    });

    // 2. Calculate derived fields for the UI
    const processedStocks = stocks.map((stock, index) => {
        const totalCost = stock.inventory_quantity * stock.average_cost; <!-- MISSING_FIELD: ProductStock.total_cost -->
        
        return {
            no: index + 1,
            warehouse_code: stock.Warehouse.warehouse_code,
            warehouse_name: stock.Warehouse.warehouse_name,
            inventory_quantity: stock.inventory_quantity,
            available_quantity: stock.available_quantity,
            reserved_quantity: stock.reserved_quantity,
            in_transit_quantity: stock.in_transit_quantity,
            min_quantity: stock.min_quantity,
            max_quantity: stock.max_quantity,
            average_cost: stock.average_cost,
            total_cost: totalCost
        };
    });

    // 3. Calculate summary total quantity
    const totalQuantity = processedStocks.reduce((sum, item) => sum + item.inventory_quantity, 0); <!-- MISSING_FIELD: ProductStock.total_quantity -->

    return {
        data: processedStocks,
        summary: {
            total_quantity: totalQuantity
        }
    };
}