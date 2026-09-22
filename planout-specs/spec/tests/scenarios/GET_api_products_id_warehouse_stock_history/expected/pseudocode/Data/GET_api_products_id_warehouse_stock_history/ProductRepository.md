/**
 * Data access layer for retrieving product stock history.
 * Interacts with the database to fetch transaction logs.
 */

FUNCTION getProductById(productId):
    // Query the Product table to verify existence
    RETURN database.table("Product").find(productId)

FUNCTION getStockHistoryByProductId(productId):
    // Query the WarehouseStockTransaction table for all records matching the product_id
    // Ordered by created_at descending to show most recent changes first
    RETURN database.table("WarehouseStockTransaction")
        .where("product_id", "=", productId)
        .orderBy("created_at", "DESC")
        .fetchAll()