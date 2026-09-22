/**
 * Service layer to validate business rules before hitting the repository.
 */

FUNCTION getPurchaseOrders(session, queryParams):
    // Validate session
    IF session.company_id IS NULL:
        THROW UnauthorizedError("Missing company context")

    // Validate date ranges (422 Unprocessable Entity)
    IF queryParams.created_at_from AND queryParams.created_at_to:
        IF queryParams.created_at_from > queryParams.created_at_to:
            THROW UnprocessableEntityError("created_at_from cannot be after created_at_to")

    // Execute repository call
    results = PurchaseOrderRepository.findPurchaseOrders(
        session.company_id,
        queryParams.filters,
        queryParams.pagination,
        queryParams.sorting
    )

    RETURN results