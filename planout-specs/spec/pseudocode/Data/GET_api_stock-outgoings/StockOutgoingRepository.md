/**
 * Fetches a paginated list of StockOutgoing records based on filters and sorting.
 * 
 * @param companyId - Scoped by session
 * @param filters - { status, fromDate, toDate, sourceId }
 * @param sort - { field: 'created_at' | 'source_name' | 'user_name', direction: 'asc' | 'desc' }
 * @param page - Page number (1-indexed)
 */
FUNCTION getStockOutgoings(companyId, filters, sort, page):
    SET pageSize = 20
    SET offset = (page - 1) * pageSize

    // Base query with company scope
    QUERY = SELECT StockOutgoing.*, Location.name AS source_name, User.name AS user_name
            FROM StockOutgoing
            LEFT JOIN Location ON StockOutgoing.source_id = Location.id
            LEFT JOIN User ON StockOutgoing.created_by_user_id = User.id
            WHERE StockOutgoing.company_id = companyId

    // Apply Status Filter
    IF filters.status IS NOT NULL:
        QUERY = QUERY.WHERE(StockOutgoing.status == filters.status)

    // Apply Date Range Filters
    IF filters.fromDate IS NOT NULL:
        QUERY = QUERY.WHERE(StockOutgoing.created_at >= filters.fromDate)
    IF filters.toDate IS NOT NULL:
        QUERY = QUERY.WHERE(StockOutgoing.created_at <= filters.toDate)

    // Apply Source Filter
    IF filters.sourceId IS NOT NULL:
        QUERY = QUERY.WHERE(StockOutgoing.source_id == filters.sourceId)

    // Apply Sorting
    // Note: Sorting by source_name or user_name uses the joined fields
    SWITCH sort.field:
        CASE 'source_name':
            QUERY = QUERY.ORDER_BY("source_name " + sort.direction)
        CASE 'user_name':
            QUERY = QUERY.ORDER_BY("user_name " + sort.direction)
        DEFAULT:
            QUERY = QUERY.ORDER_BY("created_at DESC")

    // Apply Pagination
    QUERY = QUERY.LIMIT(pageSize).OFFSET(offset)

    RETURN QUERY.EXECUTE()