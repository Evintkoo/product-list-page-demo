/**
 * Validates query parameters for the Stock Outgoing list.
 */
FUNCTION validateStockOutgoingQuery(params):
    IF params.status NOT IN ['draft', 'confirmed', 'approved', 'cancelled']:
        THROW UnprocessableEntityError("Invalid status")
    
    IF params.fromDate AND params.toDate AND params.fromDate > params.toDate:
        THROW UnprocessableEntityError("from_date cannot be after to_date")
    
    RETURN TRUE