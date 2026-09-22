/**
 * Data access layer for Franchise Purchase Returns.
 * Handles filtering, pagination, and retrieval from the database.
 */

FUNCTION getFranchisePurchaseReturns(filters, pagination):
    // Construct query based on optional filters
    QUERY = SELECT * FROM FranchisePurchaseReturn
    
    IF filters.ref_code IS NOT NULL:
        QUERY.WHERE(ref_code LIKE filters.ref_code)
    
    IF filters.workflow_state IS NOT NULL:
        QUERY.WHERE(workflow_state == filters.workflow_state)
        
    IF filters.date_range IS NOT NULL:
        QUERY.WHERE(created_at BETWEEN filters.date_range.start AND filters.date_range.end)

    // Apply pagination
    QUERY.LIMIT(pagination.limit)
    QUERY.OFFSET(pagination.offset)
    
    // Sort by creation date descending by default
    QUERY.ORDER_BY(created_at DESC)
    
    RETURN QUERY.EXECUTE()