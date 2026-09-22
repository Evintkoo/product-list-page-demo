/**
 * Data access layer to fetch supplier details by ID.
 * Endpoint: GET /api/suppliers/:id
 */
FUNCTION getSupplierById(id: UUID):
    rawResponse = HTTP_GET("/api/suppliers/" + id)
    RETURN mapSupplierToView(rawResponse)