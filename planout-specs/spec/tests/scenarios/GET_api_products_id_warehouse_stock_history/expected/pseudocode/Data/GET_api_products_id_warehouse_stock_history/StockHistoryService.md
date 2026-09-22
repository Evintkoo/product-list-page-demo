/**
 * Logic layer to handle data retrieval and error mapping.
 */

FUNCTION fetchWarehouseStockHistory(productId, userContext):
    // 1. Validate Authentication
    IF NOT userContext.isAuthenticated:
        THROW "UnauthorizedError"

    // 2. Validate Product Existence
    product = getProductById(productId)
    IF product IS NULL:
        THROW "NotFoundError"

    // 3. Validate Authorization
    IF NOT userContext.hasPermission("VIEW_STOCK_HISTORY", productId):
        THROW "ForbiddenError"

    // 4. Retrieve Data
    TRY:
        RETURN getStockHistoryByProductId(productId)
    CATCH error:
        // Log the internal error for observability
        log.error("Database failure during stock history retrieval", error)
        THROW "InternalServerError"