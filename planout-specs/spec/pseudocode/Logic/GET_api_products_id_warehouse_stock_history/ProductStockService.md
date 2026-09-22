FUNCTION getWarehouseStockHistory(productId):
    // 1. Validate authentication and authorization
    IF NOT user.isAuthenticated():
        RETURN 401 Unauthorized
    
    IF NOT user.hasPermission("view_stock_history"):
        RETURN 403 Forbidden

    // 2. Verify Product existence
    SET product = DATABASE.Product.findUnique(WHERE id = productId)
    IF product IS NULL:
        RETURN 404 Not Found, "Product not found"

    // 3. Retrieve transaction history
    // Fetch all records from WarehouseStockTransaction linked to the product
    TRY:
        SET transactions = DATABASE.WarehouseStockTransaction.findMany(
            WHERE product_id = productId,
            ORDER_BY created_at DESC
        )
        
        RETURN 200 OK, transactions

    CATCH Exception:
        // Log the error for internal monitoring
        LOG.error("Failed to retrieve stock history for product: " + productId)
        RETURN 500 Internal Server Error, "An unexpected error occurred"