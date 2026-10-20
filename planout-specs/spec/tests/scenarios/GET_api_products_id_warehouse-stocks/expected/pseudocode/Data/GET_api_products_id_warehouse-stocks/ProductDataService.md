/**
 * Service layer to bridge the API controller and the database.
 * Ensures data integrity and handles empty states.
 */

FUNCTION fetchWarehouseStocksForProduct(productId: uuid):
    // Validate that the product exists in the system
    IF NOT Product.exists(productId):
        THROW Error("Product not found")
    
    // Retrieve stock data from the repository
    stocks = WarehouseStockRepository.getStocksByProductId(productId)
    
    // Return the formatted list
    RETURN stocks