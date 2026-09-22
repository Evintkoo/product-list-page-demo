/**
 * Data access layer for ServiceProduct entities.
 * Handles direct database interaction for the GET /api/service_products/:id endpoint.
 */

FUNCTION findServiceProductById(id: UUID):
    // Query the ServiceProduct table for a record matching the provided ID
    record = DATABASE.query(
        "SELECT * FROM ServiceProduct WHERE id = :id LIMIT 1",
        { id: id }
    )

    // Return the record if found, otherwise return null to trigger 404 logic
    IF record EXISTS:
        RETURN record
    ELSE:
        RETURN NULL