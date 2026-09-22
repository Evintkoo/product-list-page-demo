/**
 * Fetches a paginated list of StockTransfers scoped to the authenticated user's company.
 * 
 * @param companyId - The ID of the company to filter by.
 * @param filters - Optional filters (e.g., status, warehouse_id).
 * @param pagination - { limit: number, offset: number }
 * @returns { data: StockTransfer[], total: number }
 */
FUNCTION getStockTransfers(companyId, filters, pagination):
    // 1. Build base query scoped to company
    query = SELECT * FROM StockTransfer WHERE company_id = companyId

    // 2. Apply dynamic filters if provided
    IF filters.status IS NOT NULL:
        query = query.WHERE(status == filters.status)
    
    IF filters.source_warehouse_id IS NOT NULL:
        query = query.WHERE(source_warehouse_id == filters.source_warehouse_id)

    // 3. Get total count for pagination metadata (before applying limit/offset)
    totalCount = query.COUNT()

    // 4. Apply sorting and pagination
    // Default sort: created_at descending
    results = query.ORDER_BY(created_at DESC)
                   .LIMIT(pagination.limit)
                   .OFFSET(pagination.offset)
                   .EXECUTE()

    RETURN {
        data: results,
        total: totalCount,
        limit: pagination.limit,
        offset: pagination.offset
    }