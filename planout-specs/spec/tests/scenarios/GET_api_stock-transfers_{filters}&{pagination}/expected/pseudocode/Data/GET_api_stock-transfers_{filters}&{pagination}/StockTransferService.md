/**
 * Orchestrates the data retrieval for the Stock Transfer list.
 */
FUNCTION fetchStockTransferList(userContext, queryParams):
    // Ensure user is authenticated
    IF userContext.company_id IS NULL:
        THROW UnauthorizedError("User not associated with a company")

    // Map query parameters to filter object
    filters = {
        status: queryParams.status,
        source_warehouse_id: queryParams.source_warehouse_id
    }

    pagination = {
        limit: queryParams.limit OR 20,
        offset: queryParams.offset OR 0
    }

    // Execute repository call
    TRY:
        RETURN StockTransferRepository.getStockTransfers(userContext.company_id, filters, pagination)
    CATCH databaseError:
        THROW ServerError("Failed to retrieve stock transfers")