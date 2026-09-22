/**
 * API Endpoint: GET /api/products/:id/stocks
 * Returns the aggregated stock data for the product detail view.
 */
ENDPOINT GET /api/products/:id/stocks(productId):
    stocks = StockRepository.getStocksByProductId(productId)
    
    // Calculate total quantity across all stores for the summary component
    totalQty = SUM(stocks.quantity)
    
    RETURN {
        "product_id": productId,
        "total_quantity": totalQty,
        "store_stocks": stocks.map(item => ({
            "store_name": item.store_name,
            "quantity": item.quantity,
            "last_updated": item.last_updated
        }))
    }

/**
 * API Endpoint: GET /api/stores
 * Returns list of stores for filter population.
 */
ENDPOINT GET /api/stores():
    RETURN StockRepository.getAllStores()