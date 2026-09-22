/**
 * Data access layer for Purchase Order retrieval.
 * Handles filtering, pagination, and sorting logic against the database.
 */

FUNCTION findPurchaseOrders(companyId, filters, pagination, sorting):
    // 1. Initialize base query scoped to the company
    query = SELECT * FROM PurchaseOrder WHERE company_id = companyId

    // 2. Apply Filters
    IF filters.order_type IS NOT NULL:
        query = query.WHERE(order_type = filters.order_type)
    
    IF filters.is_fixed_asset IS NOT NULL:
        query = query.WHERE(is_fixed_asset = filters.is_fixed_asset)
        
    IF filters.workflow_state IS NOT NULL:
        query = query.WHERE(workflow_state = filters.workflow_state)
        
    IF filters.created_at_from IS NOT NULL:
        query = query.WHERE(created_at >= filters.created_at_from)
        
    IF filters.created_at_to IS NOT NULL:
        query = query.WHERE(created_at <= filters.created_at_to)

    // 3. Apply Sorting
    // Default: created_at DESC
    sortField = sorting.field OR "created_at"
    sortDirection = sorting.direction OR "DESC"
    query = query.ORDER_BY(sortField, sortDirection)

    // 4. Apply Pagination
    // Default limit 20, offset 0
    limit = pagination.limit OR 20
    offset = pagination.offset OR 0
    query = query.LIMIT(limit).OFFSET(offset)

    RETURN query.EXECUTE()