/**
 * Orchestrates the retrieval of the Stock Order header.
 * Handles validation and error mapping for the API layer.
 */
FUNCTION fetchStockOrderDetail(orderId: UUID, authenticatedUser: User):
    // 1. Validate ID format
    IF NOT isValidUUID(orderId) THEN
        THROW Error("INVALID_ID_FORMAT", 400)
    END IF

    // 2. Retrieve from repository
    SET stockOrder = getStockOrderById(orderId, authenticatedUser.company_id)

    // 3. Handle missing record or unauthorized access
    IF stockOrder IS NULL THEN
        THROW Error("STOCK_ORDER_NOT_FOUND", 404)
    END IF

    // 4. Return the domain object to the controller
    RETURN stockOrder