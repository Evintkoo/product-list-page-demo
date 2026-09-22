/**
 * Retrieves current stock levels for a specific product across stores.
 * Used for the Store Stocks view.
 */
FUNCTION getStoreStocksByProduct(product_id):
    // Joins store_stocks with stores table
    // Computes derived fields: total_cost (quantity * average_cost)
    // Returns paginated list of store stock records
    
    RETURN storeStocksResponse {
        product_id: UUID,
        records: Integer,
        pages: Integer,
        page: Integer,
        total_qty: Integer,
        total_cost: Number,
        stocks: List<StoreStockDetail>
    }