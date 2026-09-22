/**
 * Data access layer for Product entities.
 * Handles direct database interaction for the GET /api/products/:id endpoint.
 */

FUNCTION findProductById(productId):
    // Validate that the provided ID is a valid UUID format
    IF NOT isValidUuid(productId) THEN
        THROW Error("400", "Invalid product ID format")
    END IF

    // Query the database for the product record
    SET productRecord = DB.table("Product").select("*").where("id", "=", productId).first()

    // If no record is found, return null to trigger a 404 in the controller
    IF productRecord IS NULL THEN
        RETURN NULL
    END IF

    RETURN productRecord