/**
 * Data access layer for retrieving purchase records.
 * Handles the database query logic for the Purchase History feature.
 */

FUNCTION getPurchasesByProductId(productId: UUID):
    // Query the Purchase table for all records matching the provided product_id
    // Default sorting: purchase_date in descending order (newest first)
    RETURN Database.query(
        "SELECT * FROM Purchase WHERE product_id = :productId ORDER BY purchase_date DESC",
        { productId: productId }
    )