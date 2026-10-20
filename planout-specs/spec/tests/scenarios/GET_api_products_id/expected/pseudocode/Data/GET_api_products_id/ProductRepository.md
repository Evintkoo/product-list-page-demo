/**
 * Data access layer for Product entities.
 * Handles direct database interaction for the GET /api/products/:id endpoint.
 */

FUNCTION findProductById(productId):
    // Validate that the provided ID is a valid UUID format
    IF NOT isValidUuid(productId) THEN
        THROW Error("Invalid ID format", "400")
    END IF

    // Query the Product table for the specific record
    SET product = DATABASE.query("SELECT * FROM Product WHERE id = ?", [productId])

    // If no record is found, return null to trigger a 404 in the controller
    IF product IS EMPTY THEN
        RETURN NULL
    END IF

    RETURN product
END FUNCTION